const input = require("./input-13");
const intCode = require('../intCode/intCode');

const TILES = {EMPTY: 0, WALL: 1, BLOCK: 2, H_PADDLE: 3, BALL: 4};


function part1(input) {
    let tiles = [];
    let done = false;
    let output = [];
    let ic = intCode(input, 0, [], 0);

    while (!done) {
        let out = ic.next();
        output.push(out.output);
        done = out.complete;
    }

    for (let i = 0; i < output.length; i++) {
        let triplet = output.splice(0, 3);
        tiles.push({x: triplet[0], y: triplet[1], type: triplet[2]});
    }

    return tiles.filter(t => {
        return t.type === TILES.BLOCK
    }).length;
}

function part2(input) {
    let score = 0;
    let done = false;
    let ic = intCode(input, 0, [0], 0);
    let paddleX;
    let ballX;

    while (!done) {
        let first = ic.next();
        done = first.complete;
        let second = ic.next();
        done = second.complete;
        let third = ic.next();
        done = third.complete;

        if (first.output === -1 && second.output === 0) {
            score = third.output;
            console.log(`Score: ${third.output}`);
        }

        if (third.output === TILES.H_PADDLE) {
            paddleX = first.output;
        }
        if (third.output === TILES.BALL) {
            ballX = first.output;
        }
        if (ballX && paddleX) {
            ic.input = [Math.sign(ballX - paddleX)];
        }
    }
    console.log(`Score: ${score}`);
    return score;
}


console.log(`Part 1: ${part1(input.string1)}`);
console.log(`Part 2: ${part2(input.string2)}`);


module.exports = {
    part1: part1,
    part2: part2
};

