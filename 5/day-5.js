const input = require("./input-5");

console.log(`Part 1: ${part1(input.string)}`);
console.log(`Part 2: ${part2(input.string)}`);

function part1(input) {
    return intCode(input.split(',').map(x => parseInt(x)));
}

function part2(input) {
    return null;
}

function intCode(initialState) {
    let P = [...initialState];
    let ip = 0;

    let loop = true;

    while (loop) {
        let digits = P[ip].toString().split("").map(x => parseInt(x));

        let opCode = (digits.length === 1 ? 0 : digits[digits.length - 2]) * 10 + digits[digits.length - 1];

        digits.pop();
        digits.pop();

        switch (opCode) {
            case 1:
                while (digits.length < 3) {
                    digits = [0, ...digits];
                }
                i1 = P[ip + 1];
                i2 = P[ip + 2];
                i3 = P[ip + 3];

                P[i3] = (digits[2] === 1 ? i1 : P[i1]) + (digits[1] === 1 ? i2 : P[i2]);
                ip += 4;
                break;
            case 2:
                while (digits.length < 3) {
                    digits = [0, ...digits];
                }
                i1 = P[ip + 1];
                i2 = P[ip + 2];
                i3 = P[ip + 3];

                P[i3] = (digits[2] === 1 ? i1 : P[i1]) * (digits[1] === 1 ? i2 : P[i2]);
                ip += 4;
                break;
            case 3:
                i1 = P[ip + 1];
                P[i1] = 1;
                ip += 2;
                break;
            case 4:
                i1 = P[ip + 1];
                console.log(P[i1]);
                ip += 2;
                break;
            case 99:
                return P[i1];
        }

    }

}

module.exports = {
    part1: part1,
    part2: part2
};