const input = require("./input-4");

console.log(`Valid Passwords: ${part1(input.string)}`);
console.log(`Valid Passwords: ${part2(input.string)}`);

function part1(input) {
    let start = parseInt(input.split("-")[0]);
    let end = parseInt(input.split("-")[1]);
    let count = 0;
    for (let i = start; i < end + 1; i++) {
        if (isValid1(i.toString())) {
            count++;
        }
    }
    return count;
}

function part2(input) {
    let start = parseInt(input.split("-")[0]);
    let end = parseInt(input.split("-")[1]);
    let count = 0;
    for (let i = start; i < end + 1; i++) {
        if (isValid2(i.toString())) {
            count++;
        }
    }
    return count;
}

function isValid1(s) {
    return containsDouble(s) && charsInAscendingOrder(s);
}

function isValid2(s) {
    return containsDouble(s) && charsInAscendingOrder(s) && doubleNotPartOfLargerGroup(s);
}

function containsDouble(s) {
    let match = s.match(new RegExp(/(.)\1{1,}/g));
    return match !== [] && match !== null;
}

function charsInAscendingOrder(s) {
    let valid = true;
    let c = s.split("");

    for (let i = 0; i < c.length - 1 && valid; i++) {
        valid = c[i] <= c[i + 1];
    }
    return valid;
}

function doubleNotPartOfLargerGroup(s) {
    return true;
}


module.exports = {
    part1: part1,
    isValid1: isValid1,
    isValid2: isValid2,
    containsDouble: containsDouble,
    charsInAscendingOrder: charsInAscendingOrder
};