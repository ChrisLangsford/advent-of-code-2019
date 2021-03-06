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
        positionString: "0,0",
        facing: DIRECTIONS.UP,
        brain: intCode(input, 0, [hull.getLocationColour(this.positionString)], 0),
        process: function () {
            this.brain.input = [hull.getLocationColour(this.positionString)];
            let colourOutput = this.brain.next();
            this.done = colourOutput.complete;
            if (!this.done) {
                let turnOutput = this.brain.next();
                this.done = turnOutput.complete;
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
            let x = '';
            let y = '';
            if (positionString) {
                x = positionString.split(',')[0];
                y = positionString.split(',')[1];
            }
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
            let x = '';
            let y = '';
            if (positionString) {
                x = positionString.split(',')[0];
                y = positionString.split(',')[1];
            }
            return this.panels[`${x},${y}`]
        }
    };

    const robot = Robot(input, hull);
    while (!robot.done) {
        robot.process();
    }
    return printPanels(hull);
}

function printPanels(hull) {
    let panels = Object.entries(hull.panels).map((x) => {
        return [...x[0].split(',').map(y => parseInt(y)), x[1]]
    });

    let xmin = panels.map(x => x[0]).sort((a, b) => {
        return a - b
    })[0];
    let xmax = panels.map(x => x[0]).sort((a, b) => {
        return a - b
    })[panels.length - 1];
    let ymin = panels.map(y => y[1]).sort((a, b) => {
        return a - b
    })[0];
    let ymax = panels.map(y => y[1]).sort((a, b) => {
        return a - b
    })[panels.length - 1];

    let out = "\n";
    for (let i = ymin; i < ymax + 1; i++) {
        for (let j = xmin; j < xmax + 1; j++) {
            out += hull.panels[`${j},${i}`] === 0 ? '.' : '#';
        }
        out += '\n';
    }

    return out.split("").reverse().join("");
}

console.log(`Part 1: ${part1(input.string)}`);
console.log(`Part 2: Note, Read using a mirror \n${part2(input.string)}`);


module.exports = {
    part1: part1,
    part2: part2
};

