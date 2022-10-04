/*
Centralized event constants that both frontend and backend should use
when communicating via socket.io
*/

const PLAYERCOUNT_UPDATE = "playercount updated"
const GAME_UPDATE = "gamestate updated"
const CLICK = "client clicked on x, y"
console.log("moi from events")

export default { PLAYERCOUNT_UPDATE, GAME_UPDATE, CLICK };