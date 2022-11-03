# Modules and components

As described in the [architecture-document](architecture.md), the main modules of the system are client (frontend), which is a webpage, and a backend, which is a node/express server. The server serves the webpage via http, and the client then creates a websocket connection to the server, using socket.io JavaScript library.

# Express

Express is a widely used NodeJS-based webserver library. In our project, it simply serves the game.html file to the user. The project as it is could quite simply be written without express, so strictly speaking express is not necessary, but it simplifies the code and offers a lot of potential for further development, for example in the case that user authentication is added.

# Socket.io

Socket.io is a JavaScript library used for connecting client and server via websocket.

It simplifies the websocket connection and communication process. Both frontend and backend use it.

# WebSocket

WebSocket is an application layer protocol supported by modern browsers. It provides a communication channel through a single TCP connection. It allows the server to push data to the client, as opposed to HTTP which only works on request-response basis. Therefore the client does not have to poll the server for updates, which would create unnecessary network traffic and delay of updates.

# Pros and cons

The Express and Socket.io libraries do not have many downsides, at least at the current scale of the project. They serve to simplify writing the code.

Because the backend is built on NodeJS, it is single-threaded. If the project were to be scaled to handle larger amounts of players or several simultaneous game sessions, this could become a problem. However, worker threads are possible, which allows parallel JavaScript execution.

The chosen system architecture where the game logic is ran on the backend, has some pros and cons which are evaluated in the [architecture-document](architecture.md)-document.