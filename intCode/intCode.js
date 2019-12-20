module.exports = intcode = function intCode(initialState, ip, input, relativeBase) {
    let memory = initialState.split(',').map(x => parseInt(x));
    let run = true;
    let output = null;

    while (run) {
        let instruction = (memory[ip] + '').split('');
        let opCode = parseInt([instruction.pop(), instruction.pop()].reverse().join(''));
        let modes = [
            parseInt(instruction.pop() || 0),
            parseInt(instruction.pop() || 0),
            parseInt(instruction.pop() || 0)
        ];

        //todo: Make sense of relative mode here
        let p1 = modes[0] === 1 ? ip + 1 : memory[ip + 1];
        let p2 = modes[1] === 1 ? ip + 2 : memory[ip + 2];
        let p3 = memory[ip + 3];

        switch (opCode) {
            case 1: {
                memory[p3] = memory[p1] + memory[p2];
                ip += 4;
                break;
            }
            case 2: {
                memory[p3] = memory[p1] * memory[p2];
                ip += 4;
                break;
            }
            case 3: {
                memory[p1] = input[0];
                input[0] = input.pop();
                ip += 2;
                break;
            }
            case 4: {
                output = memory[p1];
                ip += 2;
                break;
            }
            case 5 : {
                if (memory[p1] !== 0) {
                    ip = memory[p2];
                } else {
                    ip += 3;
                }
                break;
            }
            case 6 : {
                if (memory[p1] === 0) {
                    ip = memory[p2];
                } else {
                    ip += 3;
                }
                break;
            }
            case 7 : {
                if (memory[p1] < memory[p2]) {
                    memory[p3] = 1;
                } else {
                    memory[p3] = 0;
                }
                ip += 4;
                break;
            }
            case 8 : {
                if (memory[p1] === memory[p2]) {
                    memory[p3] = 1;
                } else {
                    memory[p3] = 0;
                }
                ip += 4;
                break;
            }
            case 9: {
                relativeBase += memory[p1];
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
                output = err;
                break;
        }
    }

    return {output: output, memory: memory};
};