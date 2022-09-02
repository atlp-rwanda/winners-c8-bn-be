import socket from "socket.io";
import { server } from "../index";
import { verifyToken } from "../middlewares/hash";
import chatService from "../services/chatServices";
import UserService from "../services/user";
let decodedToken;

// Socket setup
const io = socket(server);

// middleware for authentication
io.use(async (socket, next) => {
  const { token } = socket.handshake.auth;
  try {
    if (token) {
      decodedToken = await verifyToken(token);
      socket.decodedToken = decodedToken;
      return next();
    }
    throw new Error("User not authorized ");
  } catch (error) {
    return next(error);
  }
});

let onlineUsers = 0;
export const ipsconnected = {};

io.on("connection", async (socket) => {
  const user = await UserService.checkUser(socket.decodedToken.email);
  const connectedUser = socket.id; // for real app use user.id or socket.handshake.address
  if (!ipsconnected.hasOwnProperty(connectedUser)) {
    ipsconnected[connectedUser] = {
      socket,
      user: { firstName: user.firstName, id: user.id },
    };
    onlineUsers += 1;
    io.emit("online", onlineUsers);
  }
  // associate connected socket to user
  io.to(socket.id).emit("onLoad", user);

  // receive data from client
  socket.on("chat", (data) => {
    const newChat = {
      sender: `${user.firstName}` + ` ${user.lastName}`.toLowerCase(),
      postedBy: user.id,
      message: data.message.toLowerCase(),
    };
    //save ew chat in db
    chatService.saveMessage(newChat);

    // send back data to all connected users/sockets
    socket.broadcast.emit("chat", data);
    io.to(socket.id).emit("onlyMe", data);
  });

  const Chats = await chatService.retrieveMessages();

  io.to(socket.id).emit("message", {
    Chats,
    sender: `${user.firstName} ${user.lastName}`,
  });

  // typing info to other sockets except me
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("disconnect", () => {
    if (ipsconnected.hasOwnProperty(connectedUser)) {
      delete ipsconnected[connectedUser];
      onlineUsers -= 1;
      io.emit("online", onlineUsers);
    }
  });
});

export default io;
