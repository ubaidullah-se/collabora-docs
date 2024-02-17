"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_app_1 = __importDefault(require("./socket-app"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = process.env.PORT;
socket_app_1.default.attach(server, { cors: { origin: "*" } });
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/collaborator", require("./routes/collaborator"));
app.use("/api/v1/document", require("./routes/document"));
app.use("/api/v1/project", require("./routes/project"));
server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`, "-->", `http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map