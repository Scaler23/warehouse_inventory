require('dotenv').config()
const origin = process.env.ORIGIN
const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
app.use(cors());
const port = 3001;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:  origin,
    method: ["GET", "POST"],
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  // Handle new user connections
  socket.on("online-user", (session) => {
    if (!onlineUsers.some((user) => user.userId === session.id)) {
      const newUser = {
        socketId: socket.id,
        userId: session.id,
        userData: [session],
        isActive: true, // Assuming username is in the session
      };
      onlineUsers.push(newUser);
      console.log("New user connected:", onlineUsers);
    }
    console.log("Users Info", onlineUsers);
    io.emit("online-user", onlineUsers); // Emit updated user list to all clients
  });
  // TO RECON FUNCTION HERE

  socket.on("reconnect-user", (session) => {
    replaceSocketId(session.data.id, socket.id);
    console.log("reconnected User", onlineUsers);
    io.emit("reconnect-user", onlineUsers);
  });

  socket.on("offline-user", (session) => {
    const profile = findSocket(session.id);
    if (!profile) {
      console.log(`we cannot find user ${session.id}`);
      return;
    }
    profile.isActive = false;
    console.log(`user ${session.id} is now ${profile?.isActive}`);
    io.emit("offline-user", onlineUsers);
  });

  // Handle private messages (assuming you have a mechanism to validate sender and recipient)
  socket.on("private-message", ({sender_id, receiver_id, content, sent_at}) => {
    console.log(onlineUsers);
    const profile = findSocket(receiver_id);
    console.log(
      `sender_id is : ${sender_id} to : ${receiver_id} with socket of: ${profile?.socketId} message: ${content} time is : ${sent_at}`
    );
    io.to(profile?.socketId).emit("receive-message", {
      sender_id,
      receiver_id,
      content,
      sent_at,
    });
  });
});

// function findSocket(recipient) {
//   return onlineUsers.find((user) =>
//     user.userData.some((data) => data.id === recipient)
//   )?.socketId;
// }
function findSocket(recipient) {
  return onlineUsers.find((user) =>
    user.userData.some((data) => data.id === recipient)
  );
}

function replaceSocketId(recipient, newSocketId) {
  const socket = onlineUsers.find((user) =>
    user.userData.some((data) => data.id === recipient)
  );
  if (socket) {
    socket.socketId = newSocketId;
    socket.isActive = true;
  }
}

server.listen(port, () => {
  console.log("server is running at port", port);
  console.log(origin)
});
