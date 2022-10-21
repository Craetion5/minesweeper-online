let map = [];
let clientMap = [];
let mapHeight = null;
let mapWidth = null;

function createMap(height, width, minesPercentage) {
  map = []
  clientMap = []
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
  placeMines(height, width, minesPercentage);
  return { fullMap: map, clientMap };
}

function inBounds(x, y) {
  return x >= 0 && x < mapWidth && y >= 0 && y < mapHeight;
}

function calculateMinesPercentage(fullMap) {
  var amountOfMines = 0;
  for (let i = 0; i < fullMap[0].length; i++) {
    for (let j = 0; j < fullMap.length; j++) {
      if (fullMap[j][i] == 11) {
        amountOfMines++;
      }
    }
  }
  return amountOfMines / (fullMap.length * fullMap[0].length) * 100;
}

function placeMines(height, width, minesPercentage) {
  var amountOfMines = height * width * minesPercentage / 100;

  for (let index = 0; index < amountOfMines; index++) {
    mineX = Math.floor(Math.random() * width);
    mineY = Math.floor(Math.random() * height);
    if (map[mineY][mineX] === 11) {
      index--;
      continue;
    }
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
module.exports = { createMap, calculateMinesPercentage };
