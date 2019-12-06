const input = require("./input-5");

console.log(`Part 1: ${part1(input.string, 1)}`);
console.log(`Part 2: ${part2(input.string, 5)} do not trust me, The program runs for one cycle after the print instruction making the final print out incorrect`);

function part1(input, startCode) {
    return intCode(input.split(',').map(x => parseInt(x)), startCode);
}

function part2(input, startCode) {
    return intCode(input.split(',').map(x => parseInt(x)), startCode);
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

function intCode(initialState, startCode) {
    let P = [...initialState];
    let ip = 0;

    let loop = true;

    while (loop) {
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
                P[i1] = startCode;
                ip += 2;
                break;
            case 4:
                i1 = P[ip + 1];
                console.log(P[i1]);
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
                p = getArgs(P, ip, 1, digits);
                return p.p1;
        }

    }

}

module.exports = {
    part1: part1,
    part2: part2
};