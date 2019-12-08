let assert = require('assert');
let day7 = require('./day-8.js');

describe('Day 8 Part 1', () => {
    let input1 = "123456789012";
    describe('parse input test', () => {
        it('should split the input into 2 equal layers of ', () => {
            assert.deepEqual(day7.parseInputIntoLayers(input1, 3, 2), [
                {id: 0, digits: [1, 2, 3, 4, 5, 6], zeroCount: 0},
                {id: 1, digits: [7, 8, 9, 0, 1, 2], zeroCount: 1},
            ]);
        });
    });
    describe('part 1 tests', () => {
        // it('should', () => {
        //     assert.equal(day7.part1(input1, 3, 2),
        //         {"id": 1, "digits": [7, 8, 9, 0, 1, 2], "zeroCount": 1}
        //     );
        // });
    });

});

describe('Day 7 Part 2', () => {
    describe('full test', () => {
        let input1 = "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5";
        it('should work for case 1', () => {
            assert.equal(day7.part2(input1), `Maximum thrust signal: 139629729, phase permutation: 98765`);
        });

    });
});