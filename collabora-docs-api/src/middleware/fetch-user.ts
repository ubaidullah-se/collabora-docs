import { Request, Response, NextFunction } from "express";
import { ServerStatusCode } from "../types";
import { getUserIdByAccessToken } from "../helpers/user";

export const fetchUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("authorization");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  try {
    const userId = getUserIdByAccessToken(token);
    req["user"] = { id: userId };
    next();
  } catch (error) {
    return res
      .status(ServerStatusCode.UNAUTHORIZED)
      .send({ error: "Please authenticate using a valid token" });
  }
};
