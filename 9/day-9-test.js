let assert = require('assert');
let intCode = require('../intCode/intCode');

describe('Day 9 Part 1', () => {
    describe('run tests', () => {
        it('should return a copy of the program provided zero inputs', () => {
            let input1 = "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99";
            assert.equal(intCode(input1, 0, [], 0).output, input1);
        });
        it('should return a 16 digit number', () => {
            let input1 = "1102,34915192,34915192,7,4,7,99,0";
            assert.equal(intCode(input1, 0, [], 0).output.toString().length, 16);
        });
        it('should return 104,1125899906842624,99', () => {
            let input1 = "104,1125899906842624,99";
            assert.equal(intCode(input1, 0, [], 0).output, 1125899906842624);
        });
    });

});

describe('Day 7 Part 2', () => {
    describe('full test', () => {
    });
});