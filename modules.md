# Modules and components

As described in the [architecture-document](architecture.md), the main modules of the system are client (frontend), which is a webpage, and a backend, which is a node/express server. The server serves the webpage via http, and the client then creates a websocket connection to the server, using socket.io JavaScript library.

# Express

Express is a widely used NodeJS-based webserver library. In our project, it simply serves the game.html file to the user. The project as it is could quite simply be written without express, so strictly speaking express is not necessary, but it simplifies the code and offers a lot of potential for further development, for example in the case that user authentication is added.

# Socket.io

Socket.io is a JavaScript library used for connecting client and server via websocket.

It simplifies the websocket connection and communication process. Both frontend and backend use it.
