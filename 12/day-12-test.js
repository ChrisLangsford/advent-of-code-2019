let assert = require('assert');
let day12 = require('./day-12.js');

const input1 = {
    i: {pos: [-1, 0, 2], vel: [0, 0, 0]},
    e: {pos: [2, -10, -7], vel: [0, 0, 0]},
    g: {pos: [4, -8, 8], vel: [0, 0, 0]},
    c: {pos: [3, 5, -1], vel: [0, 0, 0]},
};

const input2 = {
    i: {pos: [2, 1, 3], vel: [3, 2, 1]},
    e: {pos: [1, 8, 0], vel: [1, 1, 3]},
    g: {pos: [3, 6, 1], vel: [3, 2, 3]},
    c: {pos: [2, 0, 4], vel: [1, 1, 1]},
};

describe('Day 12 Part 1', () => {
    describe('run tests', () => {
        it('should apply gravity and velocity changes correctly over the course of a single tick', () => {
            assert.deepEqual(day12.tick(input1), {
                "i": {"pos": [2, -1, 1], "vel": [3, -1, -1]},
                "e": {"pos": [3, -7, -4], "vel": [1, 3, 3]},
                "g": {"pos": [1, -7, 5], "vel": [-3, 1, -3]},
                "c": {"pos": [2, 2, 0], "vel": [-1, -3, 1]}
            });
        });
        it('should calculate the total energy of the system correctly', () => {
            assert.equal(day12.calcSystemEnergy(input2), 179)
        });
        it('check state after 10 steps', () => {
            assert.deepEqual(day12.runForNumberOfTicks(input1, 10), {
                "i": {"pos": [2, 1, -3], "vel": [-3, -2, 1]},
                "e": {"pos": [1, -8, 0], "vel": [-1, 1, 3]},
                "g": {"pos": [3, -6, 1], "vel": [3, 2, -3]},
                "c": {"pos": [2, 0, 4], "vel": [1, -1, -1]}
            })
        });
    });

});

describe('Day 12 Part 2', () => {
    describe('full test', () => {
    });
});