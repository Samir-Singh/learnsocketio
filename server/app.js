import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { createServer } from "http";
dotenv.config();
const url = process.env.FRONTEND_URL;
const port = 3000;

console.log(url, "ddfdfsds");

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });

  socket.on("message", ({ room, message }) => {
    // socket.broadcast.emit("receive-message", data);
    io.to(room).emit("receive-message", { room, message });
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.emit("welcome", "Welcome to the server!");
});

app.get("/", (req, res) => {
  res.send("Hello World from server!");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
