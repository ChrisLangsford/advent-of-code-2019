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
    return numberOfSteps;
}

function runForNumberOfTicks(input, numberOfTicks) {
    for (let i = 0; i < numberOfTicks; i++) {
        input = tick(input);
    }
    return input;
}

function runUntilRepeatFound(input) {
    // let loop = true;
    // let inputs = [];
    // let count = 0;
    // inputs.push(JSON.stringify(input));
    // while (loop) {
    //     input = tick(input);
    //     count++;
    //     if (inputs[0] === input) {
    //         loop = false;
    //     }
    //     console.log(`Steps: ${count}`);
    // }
    //
    // return inputs.length;
    const initialState = JSON.parse(JSON.stringify(input));
    let xSteps = 0;
    let ySteps = 0;
    let zSteps = 0;
    let xFound = false;
    let yFound = false;
    let zFound = false;

    while (!xFound || !yFound || !zFound) {
        input = tick(input);
        if (!xFound && comparePositionAndVelocity(input, initialState, 0)) {
            xSteps++;
            xFound = true;
        } else if (!xFound) {
            xSteps++;
        }
        if (!yFound && comparePositionAndVelocity(input, initialState, 1)) {
            ySteps++;
            yFound = true;
        } else if (!yFound) {
            ySteps++;
        }
        if (!zFound && comparePositionAndVelocity(input, initialState, 2)) {
            zSteps++;
            zFound = true;
        } else if (!zFound) {
            zSteps++;
        }
    }
    console.log(`xSteps: ${xSteps}. ySteps: ${ySteps}. zSteps: ${zSteps}. `);
    return LCM([xSteps, ySteps, zSteps]);

}

/**
 * @return {number}
 */
function LCM(numbers) {
    console.log(numbers);
    if (numbers.length < 2) return;
    first = numbers[0];
    second = numbers[1];
    var i = j = 1;
    var mult1 = first * i++;
    var mult2 = second * j++;
    while (mult1 !== mult2) {
        if (mult1 < mult2)
            mult1 = first * i++;
        else
            mult2 = second * j++
    }
    if (numbers.length > 2) {
        numbers[1] = mult1; //I hope you're fine with the fact that 'numbers' gets modified
        mult1 = LCM(numbers.splice(1, numbers.length - 1))
    }
    return mult1;
}

function comparePositionAndVelocity(input, initial, plane) {
    return (input.i.pos[plane] === initial.i.pos[plane] && input.i.vel[plane] === initial.i.vel[plane] &&
        input.e.pos[plane] === initial.e.pos[plane] && input.e.vel[plane] === initial.e.vel[plane] &&
        input.g.pos[plane] === initial.g.pos[plane] && input.g.vel[plane] === initial.g.vel[plane] &&
        input.c.pos[plane] === initial.c.pos[plane] && input.c.vel[plane] === initial.c.vel[plane]);
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

