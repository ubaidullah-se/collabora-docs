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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const user_1 = require("./utils/user");
const collaborator_1 = require("./utils/collaborator");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
dotenv_1.default.config();
// Socket.io
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    // Add this
    let chatRoom = "";
    let allUsers = [];
    // Add a user to a document
    socket.on("joinUser", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, room } = data;
        socket.join(room);
        allUsers.push({ socketId: socket.id, userId, room });
        const chatRoomUsers = allUsers.map((user) => user.userId);
        const user = yield (0, user_1.getUserById)(userId);
        socket.to(room).emit("joinDocs", {
            collaborators: chatRoomUsers,
            user: user,
        });
    }));
    // Add user to
    socket.on("editDoc", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { content, documentId, room, collboartorId } = data;
        const user = yield (0, collaborator_1.resolveCollboartor)(collboartorId);
        if (user) {
            socket.to(room).emit("editedDoc", {});
        }
    }));
});
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use(`${process.env.API_VERSION}/user`, require("./routes/user"));
server.listen(3000);
//# sourceMappingURL=index.js.map