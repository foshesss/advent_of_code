const fs = require("fs")

const content = fs.readFileSync(
    "./inputs/day6.txt",
    { encoding: 'utf8', flag: 'r' }
)

let lines = content.split('\n')

let grid = []

let rotations = {
    'v': [1,0],
    '>': [0,1],
    '^': [-1,0],
    '<': [0,-1]
}

let rotation_directions = ['^', '>', 'v', '<']
let curr_pos = [0,0]
let soldier = '^'

for (let i = 0; i < lines.length; i++) {
    grid[i] = [];
    for (let j = 0; j < lines[i].length; j++) {
       grid[i][j] = lines[i].charAt(j)

        if (rotations[grid[i][j]]) {
            curr_pos = [i, j]
            soldier = grid[i][j]
        }
    }
}

let seen = new Set()
let directions_at_position = {}
seen.add(`${curr_pos[0]},${curr_pos[1]}`)

let obstructions = new Set()


while (true) {
    let last_pos = [curr_pos[0], curr_pos[1]]
    curr_pos = [curr_pos[0] + rotations[soldier][0], curr_pos[1] + rotations[soldier][1]]
    
    if (grid.length <= curr_pos[0] || curr_pos[0] < 0 || grid[0].length <= curr_pos[1] || curr_pos[1] < 0) {
        break
    }

    if (grid[curr_pos[0]][curr_pos[1]] == '#') {
        soldier = rotation_directions[(rotation_directions.indexOf(soldier) + 1) % 4]
        curr_pos = last_pos
    } else {

        // look for obstructions
        let s = `${curr_pos[0]},${curr_pos[1]}`
        directions_at_position[s] = directions_at_position[s] || new Set()
        directions_at_position[s].add(soldier)

        let rotated_soldier = rotation_directions[(rotation_directions.indexOf(soldier) + 1) % 4]
        let temp_pos = [curr_pos[0], curr_pos[1]]
        let obstacle_position = [curr_pos[0] + rotations[soldier][0], curr_pos[1] + rotations[soldier][1]]

        if ((directions_at_position[`${temp_pos[0]},${temp_pos[1]}`] || new Set()).has(rotated_soldier)) {
            let obstruction_position = [curr_pos[0] + rotations[soldier][0], curr_pos[1] + rotations[soldier][1]]
            obstructions.add(`${obstruction_position[0]},${obstruction_position[1]}`)
        } else if (
            grid.length > obstacle_position[0] &&
            obstacle_position[0] >= 0 &&
            grid[0].length > obstacle_position[1] &&
            obstacle_position[1] >= 0 &&
            grid[obstacle_position[0]][obstacle_position[1]] != '#'
        ) {
            while (true) {
                let last_pos = [temp_pos[0], temp_pos[1]]
                temp_pos = [temp_pos[0] + rotations[rotated_soldier][0], temp_pos[1] + rotations[rotated_soldier][1]]

                if (grid.length <= temp_pos[0] || temp_pos[0] < 0 || grid[0].length <= temp_pos[1] || temp_pos[1] < 0) {
                    break
                } else if (grid[temp_pos[0]][temp_pos[1]] == '#') {
                    rotated_soldier = rotation_directions[(rotation_directions.indexOf(rotated_soldier) + 1) % 4]
                    temp_pos = last_pos
                    continue
                }

                let temp_s = `${temp_pos[0]},${temp_pos[1]}`
                if ((directions_at_position[temp_s] || new Set()).has(rotated_soldier)) {
                    let obstruction_position = [curr_pos[0] + rotations[soldier][0], curr_pos[1] + rotations[soldier][1]]
                    obstructions.add(`${obstruction_position[0]},${obstruction_position[1]}`)
                    break
                }
            }
        }
        seen.add(s)
    }
}

for (let s of seen) {
    let [i, j] = s.split(',')
    grid[parseInt(i)][parseInt(j)] = 'X'
}

for (let s of obstructions) {
    let [i, j] = s.split(',')
    grid[parseInt(i)][parseInt(j)] = 'O'
}

const outputString = grid.map(row => row.join(',')).join('\n');
fs.writeFileSync('output.txt', outputString);


console.log(`Part 1: ${seen.size}`)
console.log(`Part 2: ${obstructions.size}`)

