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
        let out = run(input, p);
        if (out > ans) {
            ans = out;
            winner = p;
        }
    });
    return `Maximum thrust signal: ${ans}, phase permutation: ${winner}`;
}

function run(input, perm) {
    let ans = 0;
    let amplifiers = perm.split("").map(x => Number(x));
    for (let i = 0; i < amplifiers.length; i++) {
        ans = intCode(input, [amplifiers[i], ans]);
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

function intCode(initialState, inputs) {
    let P = [...parseInput(initialState)];
    let ip = 0;
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
                console.log(P[i1]);
                last = P[i1];
                ip += 2;
                break;
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
                return last;
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