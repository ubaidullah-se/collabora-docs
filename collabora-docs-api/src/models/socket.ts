import { User } from "./user";

export interface SocketUserDto {
  socketId: string;
  userId: number;
  room: string;
}

export interface JoinedDocUserResp {
  collaborators: number[];
  user: User;
}

export interface EditDocDto {
  collboartorId: number;
  room: string;
  documentId: string;
  content: string
}
