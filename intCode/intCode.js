module.exports = intCode = function(initialState, ip, input, relativeBase) {
    return {
        memory: initialState.split(',').map(x => parseInt(x)),
        ip: ip,
        relativeBase: relativeBase,
        run: true,
        input: input,
        output: [],
        getAtIndex: function (index) {
            while (this.memory[index] === undefined) {
                this.memory.push(0);
            }
            return index;
        },
        next: function () {
            this.run = true;
            while (this.run) {
                let instruction = (this.memory[this.ip] + '').split('');
                let opCode = parseInt([instruction.pop(), instruction.pop()].reverse().join(''));
                //By popping them off the end we are effectively reversing the ordering
                // (i.e the last char is the mode for the 1st param, etc)
                let modes = [
                    parseInt(instruction.pop() || 0),
                    parseInt(instruction.pop() || 0),
                    parseInt(instruction.pop() || 0)
                ];

                let p1;
                let p2;
                let p3;

                if (modes[0] === 1) {
                    p1 = this.ip + 1;
                } else if (modes[0] === 2) {
                    p1 = this.memory[this.ip + 1] + this.relativeBase;
                } else {
                    p1 = this.memory[this.ip + 1];
                }
                if (modes[1] === 1) {
                    p2 = this.ip + 2;
                } else if (modes[1] === 2) {
                    p2 = this.memory[this.ip + 2] + this.relativeBase;
                } else {
                    p2 = this.memory[this.ip + 2];
                }
                if (modes[2] === 1) {
                    p3 = this.ip + 3;
                } else if (modes[2] === 2) {
                    p3 = this.memory[this.ip + 3] + this.relativeBase;
                } else {
                    p3 = this.memory[this.ip + 3];
                }

                switch (opCode) {
                    case 1: {
                        this.memory[this.getAtIndex(p3)] = this.memory[this.getAtIndex(p1)] + this.memory[this.getAtIndex(p2)];
                        this.ip += 4;
                        break;
                    }
                    case 2: {
                        this.memory[this.getAtIndex(p3)] = this.memory[this.getAtIndex(p1)] * this.memory[this.getAtIndex(p2)];
                        this.ip += 4;
                        break;
                    }
                    case 3: {
                        this.memory[this.getAtIndex(p1)] = this.input[0];
                        this.input[0] = this.input.pop();
                        this.ip += 2;
                        break;
                    }
                    case 4: {
                        this.output.push(this.memory[this.getAtIndex(p1)]);
                        this.ip += 2;
                        return {
                            output: this.output[this.output.length -1],
                            memory: this.memory.map(x => x.toString()).join(','),
                            complete: false
                        };
                    }
                    case 5 : {
                        if (this.memory[this.getAtIndex(p1)] !== 0) {
                            this.ip = this.memory[this.getAtIndex(p2)];
                        } else {
                            this.ip += 3;
                        }
                        break;
                    }
                    case 6 : {
                        if (this.memory[this.getAtIndex(p1)] === 0) {
                            this.ip = this.memory[this.getAtIndex(p2)];
                        } else {
                            this.ip += 3;
                        }
                        break;
                    }
                    case 7 : {
                        if (this.memory[this.getAtIndex(p1)] < this.memory[this.getAtIndex(p2)]) {
                            this.memory[this.getAtIndex(p3)] = 1;
                        } else {
                            this.memory[this.getAtIndex(p3)] = 0;
                        }
                        this.ip += 4;
                        break;
                    }
                    case 8 : {
                        if (this.memory[this.getAtIndex(p1)] === this.memory[this.getAtIndex(p2)]) {
                            this.memory[this.getAtIndex(p3)] = 1;
                        } else {
                            this.memory[this.getAtIndex(p3)] = 0;
                        }
                        this.ip += 4;
                        break;
                    }
                    case 9: {
                        this.relativeBase += this.memory[this.getAtIndex(p1)];
                        this.ip += 2;
                        break;
                    }
                    case 99: {
                        this.run = false;
                        return {
                            output: this.output,
                            memory: this.memory.map(x => x.toString()).join(','),
                            complete: true
                        }
                    }
                    default:
                        let err = `Unrecognized opcode: ${opCode}`;
                        console.error(err);
                        this.run = false;
                        this.output.push(err);
                        break;
                }
            }
        }
    };
};

