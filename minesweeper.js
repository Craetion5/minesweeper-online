const express = require('express')
const app = express()
const http = require('http')
const port = 3000
const path = require('path')
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)

let clientAmount = 0;

let fullMap = [];
let clientMap = [];

// After game state update, broadcast new state to all clients
const updateStateToClients = () => {
  io.emit('gamestate updated', clientMap)
}

const updatePlayerCount = (state) => {
  io.emit('playercount updated', clientAmount)
}

const initGame = () => {
  clientMap = Array.from(Array(24), () => new Array(16));
  //0-8: mines, 9: unidentified, 10: flag, 11: mine

  for (let i = 0; i < clientMap.length; i++) {
    for (let j = 0; j < clientMap[0].length; j++) {
      clientMap[i][j] = 9;
    }
  }

  clientMap[0][0] = 1;
  clientMap[1][0] = 2;
  clientMap[2][0] = 3;
  clientMap[3][0] = 4;
  clientMap[4][0] = 5;
  clientMap[5][0] = 6;
  clientMap[6][0] = 7;
  clientMap[7][0] = 8;
  clientMap[0][1] = 10;
  clientMap[1][1] = 11;

}

initGame();

const runGameLogic = (x, y) => {
  // Check if x, y is an open tile
  // If not, return without doing anything
  // Otherwise, open tile x, y
  // then, run updateGameStateToClients(clientMap)
  console.log("running game logic")
}

app.use(express.static('public'))

app.get('/', (req, res) => {
  return res.redirect('/game.html');
})

io.on('connection', (socket) => {
  clientAmount += 1;
  updatePlayerCount();
  updateStateToClients(clientMap);
  socket.on('disconnect', () => {
    clientAmount -= 1;
    updatePlayerCount();
  })
  socket.on('clicked', (data) => {
    console.log("Player clicked on ", {data});
    runGameLogic(data.x, data.y);
  })
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

