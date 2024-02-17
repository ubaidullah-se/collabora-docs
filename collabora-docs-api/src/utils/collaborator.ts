import { Permission, PrismaClient } from "@prisma/client";
import { User } from "../models";

export const resolveCollboartor = async (id: number): Promise<User | null> => {
  const prismaClient = new PrismaClient();
  const collaborator = await prismaClient.collaborator.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });

  if (collaborator.permission == Permission.EDIT) {
    return collaborator.user;
  } else {
    return null;
  }
};
