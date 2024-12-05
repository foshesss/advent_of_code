const fs = require("fs")

const content = fs.readFileSync(
    "./inputs/day5.txt",
    { encoding: 'utf8', flag: 'r' }
)

let [instructions, order] = content.split("\n\n")
instructions = instructions.split('\n')
order = order.split('\n')

let prereqs = {}
let numbers_after = {}

for (let instruction of instructions) {
    let [prereq, next_number] = instruction.split('|')
    if (prereq == '') continue

    numbers_after[prereq] = numbers_after[prereq] || new Set()
    numbers_after[prereq].add(next_number)

    prereqs[next_number] = prereqs[next_number] || new Set()
    prereqs[next_number].add(prereq)
}

let valid_input = (numbers) => {
    let cannot_see = new Set()
    for (let number of numbers) {
        if (cannot_see.has(number)) {
            return false
        }

        // add numbers that cannot be seen now
        for (let n of prereqs[number] || new Set()) {
            cannot_see.add(n)
        }
    }
    
    return true
}

let invalid_amount = 0
let valid_amount = 0
for (let update of order) {
    let numbers = update.split(',')
    if (numbers[0] == '') continue

    if (valid_input(numbers)) {
        valid_amount += parseInt(numbers[Math.floor(numbers.length/2)])
        continue
    }

    // define order based on number of prereqs in update
    let positions = {}
    for (let i = 0; i < numbers.length; i++) {
        let number = numbers[i]
        positions[number] = 0

        for (let j = 0; j < numbers.length; j++) {
            if ((numbers_after[numbers[j]] || new Set()).has(number)) {
                positions[number]++
            }
        }
    }

    numbers.sort((a, b) => positions[a] > positions[b] ? 1 : -1)
    invalid_amount += parseInt(numbers[Math.floor(numbers.length/2)])
}

console.log("Part 1:", valid_amount)
console.log("Part 2:", invalid_amount)