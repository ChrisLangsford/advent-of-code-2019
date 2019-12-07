let assert = require('assert');
let day7 = require('./day-8.js');

describe('Day 8 Part 1', () => {
    let input1 = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0";
    describe('run code pass test', () => {
        it('should get the correct results for the given permutation 1', () => {
            assert.equal(day7.run(input1, "43210"), 43210);
        });
        it('should get the correct results for the given permutation 2', () => {
            assert.equal(day7.run(input2, "01234"), 54321);
        });
        it('should get the correct results for the given permutation 3', () => {
            assert.equal(day7.run(input3, "10432"), 65210);
        });
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