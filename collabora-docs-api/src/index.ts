import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { EditDocDto, JoinedDocUserResp, SocketUserDto } from "./models";
import { getUserById } from "./utils/user";
import { resolveCollboartor } from "./utils/collaborator";
import { User } from "@prisma/client";

const app = express();
const server = http.createServer(app);
dotenv.config();

// Socket.io

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // Add this
  let chatRoom = "";
  let allUsers: SocketUserDto[] = [];

  // Add a user to a document
  socket.on("joinUser", async (data: Omit<SocketUserDto, "socketId">) => {
    const { userId, room } = data;

    socket.join(room);

    allUsers.push({ socketId: socket.id, userId, room });
    const chatRoomUsers = allUsers.map((user) => user.userId);
    const user = await getUserById(userId);
    socket.to(room).emit("joinDocs", {
      collaborators: chatRoomUsers,
      user: user,
    } as JoinedDocUserResp);
  });

  // Add user to
  socket.on("editDoc", async (data: EditDocDto) => {
    const { content, documentId, room, collboartorId } = data;
    const user: User | null =  await resolveCollboartor(collboartorId)
    if(user) {
        socket.to(room).emit("editedDoc", {})
    }
  });
});

app.use(express.json());
app.use(cors());

app.use(`${process.env.API_VERSION}/user`, require("./routes/user"));

server.listen(process.env.PORT);
