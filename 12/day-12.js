const input = require("./input-12");

console.log(`Part 1: ${part1(input, 1000)}`);
console.log(`Part 2: ${part2(input)}`);

function part1(input, numberOfSteps) {
    runForNumberOfTicks(input, numberOfSteps);
    console.log(`after ${numberOfSteps} steps: ${JSON.stringify(input)}`);
    console.log(`{total energy: ${calcSystemEnergy(input)}`);
    return calcSystemEnergy(input);
}


function part2(input) {
    let numberOfSteps = runUntilRepeatFound(input);
    console.log(`after ${numberOfSteps} steps`);
    return input;
}

function runForNumberOfTicks(input, numberOfTicks) {
    for (let i = 0; i < numberOfTicks; i++) {
        input = tick(input);
    }
    return input;
}

function runUntilRepeatFound(input) {
    let loop = true;
    let inputs = [];
    inputs.push(JSON.stringify(input));
    while (loop) {
        input = tick(input);
        if (inputs.includes(JSON.stringify(input))) {
            loop = false;
        } else {
            inputs.push(JSON.stringify(input));
        }
        console.log(`Steps: ${inputs.length}`);
    }

    return inputs.length;
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
    // console.log(`Gravity applied: ${JSON.stringify(input)}`);
    Object.entries(input).forEach(moon => {
        for (let i = 0; i < 3; i++) {
            moon[1].pos[i] = moon[1].pos[i] + moon[1].vel[i];
        }
    });
    // console.log(`Velocity applied: ${JSON.stringify(input)}`);
    return input;
}

function calcSystemEnergy(input) {
    let totalEnergy = 0;
    Object.entries(input).forEach(moon => {
        let potentialEnergy = Math.abs(moon[1].pos[0]) + Math.abs(moon[1].pos[1]) + Math.abs(moon[1].pos[2]);
        let kineticEnergy = Math.abs(moon[1].vel[0]) + Math.abs(moon[1].vel[1]) + Math.abs(moon[1].vel[2]);
        totalEnergy = totalEnergy + (potentialEnergy * kineticEnergy);
    });
    return totalEnergy;
}


module.exports = {
    part1: part1,
    part2: part2,
    tick, tick,
    calcSystemEnergy: calcSystemEnergy,
    runForNumberOfTicks: runForNumberOfTicks
};

