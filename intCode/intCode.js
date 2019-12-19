module.exports = intcode = function intCode(input) {
    let memory = input.split(',').map(x => parseInt(x));
    let ip = 0;
    let run = true;

    while (run) {
        let opCode = memory[ip];
        switch (opCode) {
            case 1: {
                memory[memory[ip + 3]] = memory[memory[ip + 1]] + memory[memory[ip + 2]];
                ip += 4;
                break;
            }
            case 2: {
                memory[memory[ip + 3]] = memory[memory[ip + 1]] * memory[memory[ip + 2]];
                ip += 4;
                break;
            }
            case 99: {
                run = false;
                break;
            }
        }
    }

    return memory;
};