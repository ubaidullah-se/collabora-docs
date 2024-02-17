import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { UserDto, UserMeResponse, UserRequest } from "../models";
import { PrismaClient, User } from "@prisma/client";



export const getMe = async (req: Request, res: Response):Promise<UserMeResponse> => {
    
    const prismaClient = new PrismaClient()
    const userDto = req.body as UserDto;

    const salt = await bcryptjs.genSalt(10);
    const secPass = await bcryptjs.hash(userDto.password, salt)
    
    const user = await prismaClient.user.create({
        data:{
            ...userDto,
            password: secPass
        }
    })

    const payload = {
        user: {
            id: user.id
        }
    }

    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY)
    return {
        accessToken: token,
        user: user
    }

}

export const loginUser = async (req: UserRequest, res: Response):Promise<UserMeResponse> => {
    try {
        
        const prismaClient = new PrismaClient()

        const userId = req.user.id;
        const user = await prismaClient.user.findUnique({
            where:{
                id:userId
            }
        })

        const payload = {
            user: {
                id: user.id
            }
        }
    
        const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY)
        return {
            accessToken: token,
            user: user
        }
            

      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
}

