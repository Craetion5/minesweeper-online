# Architecture

Game logic happens in a NodeJS backend. Game is rendered on a HTML/JavaScript frontend.

Description of basic flow of logic between frontend and backend using socket.io:
+ When user loads page, backend servers game.html which connects to backend via socket.io.
+ When user connects, backend sends a gamestate update event to client
+ Client renders the game state
+ When user clicks on a tile on the map, client sends a message to backend with coordinates where user clicked
+ When backend receives a click on x, y from user, it checks if that tile is still open. Then it performs game logic, either opening the tile and all connected mineless tiles, or shows that a mine was on the tile and reveals the whole map and the game is over.
+ After the game logic is done, backend emits a message to all connected clients
+ Client receives state update and renders the game state again
+ In addition, when client connects or disconnects, server will emit message of updated player count to all clients

Definition of event names backend and frontend should use. Backend always sends all events to all connected clients.
+ 'playercount updated' - data: updated playercount as integer
  + Backend should send this whenever client connects or disconnects
  + Frontend should refresh shown playercount when this is received
+ 'gamestate updated' - data: game state as two-dimensional array
  + Backend sends this after game logic is ran and game state is updated
  + Frontend listens to this event and renders gamestate every time it is received
+ 'clicked' - data: {x, y}
  + Frontend sends this when user clicks on tile
  + Backend listens to this event and performs game logic. Other user may have clicked on it right before, or the tile is not clickable (is already open). In this case, logic is interrupted and no update is done or sent.
+ 'connection' and 'disconnect' on backend only
  + Backend will update playercount accordingly and emit update to all clients