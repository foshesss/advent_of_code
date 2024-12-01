const fs = require("fs")

const content = fs.readFileSync(
    "./inputs/day1part1.txt",
    { encoding: 'utf8', flag: 'r' }
)

const lines = content.split('\n')

let list_a = []
let list_b = []

for (let line of lines) {
    let [first_char, last_char] = line.split("   ");
    list_a.push(parseInt(first_char));
    list_b.push(parseInt(last_char))
}

list_a.sort((a, b) => a - b)
list_b.sort((a, b) => a - b)


let total = 0;
for (let i = 0; i < list_a.length; i++) {
    total += Math.abs(list_b[i] - list_a[i])
}

console.log("Part 1: ", total)

// part 2
let score = 0;
for (let i = 0; i < list_a.length; i++) {
    let target = list_a[i];

    let num_occurrences = 0;
    for (let j = 0; j < list_a.length; j++) {
        if (list_b[j] == target) num_occurrences++
    }
    score += (num_occurrences * target)   
}
console.log("Part 2: ", score)