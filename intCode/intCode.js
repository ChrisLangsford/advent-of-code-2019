module.exports = intcode = function intCode(initialState, input) {
    let memory = initialState.split(',').map(x => parseInt(x));
    let ip = 0;
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

        let p1 = modes[0] === 1 ? ip + 1 : memory[ip + 1];
        let p2 = modes[1] === 1 ? ip + 2 : memory[ip + 2];
        let p3 = modes[2] === 1 ? ip + 3 : memory[ip + 3];

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
                memory[p1] = input;
                ip += 2;
                break;
            }
            case 4: {
                output = memory[p1];
                ip += 2;
                break;
            }
            case 5 : {
                //first time reaching this opcode is setting the ip to an invalid register
                if (p1 !== 0) {
                    ip = p2;
                } else {
                    ip += 3;
                }
                break;
            }
            case 6 : {
                if (p1 === 0) {
                    ip = p2;
                } else {
                    ip += 3;
                }
                break;
            }
            case 7 : {
                if (p1 < p2) {
                    memory[p3] = 1;
                } else {
                    memory[p3] = 0;
                }
                ip += 4;
                break;
            }
            case 8 : {
                if (p1 === p2) {
                    memory[p3] = 1;
                } else {
                    memory[p3] = 0;
                }
                ip += 4;
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