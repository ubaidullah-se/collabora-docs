import { Document, DocumentVersion, PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import { ServerStatusCode, UserRequest } from "../models";
import { updateDocumentById } from "../utils/document";

export const createDocument = async (req: UserRequest, res: Response) => {
  const data: Document = req.body;

  const prismaClient = new PrismaClient();

  const userId = req.user.id

  const document = await prismaClient.document.create({
    data: data,
  });

  await prismaClient.collaborator.create({
    data:{
      permission: "EDIT",
      documentId: document.id,
      userId: userId
    }
  })

  return res.json({
    data: document,
    status: ServerStatusCode.SUCCESS,
  });
};

export const getDocument = async (req: Request, res: Response) => {
  const prismaClient = new PrismaClient();

  const documentId: string = req.params.id;

  if (!documentId) {
    return {
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
    };
  }

  const document: Document = await prismaClient.document.findFirst();

  return res.json({
    data: {
      document: document,
      status: ServerStatusCode.SUCCESS,
    },
  });
};

export const getLatestDocument = async (req: Request, res: Response) => {
  const prismaClient = new PrismaClient();

  const documentId: string = req.params.id;

  if (!documentId) {
    return {
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
    };
  }

  const document = await prismaClient.documentVersion.findFirst({
    where: {
      documentId: parseInt(documentId),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json({
    data: {
      document: document,
      status: ServerStatusCode.SUCCESS,
    },
  });
};

export const getAllDocuments = async (req: UserRequest, res: Response) => {
  const prismaClient = new PrismaClient();

  const userId = req.user.id

  const documentIds = (
    await prismaClient.collaborator.findMany({ where: { userId: userId } })
  ).map((item) => item.documentId);

  const getAllDocuments = await prismaClient.document.findMany({
    where: {
      id: { in: documentIds },

    },
    include: {project: {select: {name: true}}}
  });

  return res.json({
    allDocuments: getAllDocuments,
    status: ServerStatusCode.SUCCESS,
  });
};

export const deleteDocument = async (req: Request, res: Response) => {
  const prismaClient = new PrismaClient();

  const documentId = req.params.id;

  if (!documentId) {
    return res.json({
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
      message: "DocumentId is note provided",
    });
  }

  const deltedDocument = await prismaClient.document.delete({
    where: {
      id: parseInt(documentId),
    },
  });

  res.json({
    data: null,
    message: "Deleted Successfully",
    status: ServerStatusCode.SUCCESS,
  });
};

export const updateDocument = async (req: Request, res: Response) => {
  const prismaClient = new PrismaClient();
  const data: DocumentVersion = req.body;

  const documentId = req.params.id;

  if (!documentId) {
    return res.json({
      data: null,
      status: ServerStatusCode.BAD_REQUEST,
      message: "DocumentId is note provided",
    });
  }

  const updatedDocumentVersion = await prismaClient.documentVersion.create({
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
