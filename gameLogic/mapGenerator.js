const map = [];
const clientMap = [];
let mapHeight = null;
let mapWidth = null;

function createMap(height, width) {
  mapHeight = height;
  mapWidth = width;
  for (let y = 0; y < height; y++) {
    var row = [];
    var row1 = [];
    for (let x = 0; x < width; x++) {
      row[x] = 0;
      row1[x] = 9;
    }
    map[y] = row;
    clientMap[y] = row1;
  }
  placeMines(height, width);
  for (line of map) {
    console.log(line);
  }
  return { fullMap: map, clientMap };
}

function inBounds(x, y) {
    return x >= 0 && x < mapWidth && y >= 0 && y < mapHeight;
}

function placeMines(height, width) {
  var amountOfMines = height / 2;

  for (let index = 0; index < amountOfMines; index++) {
    mineX = Math.floor(Math.random() * width);
    mineY = Math.floor(Math.random() * height);
    map[mineY][mineX] = 11;

    for (let dx = -1; dx <= 1; dx += 1) {
        for (let dy = -1; dy <= 1; dy += 1) {
            if (dx === dy === 0) {
                continue;
            }
            let x = mineX + dx;
            let y = mineY + dy;
            if (!inBounds(x, y)) {
                continue;
            }
            if (map[y][x] < 8 && map[y][x] >= 0) {
                map[y][x] += 1;
            }
        }
    }
  }
}

function updateMapValue(x, y, type) {
  if (type == "flag") {
    clientMap[y][x] = 10;
  } else {
    clientMap[y][x] = map[y][x];
  }
}
module.exports = { createMap };
