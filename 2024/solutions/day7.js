const fs = require("fs")

const content = fs.readFileSync(
    "./inputs/day7.txt",
    { encoding: 'utf8', flag: 'r' }
)

const lines = content.split('\n')

function generatePermutations(options, n) {
    if (n === 0) return [[]]; // Base case: return an empty array inside an array
    const smallerPermutations = generatePermutations(options, n - 1); // Recursive step
    const permutations = [];
    
    for (const perm of smallerPermutations) {
        for (const option of options) {
            permutations.push([...perm, option]);
        }
    }
    
    return permutations;
}

let ans = 0
for (let line of lines) {
    let [target, nums] = line.split(':')
    nums = nums.trim().split(' ')
    target = parseInt(target)

    let valid = false
    let combinations = generatePermutations([1, -1], nums.length)
    for (let combo of combinations) {
        let total = 0
        for (let i = 0; i < nums.length; i++) {
            let n = parseInt(nums[i])
            if (combo[i] == -1) {
                total *= n
            } else {
                total += n
            }
            if (total > target) break
        }

        if (total == target) {
            valid = true
            break
        }
    }

    if (!valid) {
        let combinations = generatePermutations([1, 0, -1], nums.length)
        for (let combo of combinations) {
            let total = 0
            for (let i = 0; i < nums.length; i++) {
                let n = parseInt(nums[i])

                if (combo[i] == 0) {
                    total = parseInt(`${total}${n}`)
                } else if (combo[i] == -1) {
                    total *= n
                } else {
                    total += n
                } 
                if (total > target) break
            }

            if (total == target) {
                valid = true
                break
            }
        }
    }

    if (valid) {
        ans += target
    }
}
console.log("Part 1: ", ans)
