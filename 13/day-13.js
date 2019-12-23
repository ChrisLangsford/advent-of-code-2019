const input = require("./input-13");
const intCode = require('../intCode/intCode');

const DIRECTIONS = {UP: 'UP', DOWN: 'DOWN', LEFT: 'LEFT', RIGHT: 'RIGHT'};
const DXDY = {
    "UP0": DIRECTIONS.LEFT, "UP1": DIRECTIONS.RIGHT, "DOWN0": DIRECTIONS.RIGHT, "DOWN1": DIRECTIONS.LEFT,
    "LEFT0": DIRECTIONS.DOWN, "LEFT1": DIRECTIONS.UP, "RIGHT0": DIRECTIONS.UP, "RIGHT1": DIRECTIONS.DOWN
};
const DX = {"RIGHT": 1, "LEFT": -1, "UP": 0, "DOWN": 0};
const DY = {"RIGHT": 0, "LEFT": 0, "UP": 1, "DOWN": -1};

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

}


console.log(`Part 1: ${part1(input.string)}`);
console.log(`Part 2: ${part2(input.string)}`);


module.exports = {
    part1: part1,
    part2: part2
};

