# Architecture

Game logic happens in a NodeJS Express backend. Game is rendered on a HTML/JavaScript frontend. The Express server first serves the game.html file, which contains HTML/CSS and JavaScript code, which then creates a websocket connection to server using socket.io. The following diagram explains how the basic flow of logic happens with socket.io. Notice that there can be many frontends connected to the same backend, and all messages sent by backend are sent to **all clients** at once.

![Sequence diagram of flow of logic between frontend and backend](sequencediagram.png)

Some notices of the sequence diagram above:
+ When server receives click and runs the game logic, it may happen that the click is on a tile that is already opened before, perhaps due to a click by some other client. In this case nothing happens, no gamestate update is sent to clients, since it has been sent when the previous successful click was processed.
+ Server initializes map size when new map is generated, but mine locations are randomed only after the first click is made, to make sure that the first click cannot be a mine.

# Module description

