import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import {PrismaClient} from "@prisma/client"

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

// io.on("connection", (socket) => {
//   // Add this
//   let chatRoom = "";
//   let allUsers: SocketUserDto[] = [];

//   // Add a user to a document
//   socket.on("joinUser", async (data: Omit<SocketUserDto, "socketId">) => {
//     const { userId, room } = data;

//     socket.join(room);

//     allUsers.push({ socketId: socket.id, userId, room });
//     const chatRoomUsers = allUsers.map((user) => user.userId);
//     const user = await getUserById(userId);
//     socket.to(room).emit("joinDocs", {
//       collaborators: chatRoomUsers,
//       user: user,
//     } as JoinedDocUserResp);
//   });

//   // Add user to
//   socket.on("editDoc", async (data: EditDocDto) => {
//     const { content, documentId, room, collboartorId } = data;
//     const user: User | null =  await resolveCollboartor(collboartorId)
//     if(user) {
//         socket.to(room).emit("editedDoc", {})
//     }
//   });
// });


const roomUsers = {};
const prismaClient = new PrismaClient()

io.on('connection', (socket) => {
  //Join-Room event listener
  socket.on('join-room', ({ roomId, username }) => {

    console.log("Socket connection Start");
    socket.join(roomId);
    console.log("Connected with socket id:" + socket.id + "  roomId:" + roomId + " user:" + username);

    // Initialize the room in the roomUsers object if it doesn't exist
    if (typeof roomUsers[roomId] === 'undefined') {
      console.log(`Initializing roomUsers for roomId: ${roomId}`);
      roomUsers[roomId] = [];
    }

    // Check if the user is already in the room to prevent duplicate entries
    const existingUser = roomUsers[roomId].find(user => user.username === username);
    if (!existingUser) {
      console.log(`Adding new user ${username} to room ${roomId}`);
      roomUsers[roomId].push({ id: socket.id, username });

      // Notify other users in the room that a new user has joined
     // socket.to(roomId).emit('user-joined', username);
      socket.broadcast.to(roomId).emit('user-joined', username);
      console.log(`Notified other users in room ${roomId} of new user ${username}`);
    } else {
      console.log(`User ${username} already in room ${roomId}, not re-adding or notifying.`);
    }
    console.log(JSON.stringify(roomUsers));
    //Broadcast the list of connected users to everyone in the room except him
    io.in(roomId).emit('connected-users', roomUsers[roomId].map(user => user.username));  // send array of UserNames

    console.log("Query Execution>>> ");
  

    prismaClient.document.findFirst({
      where:{
        id: roomId
      }
    }).then((data) => {
      
      socket.emit('initialize-document', data);
    })

  });
  // Join-Room Ends
  

  socket.on('text-change', ({ delta, roomId, username }) => {
    console.log("TEXT-CHnage event "+ JSON.stringify(delta));

    prismaClient.document.update({
      where:{
        id: roomId
      },
      data:{
        autoSaveContent: JSON.stringify(delta)
      }
    })

  });

  socket.on('save-document', ({ roomId, content }) => {

    prismaClient.document.update({
      where:{
        id: roomId
      },
      data:{
        autoSaveContent: content
      }
    })

  });

  socket.on('cursor-selection', ({roomId, username, cursorPos}) =>{ //local user cursor selection updated
    //emit to all other users
    console.log("Cursor selection updated for " + username + " " +  JSON.stringify(cursorPos));
    socket.to(roomId).emit('remote-cursor-selection', {username, cursorPos});
  });

  socket.on('cursor-move', ({roomId, username, cursorPos}) => {
    console.log("cursor movement change for " + username + JSON.stringify(cursorPos) );
    socket.to(roomId).emit('remote-cursor-move', {username, cursorPos});
  });

  socket.on('leave-room', ({ roomId, username }) => {
    socket.leave(roomId);
    console.log(`User  ${username}  left from Room: ${roomId}`);
    // Remove the user from the room list
    roomUsers[roomId] = roomUsers[roomId].filter(user => user.username !== username);

    // Notify other users in the room
    socket.to(roomId).emit('user-left', username);

    // Update the list of connected users in Current ROOM // Broadcasting not on all available rooms
    io.in(roomId).emit('connected-users', roomUsers[roomId].map(user => user.username));
  });

})


app.use(express.json());
app.use(cors({
  origin: "*"
}));

app.use(`${process.env.API_VERSION}/user`, require("./routes/user"));
app.use(`${process.env.API_VERSION}/collaborator`, require("./routes/collaborator"));
app.use(`${process.env.API_VERSION}/document`, require("./routes/document"));
app.use(`${process.env.API_VERSION}/project`, require("./routes/project"));

server.listen(process.env.PORT);
