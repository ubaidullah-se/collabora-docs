import prisma from "./services/prisma.service";
import { Server } from "socket.io";
import { SocketUser } from "./types";
import { getUserByAccessToken, getUserIdByAccessToken } from "./helpers/user";

const io = new Server();

const roomUsers: Record<string, SocketUser[]> = {};

io.on("connection", (socket) => {
  socket.on("join-room", async ({ documentId, accessToken }) => {
    const user = await getUserByAccessToken(accessToken);
    const roomId = documentId.toString();
    socket.join(roomId);

    if (typeof roomUsers[roomId] === "undefined") {
      roomUsers[roomId] = [];
    }

    // Check if the user is already in the room to prevent duplicate entries
    const existingUser = roomUsers[roomId].find(
      (socketUser) => socketUser.user.id === user.id
    );
    if (!existingUser) {
      roomUsers[roomId].push({ socketId: socket.id, user });

      // Notify other users in the room that a new user has joined

      socket.broadcast.to(roomId).emit("user-joined", user);
    }

    //Broadcast the list of connected users to everyone in the room except him
    io.in(roomId).emit(
      "connected-users",
      roomUsers[roomId].map((socketUser) => socketUser.user)
    ); // send array of userIds

    await prisma.document
      .findFirst({
        where: {
          id: documentId,
        },
      })
      .then((data) => {
        socket.emit("initialize-document", data);
      });
  });

  socket.on("text-change", async ({ documentId, accessToken, delta }) => {
    const userId = getUserIdByAccessToken(accessToken);
    const roomId = documentId.toString();
    socket.to(roomId).emit("text-change", { delta, userId });
  });

  socket.on("save-document", async ({ documentId, content }) => {
    await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        autoSaveContent: content,
      },
    });
  });

  socket.on("cursor-selection", ({ documentId, accessToken, cursorPos }) => {
    //local user cursor selection updated
    //emit to all other users
    const userId = getUserIdByAccessToken(accessToken);
    const roomId = documentId.toString();
    socket.to(roomId).emit("remote-cursor-selection", { userId, cursorPos });
  });

  socket.on("cursor-move", ({ documentId, accessToken, cursorPos }) => {
    const userId = getUserIdByAccessToken(accessToken);
    const roomId = documentId.toString();
    socket.to(roomId).emit("remote-cursor-move", { userId, cursorPos });
  });

  socket.on("leave-room", async ({ documentId, accessToken }) => {
    const user = await getUserByAccessToken(accessToken);
    const roomId = documentId.toString();
    socket.leave(roomId);
    // Remove the user from the room list
    roomUsers[documentId] = roomUsers[documentId].filter(
      (socketUser) => socketUser.user.id !== user.id
    );

    // Notify other users in the room
    socket.to(roomId).emit("user-left", user);

    // Update the list of connected users in Current ROOM // Broadcasting not on all available rooms
    io.in(documentId).emit(
      "connected-users",
      roomUsers[documentId].map((socketUser) => socketUser.user)
    );
  });
});

export default io;
