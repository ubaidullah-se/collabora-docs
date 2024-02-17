"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_service_1 = __importDefault(require("./services/prisma.service"));
const socket_io_1 = require("socket.io");
const user_1 = require("./helpers/user");
const io = new socket_io_1.Server();
const roomUsers = {};
io.on("connection", (socket) => {
    socket.on("join-room", ({ documentId, accessToken }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, user_1.getUserByAccessToken)(accessToken);
        const roomId = documentId.toString();
        socket.join(roomId);
        if (typeof roomUsers[roomId] === "undefined") {
            roomUsers[roomId] = [];
        }
        // Check if the user is already in the room to prevent duplicate entries
        const existingUser = roomUsers[roomId].find((socketUser) => socketUser.userId === user.id);
        if (!existingUser) {
            roomUsers[roomId].push({ socketId: socket.id, userId: user.id });
            // Notify other users in the room that a new user has joined
            socket.broadcast.to(roomId).emit("user-joined", user);
        }
        //Broadcast the list of connected users to everyone in the room except him
        io.in(roomId).emit("connected-users", roomUsers[roomId].map((socketUser) => socketUser.userId)); // send array of userIds
        prisma_service_1.default.document
            .findFirst({
            where: {
                id: documentId,
            },
        })
            .then((data) => {
            socket.emit("initialize-document", data);
        });
    }));
    socket.on("text-change", ({ documentId, delta }) => {
        prisma_service_1.default.document.update({
            where: {
                id: documentId,
            },
            data: {
                autoSaveContent: JSON.stringify(delta),
            },
        });
    });
    socket.on("save-document", ({ documentId, content }) => {
        prisma_service_1.default.document.update({
            where: {
                id: documentId,
            },
            data: {
                autoSaveContent: content,
            },
        });
    });
    socket.on("cursor-selection", ({ documentId, userId, cursorPos }) => {
        //local user cursor selection updated
        //emit to all other users
        const roomId = documentId.toString();
        socket.to(roomId).emit("remote-cursor-selection", { userId, cursorPos });
    });
    socket.on("cursor-move", ({ documentId, userId, cursorPos }) => {
        const roomId = documentId.toString();
        socket.to(roomId).emit("remote-cursor-move", { userId, cursorPos });
    });
    socket.on("leave-room", ({ documentId, accessToken }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, user_1.getUserByAccessToken)(accessToken);
        const roomId = documentId.toString();
        socket.leave(roomId);
        // Remove the user from the room list
        roomUsers[documentId] = roomUsers[documentId].filter((socketUser) => socketUser.userId !== user.id);
        // Notify other users in the room
        socket.to(roomId).emit("user-left", user.id);
        // Update the list of connected users in Current ROOM // Broadcasting not on all available rooms
        io.in(documentId).emit("connected-users", roomUsers[documentId].map((socketUser) => socketUser.userId));
    }));
});
exports.default = io;
//# sourceMappingURL=socket-app.js.map