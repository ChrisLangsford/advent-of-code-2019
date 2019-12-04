let assert = require('assert');
let day4 = require('./day-4.js');

describe('Day 4 Part 1', () => {
    describe('test 1', () => {
        it('111-120 should have 9 valid passwords', () => {
            assert.equal(day4.part1("111-120"), 9);
        });
    });
});

describe('IsValid1 tests', () => {
    describe('test 1', () => {
        it('111111 should be valid', () => {
            assert.equal(day4.isValid1("111111"), true);
        });
    });
    describe('test 2', () => {
        it('223450 should be invalid', () => {
            assert.equal(day4.isValid1("223450"), false);
        });
    });
    describe('test 3', () => {
        it('123789 should be invalid', () => {
            assert.equal(day4.isValid1("123789"), false);
        });
    });
});

describe('IsValid2 tests', () => {
    describe('test 1', () => {
        it('112233 should be valid', () => {
            assert.equal(day4.isValid1("112233"), true);
        });
    });
    describe('test 2', () => {
        it('123444 should be invalid', () => {
            assert.equal(day4.isValid1("123444"), false);
        });
    });
    describe('test 3', () => {
        it('111122 should be invalid', () => {
            assert.equal(day4.isValid1("111122"), false);
        });
    });
});

describe('doubleChar tests', () => {
    describe('test double check 1', () => {
        it('123789 should be invalid', () => {
            assert.equal(day4.containsDouble("111111"), true);
        });
    });
    describe('test double check 2', () => {
        it('123789 should be invalid', () => {
            assert.equal(day4.containsDouble("123789"), false);
        });
    });
});

describe('asc chars tests', () => {
    describe('test 1', () => {
        it('123456 should be invalid', () => {
            assert.equal(day4.charsInAscendingOrder("123456"), true);
        });
    });
    describe('test 2', () => {
        it('54321 should be invalid', () => {
            assert.equal(day4.charsInAscendingOrder("54321"), false);
        });
    });
});