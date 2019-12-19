module.exports = intcode = function intCode(memory) {
    return memory.split(',').map(x => parseInt(x));
};