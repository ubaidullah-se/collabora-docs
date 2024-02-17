import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import prisma from "../services/prisma.service";
import { Request, Response } from "express";
import { ServerStatusCode, UserDto, UserRequest } from "../types";

export const register = async (req: Request, res: Response) => {
  const userDto = req.body as UserDto;

  const prevUser = await prisma.user.findUnique({
    where: {
      email: userDto.email,
    },
  });

  if (prevUser) {
    return res.status(ServerStatusCode.BAD_REQUEST).json({
      message: { email: "email already exist" },
      status: ServerStatusCode.BAD_REQUEST,
    });
  }

  const salt = await bcryptjs.genSalt(10);
  const secPass = await bcryptjs.hash(userDto.password, salt);

  const user = await prisma.user.create({
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

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
  return res.json({
    data: {
      accessToken: token,
      user: user,
    },
    status: ServerStatusCode.SUCCESS,
  });
};

export const loginUser = async (req: UserRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const isCorrectPassword = await bcryptjs.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(ServerStatusCode.BAD_REQUEST).json({
        data: null,
        message: { password: "wrong email or password" },
        status: ServerStatusCode.BAD_REQUEST,
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

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
  const userId = req.user.id;

  const user = await prisma.user.findFirst({ where: { id: userId } });

  return res.json({
    data: user,
    status: ServerStatusCode.SUCCESS,
  });
};
