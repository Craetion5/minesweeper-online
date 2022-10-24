# minesweeper-online

Minesweeper online is a project for the course "Networking systems and services" at University of Helsinki.

The basic idea is a HTML/JavaScript webpage that renders a minesweeper map that can be clicked by user, to solve minesweeper in cooperation with other users. The server will serve the webpage, run the game logic and use websocket connection via socket.io library to communicate with clients.

# Documentation

+ [Architecture](architecture.md)

# Running the server

Clone the project using git by `git clone https://github.com/Craetion5/minesweeper-online.git`

In the cloned folder, use `npm install` to install dependencies, and `node minesweeper.js` to run project.

Then, open your web browser and go to `http://localhost:3000` to play the game.