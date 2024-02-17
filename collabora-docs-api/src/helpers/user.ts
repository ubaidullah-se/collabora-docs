import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../services/prisma.service";

export const getUserById = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  return user;
};

export const getUserByAccessToken = async (accessToken: string) => {
  if (accessToken) {
    const data = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY
    ) as JwtPayload;
    const userId = parseInt(data.user.id);
    const user = await prisma.user.findFirst({ where: { id: userId } });
    return user;
  } else {
    console.log("please provide  a valid access token");
    // throw Error("please provide  a valid access token");
  }
};

export const getUserIdByAccessToken = (accessToken: string) => {
  if (accessToken) {
    const data = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY
    ) as JwtPayload;
    const userId = parseInt(data.user.id);

    return userId;
  } else {
    console.log("please provide  a valid access token");
    // throw Error("please provide  a valid access token");
  }
};
