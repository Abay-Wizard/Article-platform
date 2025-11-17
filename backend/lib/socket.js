import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'], // Frontend URL
  },
});

const userSocketMap = {}; // userId -> socket.id

const getSocketId = (userId) => userSocketMap[userId];

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Broadcast online users
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
    if (userId) delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });

  // Optional: handle errors
  socket.on('error', (err) => console.error('Socket error:', err));
});

export { io, server, app, getSocketId };
