const express = require("express");
const app = express();
const http = require("http");
const port = 3000;
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { createMap } = require("./gameLogic/mapGenerator.js");
const { runGameLogic } = require("./gameLogic/gameLogic.js");
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
    console.log({data})
    console.log("Player clicked on ", { x: data.x, y: data.y, tile: clientMap[data.y][data.x] });
    const state = runGameLogic(clientMap, fullMap, data.x, data.y);
    if (state === 1) {
      console.log("Game won")
    } else if (state === -1) {
      console.log("Game over")
      clientMap = fullMap // reveal map if game over
    }
    if (state != null) {
      updateStateToClients();
    }
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
