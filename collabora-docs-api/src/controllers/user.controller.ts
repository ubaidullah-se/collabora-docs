import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {
  ResponseData,
  ServerStatusCode,
  UserDto,
  UserMeResponse,
  UserRequest,
} from "../models";
import { PrismaClient, User } from "@prisma/client";
import { emitWarning } from "process";

export const getMe = async (req: Request, res: Response) => {
  const prismaClient = new PrismaClient();
  const userDto = req.body as UserDto;

  const prevUser = await prismaClient.user.findUnique({
    where: {
      email: userDto.email,
    },
  });

  if (prevUser) {
    return res.json({
      data: null,
      message: "User already exist",
      status: ServerStatusCode.BAD_REQUEST,
    });
  }

  const salt = await bcryptjs.genSalt(10);
  const secPass = await bcryptjs.hash(userDto.password, salt);

  const user = await prismaClient.user.create({
    data: {
      ...userDto,
      password: secPass,
    },
  });

  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY);
  res.json({
    data: {
      accessToken: token,
      user: user,
    },
    status: ServerStatusCode.SUCCESS,
  });

  // return {
  //   data: {
  //     accessToken: token,
  //     user: user,
  //   },
  //   status: ServerStatusCode.SUCCESS,
  // };
};

export const loginUser = async (req: UserRequest, res: Response) => {
  try {
    const prismaClient = new PrismaClient();

    const { email } = req.body;

    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY);

    return res.json({
      data: {
        accessToken: token,
        user: user,
      },
      status: ServerStatusCode.SUCCESS,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      data: {},
      status: ServerStatusCode.SUCCESS,
    });
  }
};

export const getUser = async (req: UserRequest, res: Response) => {
  const prismaClient = new PrismaClient();
  const userId = req.user.id;

  const user = await prismaClient.user.findFirst({
    where: {
      id: userId,
    },
  });

  return res.json({
    data: user,
    status: ServerStatusCode.SUCCESS,
  });
};

export const getAll = async (req: UserRequest, res: Response) => {
  const prismaClient = new PrismaClient();
  const userId = req.user.id;

  const allusers = await prismaClient.user.findMany();

  return res.json({
    data: {
      allusers,
    },
    status: ServerStatusCode.SUCCESS,
  });
};
