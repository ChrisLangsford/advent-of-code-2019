module.exports = intcode = function intCode(initialState, ip, input, relativeBase) {
    let memory = initialState.split(',').map(x => parseInt(x));
    let run = true;
    let output = [];

    while (run) {
        let instruction = (memory[ip] + '').split('');
        let opCode = parseInt([instruction.pop(), instruction.pop()].reverse().join(''));
        //By popping them off the end we are effectively reversing the ordering
        // (i.e the last char is the mode for the 1st param, etc)
        let modes = [
            parseInt(instruction.pop() || 0),
            parseInt(instruction.pop() || 0),
            parseInt(instruction.pop() || 0)
        ];

        //TODO: run through example 1 (quine) and figure out whats really going on with relative position mode
        let p1;
        let p2;
        let p3;

        if (modes[0] === 1) {
            p1 = ip + 1;
        } else if (modes[0] === 2) {
            p1 = memory[ip + 1] + relativeBase;
        } else {
            p1 = memory[ip + 1];
        }
        if (modes[1] === 1) {
            p2 = ip + 2;
        } else if (modes[1] === 2) {
            p2 = memory[ip + 2] + relativeBase;
        } else {
            p2 = memory[ip + 2];
        }
        if (modes[2] === 1) {
            p3 = ip + 3;
        } else if (modes[2] === 2) {
            p3 = memory[ip + 3] + relativeBase;
        } else {
            p3 = memory[ip + 3];
        }

        switch (opCode) {
            case 1: {
                memory[getAtIndex(memory,p3)] = memory[getAtIndex(memory, p1)] + memory[getAtIndex(memory, p2)];
                ip += 4;
                break;
            }
            case 2: {
                memory[getAtIndex(memory,p3)] = memory[getAtIndex(memory, p1)] * memory[getAtIndex(memory, p2)];
                ip += 4;
                break;
            }
            case 3: {
                memory[getAtIndex(memory, p1)] = input[0];
                input[0] = input.pop();
                ip += 2;
                break;
            }
            case 4: {
                output.push(memory[getAtIndex(memory, p1)]);
                ip += 2;
                break;
            }
            case 5 : {
                if (memory[getAtIndex(memory, p1)] !== 0) {
                    ip = memory[getAtIndex(memory, p2)];
                } else {
                    ip += 3;
                }
                break;
            }
            case 6 : {
                if (memory[getAtIndex(memory, p1)] === 0) {
                    ip = memory[getAtIndex(memory, p2)];
                } else {
                    ip += 3;
                }
                break;
            }
            case 7 : {
                if (memory[getAtIndex(memory, p1)] < memory[getAtIndex(memory, p2)]) {
                    memory[getAtIndex(memory,p3)] = 1;
                } else {
                    memory[getAtIndex(memory,p3)] = 0;
                }
                ip += 4;
                break;
            }
            case 8 : {
                if (memory[getAtIndex(memory, p1)] === memory[getAtIndex(memory, p2)]) {
                    memory[getAtIndex(memory,p3)] = 1;
                } else {
                    memory[getAtIndex(memory,p3)] = 0;
                }
                ip += 4;
                break;
            }
            case 9: {
                relativeBase += memory[getAtIndex(memory, p1)];
                ip += 2;
                break;
            }
            case 99: {
                run = false;
                break;
            }
            default:
                let err = `Unrecognized opcode: ${opCode}`;
                console.error(err);
                run = false;
                output.push(err);
                break;
        }
    }

    return {output: output.join(','), memory: memory};
};

function getAtIndex(memory, index) {
    while (memory[index] === undefined) {
        memory.push(0);
    }
    return index;
}
