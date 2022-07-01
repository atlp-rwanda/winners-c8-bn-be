import socket from "socket.io";
import {server} from "../index"
import chatService from "../services/chatServices";

// Socket setup

const io = socket(server);

io.on('connection', socket=>{
  console.log('socket connected')

  // receive data from client
  socket.on('chat', data=>{

    //save message in db
    chatService.saveMessage(data);

    // send back data to all connected users/sockets
    io.sockets.emit('chat', data)
  });

  socket.on('typing', data=>{
    socket.broadcast.emit('typing', data)
  })
})

export default io