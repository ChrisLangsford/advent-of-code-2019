const input = require("./input-7");

console.log(`Part 1: ${part1(input.string)}`);
console.log(`Part 2: ${part2(input.string)}`);

function part1(input) {
}


function part2(input) {
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