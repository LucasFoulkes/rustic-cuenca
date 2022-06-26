const express = require("express");
var cors = require("cors");
const path = require("path");
const http = require("http");
const { ref } = require("./firebase");
const app = express();
const bodyParser = require("body-parser");
const server = http.createServer(app);
const fs = require("fs");
const { filterValid, filterWhitelist } = require("./middleware/filter");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const PORT = process.env.PORT || 3001;

function writeToFile(data) {
  fs.writeFile("./database.json", data, (err) => {
    if (err) {
      console.log("File write failed:", err);
      return;
    }
    console.log("File written successfully!");
  });
}

ref.on("value", function (snapshot) {
  io.emit("db_data", { message: "new db_data" });
  writeToFile(JSON.stringify(filterValid(snapshot.val())));
  console.log("new db_data");
});

io.on("connection", function (socket) {
  console.log(`user ${socket.id} connected`);
  socket.on("db_data", function (data) {
    console.log(`user ${socket.id} sent db_data ${data.message}`);
    socket.emit("db_data", { message: "new db_data" });
  });
  socket.on("disconnect", function () {
    console.log(`user ${socket.id} disconnected`);
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("client/build"));
app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/src/index.html");
});

app.use("/tables", require("./routes/tables"));

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
