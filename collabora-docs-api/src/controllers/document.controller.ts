import { Document, DocumentVersion } from "@prisma/client";
import { Response, Request } from "express";
import { ServerStatusCode, UserRequest } from "../types";
import prisma from "../services/prisma.service";

export const createDocument = async (req: UserRequest, res: Response) => {
  const data: Document = req.body;

  const userId = req.user.id;

  const document = await prisma.document.create({
    data: data,
  });

  await prisma.collaborator.create({
    data: {
      permission: "EDIT",
      documentId: document.id,
      userId: userId,
    },
  });

  return res.json({
    data: document,
    status: ServerStatusCode.SUCCESS,
  });
};

export const getDocument = async (req: Request, res: Response) => {
  const documentId: string = req.params.id;

  if (!documentId) {
    return {
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
    };
  }

  const document: Document = await prisma.document.findFirst();

  return res.json({
    data: document,
    status: ServerStatusCode.SUCCESS,
  });
};

export const getAllDocuments = async (req: UserRequest, res: Response) => {
  const userId = req.user.id;

  const collaborators = await prisma.collaborator.findMany({
    select: { documentId: true },
    where: { userId: userId },
  });

  const documentIds = collaborators.map((item) => item.documentId);

  const getAllDocuments = await prisma.document.findMany({
    where: {
      id: { in: documentIds },
    },
    orderBy: { createdAt: "asc" },
    include: { project: { select: { name: true } } },
  });

  return res.json({
    data: getAllDocuments,
    status: ServerStatusCode.SUCCESS,
  });
};

export const deleteDocument = async (req: Request, res: Response) => {
  const documentId = req.params.id;

  if (!documentId) {
    return res.json({
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
      message: "DocumentId is note provided",
    });
  }

  const deltedDocument = await prisma.document.delete({
    where: {
      id: parseInt(documentId),
    },
  });

  return res.json({
    data: null,
    message: "Deleted Successfully",
    status: ServerStatusCode.SUCCESS,
  });
};

export const updateDocument = async (req: Request, res: Response) => {
  const data: DocumentVersion = req.body;

  const documentId = req.params.id;

  if (!documentId) {
    return res.json({
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
      message: "DocumentId is note provided",
    });
  }

  const updatedDocumentVersion = await prisma.documentVersion.create({
    data: {
      publishedContent: data.publishedContent,
      documentId: data.documentId,
    },
    include: {
      document: true,
    },
  });

  return updatedDocumentVersion;
};
