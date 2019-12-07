const input = require("./input-7");

console.log(`Part 1: ${part1(input.string)}`);

console.log(`Part 2: ${part2(input.string)}`);

function part1(input) {
    let permutations = permute("01234");
    let ans = 0;
    let winner = "";

    permutations.forEach(p => {
        let out = run(input, p);
        if (out > ans) {
            ans = out;
            winner = p;
        }
    });
    return `Maximum thrust signal: ${ans}, phase permutation: ${winner}`;
}


function part2(input) {
    let permutations = permute("56789");
    let ans = 0;
    let winner = "";

    permutations.forEach(p => {
        let out = run2(input, p);
        if (out > ans) {
            ans = out;
            winner = '98765';
        }
    });
    return `Maximum thrust signal: ${ans}, phase permutation: ${winner}`;
}

function run2(input, perm) {
    let ans = 0;
    let names = ['A', 'B', 'C', 'D', 'E'].reverse();
    let amplifiers = perm.split("").map(x => {
        return {
            name: names.pop(),
            state: input,
            inputs: [Number(x), ans],
            done: false,
            ip: 0
        };
    });
    let i = 0;
    let loop = true;
    while (loop) {
        let amplifier = amplifiers[i];
        let out = intCode(amplifier.state, amplifier.inputs, amplifier.ip);
        if (out.output === undefined) {
            loop = false;
        } else {
            amplifier.state = out.state;
            amplifier.ip = out.ip;
            ans = out.output;
        }

        i++;
        if (i === amplifiers.length) {
            i = 0;
        }

        if (amplifiers[i].inputs.length > 1) {
            amplifiers[i].inputs[1] = ans;
        } else {
            amplifiers[i].inputs = [ans];
        }
    }
    // console.log(`FINAL ANS: ${ans}`);
    return ans;
}

function run(input, perm) {
    let ans = 0;
    let amplifiers = perm.split("").map(x => {
        return {
            state: input,
            inputs: [Number(x), 0],
            done: false,
            ip: 0
        };
    });
    for (let i = 0; i < amplifiers.length; i++) {
        let amplifier = amplifiers[i];
        amplifier.inputs[1] = ans;
        let out = intCode(amplifier.state, amplifier.inputs, amplifier.ip);
        amplifier.state = out.state;
        amplifier.ip = out.ip;
        amplifier.inputs = out.inputs;
        amplifier.done = out.done;
        ans = out.output;
    }
    console.log(`${ans}`);
    return ans;
}

function permute(s) {
    if (s.length < 2) return s;
    let perms = [];
    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        if (s.indexOf(char) !== i) {
            continue;
        }
        let remString = s.slice(0, i) + s.slice(i + 1, s.length);

        for (let sub of permute(remString)) {
            perms.push(char + sub);
        }
    }
    return perms;
}

function intCode(initialState, inputs, ip) {
    let P = [...parseInput(initialState)];
    let last;

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
                p = getArgs(P, ip, 3, digits);

                P[i3] = p.p1 + p.p2;

                ip += 4;
                break;
            case 2:
                p = getArgs(P, ip, 3, digits);

                P[i3] = p.p1 * p.p2;

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
                // console.log(P[i1]);
                last = P[i1];
                ip += 2;
                return {
                    output: last,
                    ip: ip,
                    state: P.join(","),
                    inputs: inputs
                };
            case 5:
                p = getArgs(P, ip, 2, digits);

                if (p.p1 !== 0) {
                    ip = p.p2;
                } else {
                    ip += 3;
                }
                break;
            case 6:
                p = getArgs(P, ip, 2, digits);

                if (p.p1 === 0) {
                    ip = p.p2;
                } else {
                    ip += 3;
                }
                break;
            case 7:
                p = getArgs(P, ip, 3, digits);

                P[i3] = p.p1 < p.p2 ? 1 : 0;

                ip += 4;
                break;
            case 8:
                p = getArgs(P, ip, 3, digits);

                P[i3] = p.p1 === p.p2 ? 1 : 0;

                ip += 4;
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

function getArgs(P, ip, n, digits) {
    while (digits.length < n) {
        digits = [0, ...digits];
    }
    let i1 = P[ip + 1];
    let i2 = P[ip + 2];

    let p1 = digits[n - 1] === 1 ? i1 : P[i1];
    let p2 = digits[n - 2] === 1 ? i2 : P[i2];

    return {p1: p1, p2: p2}

}

module.exports = {
    part1: part1,
    part2: part2,
    run: run,
    permute: permute
};