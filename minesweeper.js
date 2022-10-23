const express = require("express");
const app = express();
const http = require("http");
const port = 3000;
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { createMap} = require("./gameLogic/mapGenerator.js");
const { runGameLogic } = require("./gameLogic/gameLogic.js");
let clientAmount = 0;

let fullMap = [];
let clientMap = [];

// After game state update, broadcast new state to all clients
const updateStateToClients = () => {
  io.emit("gamestate updated", clientMap, gameStatus);
};

const updateNewGameToClients = () => {
  io.emit("new game activated", clientMap);
};

const updatePlayerCount = (state) => {
  io.emit("playercount updated", clientAmount);
};

const initGame = (gameWidth, gameHeight, mineDensity) => {
  const maps = createMap(gameHeight, gameWidth, mineDensity);
  fullMap = maps.fullMap;
  clientMap = maps.clientMap;

};

initGame(24, 16, 15);


app.use(express.static("public"));

app.get("/", (req, res) => {
  return res.redirect("/game.html");
});

io.on("connection", (socket) => {
  clientAmount += 1;
  gameStatus = 0;
  updatePlayerCount();
  updateStateToClients(clientMap, gameStatus);
  socket.on("disconnect", () => {
    clientAmount -= 1;
    updatePlayerCount();
  });
  socket.on("clicked", (data) => {
    console.log({ data })
    console.log("Player clicked on ", { x: data.x, y: data.y, tile: clientMap[data.y][data.x] });
    const state = runGameLogic(clientMap, fullMap, data.x, data.y);
    if (state === 1) {
      console.log("Game won")
      gameStatus = 1;
    } else if (state === -1) {
      console.log("Game over")
      clientMap = fullMap // reveal map if game over
      gameStatus = -1
    }
    if (state != null) {
      updateStateToClients();
    }
  });
  socket.on("rightClicked", (data) => {
    console.log({ data })
    console.log("Player right clicked on ", { x: data.x, y: data.y, tile: clientMap[data.y][data.x] });
    if (clientMap[data.y][data.x] === 10) {
      clientMap[data.y][data.x] = 9;
    } else if (clientMap[data.y][data.x] === 9){
      clientMap[data.y][data.x] = 10;
    }
    updateStateToClients(clientMap);
  });
  socket.on("newGame", (data) => {
    console.log("Starting a new game...")
    initGame(data.gameWidth, data.gameHeight, data.mineDensity);
    updateNewGameToClients(clientMap, gameStatus=0);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
