const express = require('express')
const app = express()
const http = require('http')
const port = 3000
const path = require('path')
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)

let clientAmount = 0;


// After game state update, broadcast new state to all clients
const updateStateToClients = (state) => {
  io.emit('state update', {})
}

const updatePlayerCount = (state) => {
  io.emit('playercount updated', clientAmount)
}


app.use(express.static('public'))

app.get('/', (req, res) => {
  return res.redirect('/game.html');
})

io.on('connection', (socket) => {
  clientAmount += 1;
  updatePlayerCount();
  socket.on('disconnect', () => {
    clientAmount -= 1;
    updatePlayerCount();
  })
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


