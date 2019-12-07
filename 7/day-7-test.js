let assert = require('assert');
let day7 = require('./day-7.js');

describe('Day 7 Part 1', () => {
    let input1 = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0";
    let input2 = "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0";
    let input3 = "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0";
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
    describe('run code fail test', () => {
        it('should not get the correct result for an incorrect permutation 1', () => {
            assert.notEqual(day7.run(input1, "34210"), 43210);
        });
        it('should not get the correct result for an incorrect permutation 2', () => {
            assert.notEqual(day7.run(input2, "12304"), 54321);
        });
        it('should not get the correct result for an incorrect permutation 3', () => {
            assert.notEqual(day7.run(input3, "14032"), 65210);
        });
    });
    describe('permutations test', () => {
        it('should get 1 permutation of 1', () => {
            assert.equal(day7.permute("1").length, 1);
        });
        it('should get 2 permutations of 12', () => {
            assert.equal(day7.permute("12").length, 2);
        });
        it('should get 120 permutations of 01234', () => {
            assert.equal(day7.permute("01234").length, 120);
        });
        it('should get 120 permutations of 56789', () => {
            assert.equal(day7.permute("56789").length, 120);
        });
    });
    describe('full test', () => {
        it('should work for case 1', () => {
            assert.equal(day7.part1(input1), `Maximum thrust signal: 43210, phase permutation: 43210`);
        });
        it('should work for case 2', () => {
            assert.equal(day7.part1(input2), `Maximum thrust signal: 54321, phase permutation: 01234`);
        });
        it('should work for case 3', () => {
            assert.equal(day7.part1(input3), `Maximum thrust signal: 65210, phase permutation: 10432`);
        });
    });
});

describe('Day 7 Part 2', () => {
    describe('full test', () => {

        let input1 = "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5";
        let input2 = "3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10";
        it('should work for case 1', () => {
            assert.equal(day7.part2(input1), `Maximum thrust signal: 139629729, phase permutation: 98765`);
        });
        // it('should work for case 2', () => {
        //     assert.equal(day7.part2(input2), `Maximum thrust signal: 18216, phase permutation: 97856`);
        // });
    });
});