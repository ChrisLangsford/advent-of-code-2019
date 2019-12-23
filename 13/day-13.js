const input = require("./input-13");
const intCode = require('../intCode/intCode');

const TILES = {EMPTY: 0, WALL: 1, BLOCK: 2, H_PADDLE: 3, BALL: 4};


function part1(input) {
    let done = false;
    let tiles = [];
    let output = intCode(input, 0, [], 0, false);
    for (let i = 0; i < output.output.length; i++) {
        let triplet = output.output.splice(0, 3);
        tiles.push({x: triplet[0], y: triplet[1], type: triplet[2]});
    }

    return tiles.filter(t => {
        return t.type === TILES.BLOCK
    }).length;
}

function part2(input) {
// 1. run 3 iterations of intcode (x,y,z)
// 2. if (-1,0,x) -> add x to score
// 3. get paddle tile position and ball position
// 4. calculate difference and set input for next 3 iteration
// TODO: Refactor intcode to export as an object with a next method which un-pauses (sets run to true) the computer
//       that way the computer itself will handle keeping its own memory between executions
}


console.log(`Part 1: ${part1(input.string1)}`);
console.log(`Part 2: ${part2(input.string2)}`);


module.exports = {
    part1: part1,
    part2: part2
};

