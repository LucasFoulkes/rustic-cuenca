const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const { db } = require("./config/firebase");
//check how necessary this is once in Heroku
const cors = require("cors");
const { filterValid } = require("./middleware/filter");

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
});

app.use(cors);

PORT = process.env.PORT || 3001;
let firebaseRaw;
let messages = {};
let users = { admin: { whitelist: [] } };

function response(userId, users) {
  console.log("response", users[userId].whitelist);
  const whitelist = users[userId].whitelist;
  const raw = messages;
  return { raw, whitelist };
}

function filterWhitelist(messages, whitelist) {
  messages = Object.entries(messages).reduce((acc, [key, value]) => {
    if (whitelist.includes(key)) {
      acc[key] = value;
    }
    return acc;
  }, {});
  console.log("filtered", messages);
  return messages;
}

db.ref("/rustic").on("value", (snapshot) => {
  console.log("db-update");
  messages = filterValid(snapshot.val());
  firebaseRaw = snapshot.val();
  console.log(Object.keys(firebaseRaw));
  io.emit("db-update");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("data-request", (data) => {
    console.log("data-request", data);
    socket.emit("db-response", response(data.id, users));
  });
  socket.on("whitelist-add", (data) => {
    console.log("whitelist-add", data.user.id, data.index);
    if (!users[data.user.id].whitelist.includes(data.index)) {
      users[data.user.id].whitelist.push(data.index);
      socket.emit("db-response", response(data.user.id, users));
    }
  });
  socket.on("whitelist-del", (data) => {
    console.log("whitelist-add", data.user.id, data.index);
    if (users[data.user.id].whitelist.includes(data.index)) {
      users[data.user.id].whitelist.splice(
        users[data.user.id].whitelist.indexOf(data.index),
        1
      );
      socket.emit("db-response", response(data.user.id, users));
    }
  });

  socket.on("restaurant-request", (data) => {
    console.log("restaurant-request", users);
    socket.emit(
      "restaurant-request",
      filterWhitelist(messages, users[data.id].whitelist)
    );
  });

  socket.on("table-request", (data) => {
    console.log("table-request", data);
    console.log(Date.now());
    firebaseRaw[String(Date.now()).slice(0, -3)] = `${data.table}1000`;
    db.ref("/rustic").update(firebaseRaw);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
