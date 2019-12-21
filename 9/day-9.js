const input = require("./input-9");
const intCode = require("../intCode/intCode");

console.log(`Part 1: ${part1(input.string)}`);
console.log(`Part 2: ${part2(input.string)}`);

function part1(input) {
    return intCode(input, 0,[1], 0).output;
}


function part2(input) {
    return intCode(input, 0, [2], 0).output;
}

module.exports = {
    part1: part1,
    part2: part2
};

