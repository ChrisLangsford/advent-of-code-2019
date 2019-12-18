const input = require("./input-9");

console.log(`Part 1: ${part1(input.string)}`);
console.log(`Part 2: ${part2(input.string)}`);

function part1(input) {
    return intCode(input, [1], 0).output;
}


function part2(input) {
}

function intCode(initialState, inputs, ip) {
    let P = [...parseInput(initialState)];
    let last;
    let relativeBase = 0;

    while (true) {
        let digits = P[ip].toString().split("").map(x => parseInt(x));

        let opCode = (digits.length === 1 ? 0 : digits[digits.length - 2]) * 10 + digits[digits.length - 1];

        digits.pop();
        digits.pop();

        let p = null;
        let i1;
        let i3 = P[ip + 3];

        switch (opCode) {
            case 1:
                p = getArgs(P, ip, 3, digits, relativeBase);

                P[p.p3] = p.p1 + p.p2;

                ip += 4;
                break;
            case 2:
                p = getArgs(P, ip, 3, digits, relativeBase);

                P[p.p3] = p.p1 * p.p2;

                ip += 4;
                break;
            case 3:
                i1 = P[ip + 1];
                P[i1] = inputs[0];
                inputs[0] = inputs.pop();
                ip += 2;
                break;
            case 4:
                i1 = P[ip + 1];
                last = P[i1];
                ip += 2;
                return {
                    output: last,
                    ip: ip,
                    state: P.join(","),
                    inputs: inputs
                };
            case 5:
                p = getArgs(P, ip, 2, digits, relativeBase);

                if (p.p1 !== 0) {
                    ip = p.p2;
                } else {
                    ip += 3;
                }
                break;
            case 6:
                p = getArgs(P, ip, 2, digits, relativeBase);

                if (p.p1 === 0) {
                    ip = p.p2;
                } else {
                    ip += 3;
                }
                break;
            case 7:
                p = getArgs(P, ip, 3, digits, relativeBase);

                P[p.p3] = p.p1 < p.p2 ? 1 : 0;

                ip += 4;
                break;
            case 8:
                p = getArgs(P, ip, 3, digits, relativeBase);

                P[p.p3] = p.p1 === p.p2 ? 1 : 0;

                ip += 4;
                break;
            case 9 :
                p = getArgs(P, ip, 1, digits, relativeBase);
                relativeBase += p.p1;
                ip += 2;
                break;
            case 99:
                return {
                    output: last
                };
        }

    }

}

function parseInput(input) {
    return input.split(',').map(x => parseInt(x));
}

function getArgs(P, ip, n, digits, base) {
    while (digits.length < n) {
        digits = [0, ...digits];
    }
    let i1 = P[ip + 1];
    let i2 = P[ip + 2];
    let i3 = P[ip + 3];

    let p1;
    let p2;
    let p3;

    //fixme - these are getting negative indices when we supply a length < 3
    if (digits[n - 1] === 1) {
        p1 = i1;
    } else if (digits[n - 1] === 0) {
        p1 = P[i1];
    } else if (digits[n - 1] === 2) {
        p1 = P[i1 + base];
    }

    if (digits[n - 2] === 1) {
        p2 = i2;
    } else if (digits[n - 2] === 0) {
        p2 = P[i2];
    } else if (digits[n - 2] === 2) {
        p2 = P[i2 + base];
    }

    if (digits[n - 3] === 0) {
        p3 = i3;
    } else if (digits[n - 3] === 2) {
        p3 = i3 + base;
    }


    return {p1: p1, p2: p2, p3: p3};

}

module.exports = {
    part1: part1,
    part2: part2,
    intCode: intCode
};

