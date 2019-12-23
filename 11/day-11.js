const input = require("./input-11");
const intCode = require('../intCode/intCode');

const DIRECTIONS = {UP: 'UP', DOWN: 'DOWN', LEFT: 'LEFT', RIGHT: 'RIGHT'};
const DXDY = {
    "UP0": DIRECTIONS.LEFT, "UP1": DIRECTIONS.RIGHT, "DOWN0": DIRECTIONS.RIGHT, "DOWN1": DIRECTIONS.LEFT,
    "LEFT0": DIRECTIONS.DOWN, "LEFT1": DIRECTIONS.UP, "RIGHT0": DIRECTIONS.UP, "RIGHT1": DIRECTIONS.DOWN
};
const DX = {"RIGHT": 1, "LEFT": -1, "UP": 0, "DOWN": 0};
const DY = {"RIGHT": 0, "LEFT": 0, "UP": 1, "DOWN": -1};

function Robot(input, hull) {
    return {
        done: false,
        memoryString: input,
        ip: 0,
        relativeBase: 0,
        positionString: "0,0",
        facing: DIRECTIONS.UP,
        process: function () {
            let colourOutput = intCode(this.memoryString, this.ip, [hull.getLocationColour(this.positionString)], this.relativeBase, true);
            this.done = colourOutput.complete;
            if (!this.done) {
                let turnOutput = intCode(colourOutput.memory, colourOutput.instructionPointer, [hull.getLocationColour(this.positionString)], colourOutput.relativeBase, true);
                this.done = turnOutput.complete;
                this.memoryString = turnOutput.memory;
                this.ip = turnOutput.instructionPointer;
                this.relativeBase = turnOutput.relativeBase;
                this.paint(colourOutput.output);
                this.turn(turnOutput.output);
                this.move();
            }
        },
        paint: function (colour) {
            hull.panels[this.positionString] = parseInt(colour);
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
            if (hull.panels[this.positionString] === undefined) {
                hull.panels[this.positionString] = 0;
            }
        }
    };
}

function part1(input) {
    let hull = {
        panels: {"0,0": 0},
        getLocationColour: function (positionString) {
            let x = positionString.split(',')[0];
            let y = positionString.split(',')[1];
            return this.panels[`${x},${y}`]
        }
    };

    const robot = Robot(input, hull);
    while (!robot.done) {
        robot.process();
    }

    return Object.keys(hull.panels).length;
}

function part2(input) {
    let hull = {
        panels: {"0,0": 1},
        getLocationColour: function (positionString) {
            let x = positionString.split(',')[0];
            let y = positionString.split(',')[1];
            return this.panels[`${x},${y}`]
        }
    };

    const robot = Robot(input, hull);
    while (!robot.done) {
        robot.process();
    }

    return JSON.stringify(hull.panels);
}

console.log(`Part 1: ${part1(input.string)}`);
console.log(`Part 2: ${part2(input.string)}`);

module.exports = {
    part1: part1,
    part2: part2
};

