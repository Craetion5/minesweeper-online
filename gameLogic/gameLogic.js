
const runGameLogic = (clientMap, fullMap, x, y) => {
    // Return -1 if game lost, 1 if won, 0 if continues. null if no update
    if (clientMap[y][x] === 9) {

        // Check if current is mine.
        if (fullMap[y][x] === 11) {
            return -1;
        }
        // Check if current has no mines around it, open adjacent tiles in that case.
        if (fullMap[y][x] === 0) {
            openAdjacentTiles(clientMap, fullMap, x, y, [])
        // Otherwise we only open that tile.
        } else {
            clientMap[y][x] = fullMap[y][x];
        }

        return allOpened(clientMap, fullMap) ? 1 : 0;
    } else {
        console.log("Tile was already opened");
        return null;

    }
};

// Checks if all mineless tiles are opened
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

const openAdjacentTiles = (clientMap, fullMap, x, y, visited) => {
    for (let dx = -1; dx <= 1; dx += 1) {
        for (let dy = -1; dy <= 1; dy += 1) {
            let curx = x + dx;
            let cury = y + dy;
            if (!(curx < clientMap[0].length && cury < clientMap.length
                && curx >= 0 && cury >= 0)) {
                continue;
            }
            if (visited.find(coord => coord.x === curx && coord.y === cury)) {
                continue;
            }
            visited.push({ x: curx, y: cury })

            if (fullMap[cury][curx] > 8) {
                continue;
            }

            clientMap[cury][curx] = fullMap[cury][curx]
            if (fullMap[cury][curx] === 0) {
                openAdjacentTiles(clientMap, fullMap, curx, cury, visited)
            }
        }
    }
};

module.exports = { runGameLogic }