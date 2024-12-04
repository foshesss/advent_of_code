const fs = require("fs");
const content = fs.readFileSync(
    "./inputs/day3.txt",
    { encoding: 'utf8', flag: 'r' }
)


const regexp = /do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g;
let ans = 0
const array = [...content.matchAll(regexp)];

let allowed = true
for (let match of array) {

    let [m] = match

    if (m == "do()") allowed = true
    else if (m == "don't()") allowed = false
    else if (allowed) {
        let [n0, n1] = m.slice(4, m.length - 1).split(',')
        n0 = parseInt(n0)
        n1 = parseInt(n1)
    
        ans += n0 * n1
    }
}

console.log(ans)