import { Document } from "@prisma/client";
import prisma from "../services/prisma.service";

export const updateDocumentById = async (
  documentId: string,
  data: Document
) => {
  const updatedDocument = await prisma.document.update({
    where: {
      id: parseInt(documentId),
    },
    data: data,
  });

  return updatedDocument;
};
