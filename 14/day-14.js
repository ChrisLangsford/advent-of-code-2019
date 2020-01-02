const input = require('./input-14');

// Day 14 has been fun - I've found a JS example in a very different style to what I normally write and
// have worked through it line by line and learned some useful tricks

function part1(input, fuel) {
    let neededChemicals = {FUEL: fuel};
    const quantityKey = Symbol();
    const reactions = input.trim().split('\n').reduce((map, line) => {
        const [ingredientList, result] = line.split(' => ');
        const [quantity, chemical] = result.split(' ');
        map[chemical] = ingredientList.split(', ').reduce((ingredientMap, combo) => {
            const [qty, chem] = combo.split(' ');
            ingredientMap[chem] = +qty;
            return ingredientMap;
        }, {[quantityKey]: +quantity});
        return map;
    }, {});

    let stores = {};
    while (Object.keys(neededChemicals).length !== 1 || !('ORE' in neededChemicals)) {
        let newChemList = {};
        for (const [chemical, qty] of Object.entries(neededChemicals)) {

            //If the chemical we need is ore, make sure the quantity required is added to the neededList
            if (chemical === 'ORE') {
                newChemList.ORE = (newChemList.ORE || 0) + qty;
                continue;
            }
            //what reaction produces the needed chemical?
            //what qty of the needed chemical is produced?
            //how many times will we need to run this reaction?
            const reaction = reactions[chemical];
            const reactionQty = reaction[quantityKey];
            const reactionCount = Math.ceil((qty - (stores[chemical] || 0)) / reactionQty);

            //what are the ingredients and their required quantities for this reaction?
            for (const [ingredient, amount] of Object.entries(reaction)) {
                //add them to the needed list which will be looped over in the next iteration until we only require a certain quantity of ORE
                newChemList[ingredient] = (newChemList[ingredient] || 0) + reactionCount * amount;
            }
            //store the chemical amount not required by the current downstream reaction
            stores[chemical] = (stores[chemical] || 0) + reactionCount * reactionQty - qty;
        }
        neededChemicals = newChemList;
    }
    return neededChemicals.ORE;
}

function part2(input) {
    const CARGO_ORE = 1e12;
    let estimate;
    let newEstimate = Math.floor(CARGO_ORE / part1(input, 1));
    do {
        estimate = newEstimate;
        const estimateAmtNeeded = part1(input, estimate);
        newEstimate = Math.floor(estimate * CARGO_ORE / estimateAmtNeeded);
    } while (newEstimate > estimate);
    return estimate;
}

console.log(`Part 1: ${part1(input.string,1)}`);
console.log(`Part 2: ${part2(input.string)}`);

module.exports = {
    part1: part1,
    part2: part2
};

