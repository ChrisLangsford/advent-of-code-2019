const input = require("./input-12");

console.log(`Part 1: ${part1(input)}`);
console.log(`Part 2: ${part2(input)}`);

function part1(input) {
}


function part2(input) {
}

function tick(input) {
    Object.entries(input).forEach(moon => {
        Object.entries(input).forEach(otherMoon => {
            if (moon[0] !== otherMoon[0]) {
                //apply gravity
                for (let i = 0; i < 3; i++) {
                    if (moon[1].pos[i] > otherMoon[1].pos[i]) {
                        moon[1].vel[i] = moon[1].vel[i] - 1;
                    } else if (moon[1].pos[i] < otherMoon[1].pos[i]) {
                        moon[1].vel[i] = moon[1].vel[i] + 1;
                    } else {
                        moon[1].vel[i] = moon[1].vel[i];
                    }
                }
            }
        });
    });
    //apply position shifts
    console.log(`Gravity applied: ${JSON.stringify(input)}`);
    Object.entries(input).forEach(moon => {
        for (let i = 0; i < 3; i++) {
            moon[1].pos[i] = moon[1].pos[i] + moon[1].vel[i];
        }
    });
    console.log(`Velocity applied: ${JSON.stringify(input)}`);
    return input;
}


module.exports = {
    part1: part1,
    part2: part2,
    tick, tick
};

