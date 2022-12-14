# minesweeper-online

Minesweeper online is a project for the course "Networking systems and services" at University of Helsinki.

The basic idea is a HTML/JavaScript webpage that renders a minesweeper map that can be clicked by user, to solve minesweeper in cooperation with other users. The server will serve the webpage, run the game logic and use websocket connection via socket.io library to communicate with clients.

The relevant code files are:
+ [minesweeper.js](minesweeper.js) for the backend main file
+ [gameLogic/gameLogic.js](gameLogic.js) for the game logic ran on backend
+ [public/game.html](public/game.html) for the frontend logic

Code is documented with JsDoc, which means that important functions are commented accordingly, and "out" folder has html documentation that can be viewed with browser if you clone the repository.

# License

The project is licensed under MIT-license, [read document here](LICENSE.md).

We chose MIT-license because it accurately represents our desires for the project to be open-source and to limit any responsibility for us in case people use the code. It is also well compatible with the external libraries we used as they both use this same license (socket.io and Express).

# Documentation

+ [Architecture](architecture.md)
+ [Modules](modules.md)
+ [Fallacies & Future work](fallacies&future.md)
+ [Goals](goals.md)

All code provided should be working with the exception of some minor bugs, which may remain unnoticed for normal play. Unfixed but known bugs are documented as github-issues:
+ [Issue: Click coordinates bug](https://github.com/Craetion5/minesweeper-online/issues/16)
+ [Issue: Timer delay](https://github.com/Craetion5/minesweeper-online/issues/32)
+ [Issue: Game can be lost after winning](https://github.com/Craetion5/minesweeper-online/issues/34)

# Running the server

Clone the project using git by `git clone https://github.com/Craetion5/minesweeper-online.git`

In the cloned folder, use `npm install` to install dependencies, and `node minesweeper.js` to run project.

Then, open your web browser and go to `http://localhost:3000` to play the game.
