import { Permission, User } from "@prisma/client";
import prisma from "../services/prisma.service";

export const resolveCollboartor = async (id: number): Promise<User | null> => {
  const collaborator = await prisma.collaborator.findFirst({
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
