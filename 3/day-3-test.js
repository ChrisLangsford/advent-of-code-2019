let assert = require('assert');
let day3 = require('./day-3.js');

describe('Day 3 Part 1', () => {
    describe('test 1', () => {
        it('should return 159', () => {
            assert.equal(day3.part1("R75,D30,R83,U83,L12,D49,R71,U7,L72\n" +
                "U62,R66,U55,R34,D71,R55,D58,R83"), 159);
        });
    });
    describe('test 2', () => {
        it('should return 135', () => {
            assert.equal(day3.part1("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\n" +
                "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7"), 135);
        });
    });
});

describe('Day 3 Part 2', () => {
    describe('test 1', () => {
        it('should return 610', () => {
            assert.equal(day3.part2("R75,D30,R83,U83,L12,D49,R71,U7,L72\n" +
                "U62,R66,U55,R34,D71,R55,D58,R83"), 610);
        });
    });
    describe('test 2', () => {
        it('should return 410', () => {
            assert.equal(day3.part2("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\n" +
                "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7"), 410);
        });
    });
});