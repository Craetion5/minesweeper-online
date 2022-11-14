/**
 * Runs game logic
 * @param {array} clientMap
 * @param {array} fullMap
 * @param {int} x
 * @param {int} y
 * @returns int if tile open was successful: -1 = game lost, 0 = game continues, 1 = game won, 2 = map reroll due to first click.
 *          null if no update was made because tile was already opened
 */

const runGameLogic = (clientMap, fullMap, x, y) => {
  // Return -1 if game lost, 1 if won, 0 if continues, 2 if map is rerolled due to first click. null if no update

  let firstClick = freshGame(clientMap, fullMap);

  if (clientMap[y][x] === 9) {
    // Check if current is mine.
    if (fullMap[y][x] === 11) {
      if (firstClick) {
        return 2;
      }
      return -1;
    }
    // Check if current has no mines around it, open adjacent tiles in that case.
    if (fullMap[y][x] === 0) {
      openAdjacentTiles(clientMap, fullMap, x, y, []);
      // Otherwise we only open that tile.
    } else {
      clientMap[y][x] = fullMap[y][x];
      if (firstClick) {
        return 2;
      }
    }

    return allOpened(clientMap, fullMap) ? 1 : 0;
  } else {
    console.log("Tile was already opened");
    return null;
  }
};

/**
 * Checks if all mineless tiles are opened
 * */
const allOpened = (clientMap, fullMap) => {
  for (let x = 0; x < clientMap[0].length; x += 1) {
    for (let y = 0; y < clientMap.length; y += 1) {
      if (clientMap[y][x] == 9 && fullMap[y][x] != 11) {
        return false;
      }
    }
  }
  return true;
};

/** Checks if this is a fresh game */
const freshGame = (clientMap, fullMap) => {
  for (let x = 0; x < clientMap[0].length; x += 1) {
    for (let y = 0; y < clientMap.length; y += 1) {
      if (clientMap[y][x] != 9 && clientMap[y][x] != 10) {
        return false;
      }
    }
  }
  return true;
};
/**
 * Opens adjacent tiles.
 * @param {array} clientMap
 * @param {array} fullMap
 * @param {int} x Coordinates of where to start
 * @param {int} y
 * @param {array} visited Array of visited tiles, start with empty array
 */
const openAdjacentTiles = (clientMap, fullMap, x, y, visited) => {
  for (let dx = -1; dx <= 1; dx += 1) {
    for (let dy = -1; dy <= 1; dy += 1) {
      let curx = x + dx;
      let cury = y + dy;
      if (
        !(
          curx < clientMap[0].length &&
          cury < clientMap.length &&
          curx >= 0 &&
          cury >= 0
        )
      ) {
        continue;
      }
      if (visited.find((coord) => coord.x === curx && coord.y === cury)) {
        continue;
      }
      visited.push({ x: curx, y: cury });

      if (fullMap[cury][curx] > 8) {
        continue;
      }

      clientMap[cury][curx] = fullMap[cury][curx];
      if (fullMap[cury][curx] === 0) {
        openAdjacentTiles(clientMap, fullMap, curx, cury, visited);
      }
    }
  }
};

module.exports = { runGameLogic };
