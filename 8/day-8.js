const input = require("./input-8");
// const input = {string: "123456789012"};
// const input = {string: "0222112222120000"};

console.log(`Part 1: ${part1(input.string)}`);
console.log(`Part 2: ${part2(input.string)}`);

function part1(input) {
    let layers = parseInputIntoLayers(input, 25, 6);
    layers = layers.sort(compareZeroCount);
    let count1 = countDigits(layers[0].digits, 1);
    let count2 = countDigits(layers[0].digits, 2);
    return count1 * count2;
}


function part2(input) {
    let layers = parseInputIntoLayers(input, 25, 6);
    let image = {};
    for (let i = 0; i < layers[0].digits.length; i++) {
        image[i] = 2;
    }
    for (let i = 0; i < layers.length; i++) {
        for (let j = 0; j < layers[i].digits.length; j++) {
            if (image[j] === 2) {
                image[j] = layers[i].digits[j];
            }
        }
    }

    return `${print(image, 25, 6)}`;
}

function print(i, w, h) {
    let ans = Object.values(i).map(x => {
        return x === 1 ? x.toString() : ".";
    });
    return ans.join("");
    // let res = "";
    // for (let j = 0; j < h; j++) {
    //     res += (ans.slice(j, j * w)).join("");
    // }
    // return res;
}

function countDigits(arr, digit) {
    return arr.filter(x => {
        return x === digit;
    }).length;
}

function compareZeroCount(a, b) {
    if (a.zeroCount < b.zeroCount) {
        return -1;
    }
    if (a.zeroCount > b.zeroCount) {
        return 1;
    }
    if (a.zeroCount === b.zeroCount) {
        return 0;
    }
}

function parseInputIntoLayers(i, w, h) {
    let digits = i.split("").map(x => Number(x));
    let count = digits.length / (w * h);
    let layers = [];
    for (let j = 0; j < count; j++) {
        layers.push({
            id: j,
            digits: digits.slice(0, (w * h)),
            zeroCount: countDigits(digits.slice(0, (w * h)), 0)
        });
        digits = digits.slice(w * h);
    }
    return layers;
}

module.exports = {
    part1: part1,
    part2: part2,
    parseInputIntoLayers: parseInputIntoLayers
};

