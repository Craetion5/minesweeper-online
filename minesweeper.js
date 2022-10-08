const express = require("express");
const app = express();
const http = require("http");
const port = 3000;
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { createMap } = require("./gameLogic/mapGenerator.js");
let clientAmount = 0;

let fullMap = [];
let clientMap = [];

// After game state update, broadcast new state to all clients
const updateStateToClients = () => {
  io.emit("gamestate updated", clientMap);
};

const updatePlayerCount = (state) => {
  io.emit("playercount updated", clientAmount);
};

const initGame = () => {
  const maps = createMap(16, 24);
  fullMap = maps.fullMap;
  clientMap = maps.clientMap;

};

initGame();

const runGameLogic = (x, y) => {
  if (clientMap[y][x] === 9) {
    console.log("Running game logic");
    clientMap[y][x] = fullMap[y][x];
    updateStateToClients();
  } else {
    console.log("Tile was already opened");
  }
};

app.use(express.static("public"));

app.get("/", (req, res) => {
  return res.redirect("/game.html");
});

io.on("connection", (socket) => {
  clientAmount += 1;
  updatePlayerCount();
  updateStateToClients(clientMap);
  socket.on("disconnect", () => {
    clientAmount -= 1;
    updatePlayerCount();
  });
  socket.on("clicked", (data) => {
    console.log("Player clicked on ", { x: data.x, y: data.y, tile: clientMap[data.y][data.x] });
    runGameLogic(data.x, data.y);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
