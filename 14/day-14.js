const input = require('./input-14');

function part1(input) {
    const reactions = parseInput(input);
}

function parseInput(input){
    const quantityKey = Symbol();
    return input.trim().split('\n').reduce((map, line) => {
        const [ingredientList, result] = line.split(' => ');
        const [quantity, chemical] = result.split(' ');
        map[chemical] = ingredientList.split(', ').reduce((ingredientMap, combo) => {
            const [qty, chem] = combo.split(' ');
            ingredientMap[chem] = +qty;
            return ingredientMap;
        }, {[quantityKey]: +quantity});
        return map;
    }, {});
}

function part2(input) {
}

console.log(`Part 1: ${part1(input.string1)}`);
console.log(`Part 2: ${part2(input.string2)}`);

module.exports = {
    part1: part1,
    part2: part2
};

