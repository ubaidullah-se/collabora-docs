import { Project,  PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import { ServerStatusCode, UserRequest, } from "../models";

export const createProject = async (req: UserRequest, res: Response) => {
  const data: Project = req.body;

  const userId = req.user.id



  const prismaClient = new PrismaClient();

  const project = await prismaClient.project.create({
    data: {
      ...data,
      userId: userId
    },
  });

  return res.json({
    data: project,
    status: ServerStatusCode
  });
};

export const getProject = async (req:Request, res: Response) => {
  const prismaClient = new PrismaClient();

  const projectId: string = req.params.id;

  if (!projectId) {
    return {
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
    };
  }

  const project: Project = await prismaClient.project.findFirst({
    where :{
      id: parseInt(projectId),
    },
    include:{
      Document: true
    }
  });

  return res.json({
    data: {
      project: project,
      status: ServerStatusCode.SUCCESS,
    },
  });
};


export const getAllProjects = async (req: UserRequest, res: Response) => {
  const prismaClient = new PrismaClient();

  const userId = req.user.id;

  if (!userId) {
    return {
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
    };
  }

  const getAllProjects = await prismaClient.project.findMany({
    where: {
      userId: userId
    },
  });

  return res.json({
    allProjects: getAllProjects,
    status: ServerStatusCode.SUCCESS,
  });
};

export const deleteProject = async (req: Request, res: Response) => {
  const prismaClient = new PrismaClient();

  const projectId = req.params.id;

  if (!projectId) {
    return res.json({
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
      message: "ProjectId is note provided",
    });
  }

  const deltedProject = await prismaClient.project.delete({
    where: {
      id: parseInt(projectId),
    },
  });

  res.json({
    data: null,
    message: "Deleted Successfully",
    status: ServerStatusCode.SUCCESS,
  });
};

export const udpateProject = async (req: Request, res: Response) => {
  const prismaClient = new PrismaClient();
  const data: Project = req.body;

  const projectId = req.params.id;

  if (!projectId) {
    return res.json({
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
      message: "ProjectId is note provided",
    });
  }

  const udpatedProject = await prismaClient.project.update({
    where:{
        id: parseInt(projectId)
    },
    data:data
  });

  return udpatedProject;
};
