
const map =  []
const clientMap = []

function createMap(height, width) {
    for (let y = 0; y < height; y++) {
        var row = []
        var row1 = []
        for (let x = 0; x < width; x++) {
            row[x] = 0;
            row1[x] = 0;
        }
        map[y] = row
        clientMap[y] = row1
    }
    placeMines(height, width);
return map
}

function placeMines(height, width) {
    var amountOfMines = height / 2;

    for (let index = 0; index < amountOfMines; index++) {
           randomX = Math.floor(Math.random() * width);
           randomY = Math.floor(Math.random() * height);
           map[randomY][randomX] = "*";
           
           if(randomY + 1 < height && randomX + 1 < width) {
            if(typeof map[randomY + 1][randomX + 1] == "number"){
                map[randomY + 1][randomX + 1] += 1
            }
            
           }
           if(randomY + 1 < height) {
            if(typeof map[randomY + 1][randomX] == "number"){
            map[randomY + 1][randomX] += 1
            }
           }
           if(randomX + 1 < width) {
            if( typeof map[randomY][randomX + 1] == "number"){
            map[randomY][randomX + 1] += 1
            }
           }
           if(randomY - 1 >= 0 && randomX - 1 >= 0) {
            if(typeof map[randomY - 1][randomX - 1] == "number"){
            map[randomY-1][randomX-1] += 1
            }
           }
           if(randomY - 1 >= 0) {
            if(typeof map[randomY - 1][randomX] == "number"){
            map[randomY-1][randomX] += 1
            }
           }
           if(randomX - 1 >= 0) {
            if(typeof map[randomY][randomX - 1] == "number"){
            map[randomY][randomX-1] += 1
            }
           }
           
    }

}

function updateMapValue(x, y, type) {
    if(type == "flag") {
        clientMap[y][x] = "/"
    } else {
        clientMap[y][x] = map[y][x]

    }

}
module.exports = { createMap };