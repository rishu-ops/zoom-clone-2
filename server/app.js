const express = require("express");
const bodyPaser = require("body-parser");
const socketIo = require("socket.io");
const http = require("http");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const { db } = require("./db/db.connect");
const PORT = process.env.PORT || 4000;

require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
  })
);

const io = socketIo(server, {
  cors: { origin: "*" },
});

db();

app.use(express.json());
app.use(cors());
app.use(userRoutes);

app.use(bodyPaser.json());

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { emailId, roomId } = data;
    emailToSocketIdMap.set(emailId, socket.id);
    socketidToEmailMap.set(socket.id, emailId);
    io.to(roomId).emit("user:joined", { emailId, id: socket.id });
    socket.join(roomId);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});

app.get("/", (req, res) => {
  res.send(`<h1>Welcome Zoom-clone APIs!</h1>`);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
