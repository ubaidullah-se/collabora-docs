import { Collaborator } from "@prisma/client";
import { Response, Request } from "express";
import { ServerStatusCode } from "../types";
import prisma from "../services/prisma.service";

export const createCollaborator = async (req: Request, res: Response) => {
  const data: Collaborator = req.body;

  const collaborator = await prisma.collaborator.create({
    data: data,
  });

  return collaborator;
};

export const getAllCollaborators = async (req: Request, res: Response) => {
  const documentId = req.query.documentId as string;

  if (!documentId) {
    return {
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
    };
  }

  const getAllDocuments = await prisma.collaborator.findMany({
    where: {
      documentId: parseInt(documentId),
    },
  });

  return res.json({
    data: getAllDocuments,
    status: ServerStatusCode.SUCCESS,
  });
};

export const deleteCollaborator = async (req: Request, res: Response) => {
  const collaboratorId = req.params.id;

  if (!collaboratorId) {
    return res.json({
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
      message: "CollaboratorId is note provided",
    });
  }

  await prisma.collaborator.delete({
    where: {
      id: parseInt(collaboratorId),
    },
  });

  return res.json({
    data: null,
    message: "Deleted Successfully",
    status: ServerStatusCode.SUCCESS,
  });
};
