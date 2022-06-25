const express = require("express");
var cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { ref } = require("./firebase");
const c = require("ansi-colors");
const { filterValid, filterWhitelist } = require("./middleware/filter");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
app.use(cors());

const port = 4001;

let rawData;
let whitelistedTables;
let whitelist = new Set();

ref.on("value", function (snapshot) {
  console.log("db-change");
  rawData = filterValid(snapshot.val());
  whitelistedTables = filterWhitelist(rawData, whitelist);
  io.emit("rawData", rawData);
  io.emit("whitelisted", whitelistedTables);
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("rawData", (data) => {
    if ((data.message = "subscribe")) {
      console.log(`${socket.id} subscribed to raw`);
      socket.emit("rawData", rawData);
    }
  });

  socket.on("whitelist", (data) => {
    if (data.message === "add") {
      whitelist.add(data.index);
      console.log(`${socket.id} added ${data.index} to whitelist`);
    } else if (data.message === "remove") {
      whitelist.delete(data.index);
      console.log(`${socket.id} removed ${data.index} from whitelist`);
    } else if (data.message === "subscribe") {
      console.log(`${socket.id} subscribed to whitelist`);
      socket.emit("whitelist", Array.from(whitelist));
    }
    whitelistedTables = filterWhitelist(rawData, whitelist);
    socket.emit("whitelisted", whitelistedTables);
  });

  socket.on("whitelisted", (data) => {
    if (data.message === "subscribe") {
      console.log(`${socket.id} subscribed to whitelisted`);
      socket.emit("whitelisted", whitelistedTables);
    }
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
