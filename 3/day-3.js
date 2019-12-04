const input = require('./input-3.js');

const DX = {"R": 1, "L": -1, "U": 0, "D": 0};
const DY = {"R": 0, "L": 0, "U": 1, "D": -1};

console.log(`part 1: ${part1(input.string)}`);
console.log(`part 2: ${part2(input.string)}`);

function part1(input) {
    if (input) {
        let intersection = findIntersection(input);
        let distances = [];
        Object.keys(intersection).forEach(point => {
            let p = intersection[point];
            distances.push(parseInt(Math.abs(p.x) + Math.abs(p.y)));
        });
        return Math.min(...distances);
    }

    return null;
}

function part2(input) {
    if (input) {
        let intersection = findIntersection(input);
        let distances = [];

        Object.keys(intersection).forEach(point => {
            distances.push(intersection[point].length);
        });

        return Math.min(...distances);
    }
    return null;
}

function findIntersection(input) {
    let A = input.split("\n")[0];
    let B = input.split("\n")[1];
    let PA = getPoints(A);
    let PB = getPoints(B);
    let intersection = {};
    Object.keys(PA).forEach(point => {
        if (PB[point] !== undefined) {
            intersection[point] = {
                x: point.split(',')[0],
                y: point.split(',')[1],
                length: PA[point].length + PB[point].length
            };
        }
    });
    return intersection;
}

function getPoints(wire) {
    let x = 0;
    let y = 0;
    let points = {};
    let length = 0;
    wire.split(',').forEach(cmd => {
        let direction = cmd.slice(0, 1);
        let range = cmd.slice(1, cmd.length);

        for (let i = 0; i < range; i++) {
            x += DX[direction];
            y += DY[direction];
            length++;
            points[`${x},${y}`] = {x: x, y: y, length: length}
        }
    });
    return points;
}

module.exports = {part1: part1, part2: part2};