import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import socketApp from "./socket-app";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

socketApp.attach(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/collaborator", require("./routes/collaborator"));
app.use("/api/v1/document", require("./routes/document"));
app.use("/api/v1/project", require("./routes/project"));

server.listen(PORT, () => {
  console.log(
    `server listening on port ${PORT}`,
    "-->",
    `http://localhost:${PORT}`
  );
});
