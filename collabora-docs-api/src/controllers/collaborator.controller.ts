import { Collaborator,   PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import { ServerStatusCode, UserRequest } from "../models";

export const createCollaborator = async (req: Request, res: Response) => {
  const data: Collaborator = req.body;

  const prismaClient = new PrismaClient();

  const collaborator = await prismaClient.collaborator.create({
    data: data,
  });

  return collaborator;
};

export const getCollaborator = async (req:Request, res: Response) => {
  const prismaClient = new PrismaClient();

  const documentId: string = req.params.id;

  if (!documentId) {
    return {
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
    };
  }

  const collaborator: Collaborator = await prismaClient.collaborator.findFirst();

  return res.json({
    data: {
      document: collaborator,
      status: ServerStatusCode.SUCCESS,
    },
  });
};


export const getAllCollaborators = async (req: Request, res: Response) => {
  const prismaClient = new PrismaClient();

  const documentId: string = req.params.documentId;

  if (!documentId) {
    return {
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
    };
  }

  const getAllDocuments = await prismaClient.collaborator.findMany({
    where: {
      documentId: parseInt(documentId)
    }
  });

  return res.json({
    allDocuments: getAllDocuments,
    status: ServerStatusCode.SUCCESS,
  });
};

export const deleteCollaborator = async (req: Request, res: Response) => {
  const prismaClient = new PrismaClient();

  const collaboratorId = req.params.id;

  if (!collaboratorId) {
    return res.json({
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
      message: "CollaboratorId is note provided",
    });
  }

  const deltedCollaborator = await prismaClient.collaborator.delete({
    where: {
      id: parseInt(collaboratorId),
    },
  });

  res.json({
    data: null,
    message: "Deleted Successfully",
    status: ServerStatusCode.SUCCESS,
  });
};

