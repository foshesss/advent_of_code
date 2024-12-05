const fs = require("fs")

const content = fs.readFileSync(
    "./inputs/day4.txt",
    { encoding: 'utf8', flag: 'r' }
)

const lines = content.split('\n')

let xmas = /XMAS/g



let matrix = []
for (let line of lines) {
    let arr = []
    for (let i = 0; i < line.length; i++) {
        let char = line.charAt(i)
        arr[i] = char
    }

    matrix.push(arr)
}

let characters = [ 'X', 'M', 'A', 'S' ]
let num_occurences = 0

for (let x = 1; x < matrix.length - 1; x++) {
    for (let y = 1; y < matrix[x].length - 1; y++) {
        if (matrix[x][y] != 'A') continue


        let str = `${matrix[x - 1][y - 1]}${matrix[x + 1][y + 1]}`
        if (str != "MS" && str != "SM") continue
    
        str = `${matrix[x + 1][y - 1]}${matrix[x - 1][y + 1]}`
        if (str != "MS" && str != "SM") continue
        num_occurences++
    }
}

console.log(num_occurences)