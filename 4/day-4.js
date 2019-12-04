const input = require("./input-4");

console.log(`Valid Passwords: ${part1(input.string)}`);
console.log(`${part2()}`);

function part1(input) {
    let start = parseInt(input.split("-")[0]);
    let end = parseInt(input.split("-")[1]);
    let count = 0;
    for (let i = start; i < end+1; i++) {
        if (isValid(i)) {
            count++;
        }
    }
    return count;
}

function part2(input) {
    return 0;
}

function isValid(s) {
    return containsDouble(s.toString()) && charsInAscendingOrder(s.toString());
}

function containsDouble(s) {
    let match = s.match(new RegExp(/(.)\1{1,}/g));
    return  match !== [] && match !== null;
}

function charsInAscendingOrder(s1) {
    let valid = true;
    let c = s1.split("");

    for (let i = 0; i < c.length-1 && valid; i++) {
        valid = c[i] <= c[i+1];
    }
    return valid;
}


module.exports = {part1:part1, isValid: isValid, containsDouble:containsDouble, charsInAscendingOrder:charsInAscendingOrder};