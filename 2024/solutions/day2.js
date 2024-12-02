const fs = require("fs")

const content = fs.readFileSync(
    "./inputs/day2part1.txt",
    { encoding: 'utf8', flag: 'r' }
)

const lines = content.split('\n')

const check_line = (n) => {
    let increasing = n[1] - n[0] > 0

    for (let i = 1; i < n.length; i++) {
        let n0 = n[i - 1];
        let n1 = n[i];
        let diff = n1 - n0;

        if (Math.abs(diff) > 3 || diff == 0) {
            console.log(n, "UNSAFE")
            return i
        }

        if (diff > 0 != increasing) {
            console.log(n, "UNSAFE")
            return i
        }
    }
}

let safe = 0;
for (let line of lines) {
    let nums = line.split(" ")

    let ok = false

    for (let i = 0; i < nums.length; i++) {
        let nums_temp = [...nums]
        nums_temp.splice(i, 1)

        let problem_idx = check_line(nums_temp)

        if (problem_idx) continue
        ok = true
        break
    }

    if (!ok) continue
    safe++
}


console.log(safe)