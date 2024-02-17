import { Permission, PrismaClient, User } from "@prisma/client";

export const resolveCollboartor = async (id: number): Promise<User | null> => {
  const prismaClient = new PrismaClient();
  const collaborator = await prismaClient.collaborator.findFirst({
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
