const input = require("./input-11");
const intCode = require('../intCode/intCode');

console.log(`Part 1: ${part1(input.string)}`);
console.log(`Part 2: ${part2(input.string)}`);

const DIRECTIONS = {UP: 'UP', DOWN: 'DOWN', left: 'LEFT', RIGHT: 'RIGHT'};
const COLOURS = {BLACK: 0, WHITE: 1};

function part1(input) {
    const robot = {
        memory: input,
        ip: 0,
        relativeBase: 0,
        position: [0, 0],
        facing: DIRECTIONS.UP,
        panelsPainted: new Set(),
        process: function () {
            let out = intCode(this.memory, this.ip, getLocationColour(this.position), this.relativeBase);
            this.memory = out.memory;
            this.ip = out.instructionPointer;
            this.relativeBase = out.relativeBase;
            this.paint(out.output[0]);
            this.turnAndMove(out.output[1]);
        },
        paint: function (colour) {
            //get colour from COLOURS using integer provided
            //pain the current position
            //add position to panelsPainted
        },
        turnAndMove: function (){
            //change facing attribute
            //use facing attribute to move the robot forward 1 space
        }
    };
}

function part2(input) {
}


function getLocationColour(pos) {
    return 0;
}

module.exports = {
    part1: part1,
    part2: part2
};

