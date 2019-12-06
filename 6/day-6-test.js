let assert = require('assert');
let day6 = require('./day-6-old.js');

describe('Day 6 Part 1', () => {
    describe('test 1', () => {
        it('should', () => {
            assert.equal(day6.part1("COM)B\n" +
                "B)C\n" +
                "C)D\n" +
                "D)E\n" +
                "E)F\n" +
                "B)G\n" +
                "G)H\n" +
                "D)I\n" +
                "E)J\n" +
                "J)K\n" +
                "K)L"), 42
            );
        });
    });
});

describe('Day 6 Part 2', () => {
    describe('test 1', () => {
        it('should', () => {
            assert.equal(day6.part2(""), null);
        });
    });
});