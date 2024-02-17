import { Project } from "@prisma/client";
import { Response, Request } from "express";
import { ServerStatusCode, UserRequest } from "../types";
import prisma from "../services/prisma.service";

export const createProject = async (req: UserRequest, res: Response) => {
  const data: Project = req.body;

  const userId = req.user.id;

  const project = await prisma.project.create({
    data: {
      ...data,
      userId: userId,
    },
  });

  return res.json({
    data: project,
    status: ServerStatusCode,
  });
};

export const getProject = async (req: Request, res: Response) => {
  const projectId: string = req.params.id;

  if (!projectId) {
    return {
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
    };
  }

  const project: Project = await prisma.project.findFirst({
    where: {
      id: parseInt(projectId),
    },
    include: {
      Document: true,
    },
  });

  return res.json({
    data: project,
    status: ServerStatusCode.SUCCESS,
  });
};

export const getAllProjects = async (req: UserRequest, res: Response) => {
  const userId = req.user.id;

  const collaborators = await prisma.collaborator.findMany({
    select: { documentId: true },
    where: { userId: userId },
  });

  const documentIds = collaborators.map((item) => item.documentId);

  const documents = await prisma.document.findMany({
    where: {
      id: { in: documentIds },
    },
    select: { projectId: true },
  });

  const projectIds = documents.map((item) => item.projectId);

  const projects = await prisma.project.findMany({
    where: {
      OR: [{ id: { in: projectIds } }, { userId }],
    },
    orderBy: { createdAt: "asc" },
  });

  return res.json({
    data: projects,
    status: ServerStatusCode.SUCCESS,
  });
};

export const deleteProject = async (req: Request, res: Response) => {
  const projectId = req.params.id;

  if (!projectId) {
    return res.json({
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
      message: "ProjectId is note provided",
    });
  }

  await prisma.project.delete({
    where: {
      id: parseInt(projectId),
    },
  });

  return res.json({
    data: null,
    message: "Deleted Successfully",
    status: ServerStatusCode.SUCCESS,
  });
};

export const udpateProject = async (req: Request, res: Response) => {
  const data: Project = req.body;

  const projectId = req.params.id;

  if (!projectId) {
    return res.json({
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
      message: "ProjectId is note provided",
    });
  }

  const udpatedProject = await prisma.project.update({
    where: {
      id: parseInt(projectId),
    },
    data: data,
  });

  return udpatedProject;
};
