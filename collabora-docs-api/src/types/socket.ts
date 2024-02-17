import { User } from "@prisma/client";

export interface SocketUser {
  socketId: string;
  user: User;
}
