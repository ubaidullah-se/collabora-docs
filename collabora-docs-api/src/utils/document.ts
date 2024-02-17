import { PrismaClient, Document } from "@prisma/client";

export const updateDocumentById = async (documentId: string, data: Document) => {
  const prismaClient = new PrismaClient();
  const updatedDocument = await prismaClient.document.update({
    where: {
      id: parseInt(documentId),
    },
    data: data,
  });

  return updatedDocument

};
