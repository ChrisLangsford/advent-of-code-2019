const input = require("./input-14");


function part1(input) {
    let costs = {};
    let lines = input.split("\n");
    lines.forEach(line => {
        let inn = line.split("=>")[0].trim();
        let out = line.split("=>")[1].trim();
        costs[out] = inn;
    });
    //this way we can break input into its constituent parts
    //input.split("\n")[0].split("=>")[0].split(",")[0].trim().split(" ")
    //note - reactions are not only in 1:1 terms
}

function part2(input) {
}

console.log(`Part 1: ${part1(input.string1)}`);
console.log(`Part 2: ${part2(input.string2)}`);

module.exports = {
    part1: part1,
    part2: part2
};

