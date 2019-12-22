const input = require("./input-11");
const intCode = require('../intCode/intCode');

const DIRECTIONS = {UP: 'UP', DOWN: 'DOWN', LEFT: 'LEFT', RIGHT: 'RIGHT'};
const DXDY = {
    "UP0": DIRECTIONS.LEFT, "UP1": DIRECTIONS.RIGHT, "DOWN0": DIRECTIONS.RIGHT, "DOWN1": DIRECTIONS.LEFT,
    "LEFT0": DIRECTIONS.DOWN, "LEFT1": DIRECTIONS.UP, "RIGHT0": DIRECTIONS.UP, "RIGHT1": DIRECTIONS.DOWN
};
const DX = {"RIGHT": 1, "LEFT": -1, "UP": 0, "DOWN": 0};
const DY = {"RIGHT": 0, "LEFT": 0, "UP": 1, "DOWN": -1};

const COLOURS = {BLACK: 0, WHITE: 1};

console.log(`Part 1: ${part1(input.string)}`);
console.log(`Part 2: ${part2(input.string)}`);

function part1(input) {
    let hull = {
        panels: {"0,0": 0},
        getLocationColour: function (positionString) {
            let x = positionString.split(',')[0];
            let y = positionString.split(',')[1];
            return this.panels[`${x},${y}`]
        }
    };

    const robot = {
        done: false,
        memory: input,
        ip: 0,
        relativeBase: 0,
        positionString: "0,0",
        facing: DIRECTIONS.UP,
        panelsPainted: new Set(),
        process: function () {
            let out = intCode(this.memory, this.ip, [hull.getLocationColour(this.positionString)], this.relativeBase);
            //TODO: intcode needs some work here. it runs until it reaches the 99 and does not halt and wait for the next input
            this.memory = out.memory;
            this.ip = out.instructionPointer;
            this.relativeBase = out.relativeBase;
            this.paint(out.output.split(',')[0]);
            this.turn(out.output.split(',')[1]);
            this.move();
        },
        paint: function (colour) {
            hull.panels[this.positionString] = colour;
        },
        turn: function (turnInstruction) {
            this.facing = DXDY[`${this.facing}${turnInstruction}`];

        },
        move: function () {
            let x = parseInt(this.positionString.split(',')[0]);
            let y = parseInt(this.positionString.split(',')[1]);
            x += DX[this.facing];
            y += DY[this.facing];
            this.positionString = `${x},${y}`;
        }
    };

    while (!robot.done) {
        robot.process();
        robot.done = true;
    }

    return Object.keys(hull.panels).length;
}

function part2(input) {
}

module.exports = {
    part1: part1,
    part2: part2
};

