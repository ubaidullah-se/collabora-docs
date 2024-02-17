import { Request } from "express";
import { User as UserPrisma } from "@prisma/client";

export interface UserMeResponse {
  accessToken?: string;
  user?: Partial<UserDto>;
}

export interface UserRequest extends Request {
  user: UserPrisma;
}

export interface UserDto {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Todo: Change any when their interface implemented
export interface User extends UserDto {
  Project: any[];
  Collaborator: any[];
}
