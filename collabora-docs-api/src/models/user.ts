import { Request } from "express";

export interface UserMeResponse {
  accessToken: string;
  user: Partial<UserDto>;
}

export interface UserRequest extends Request {
  user: {
    id: number;
  };
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
