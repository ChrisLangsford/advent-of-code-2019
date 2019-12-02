const input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,2,9,19,23,2,23,10,27,1,6,27,31,1,31,6,35,2,35,10,39,1,39,5,43,2,6,43,47,2,47,10,51,1,51,6,55,1,55,6,59,1,9,59,63,1,63,9,67,1,67,6,71,2,71,13,75,1,75,5,79,1,79,9,83,2,6,83,87,1,87,5,91,2,6,91,95,1,95,9,99,2,6,99,103,1,5,103,107,1,6,107,111,1,111,10,115,2,115,13,119,1,119,6,123,1,123,2,127,1,127,5,0,99,2,14,0,0];
const desiredOutput = 19690720;

console.log(`Day 2, Part 1:\n intCode: ${intCode(input, 12, 2)}`);
console.log(`Day 2, Part 2:\n ${day2pt2(input, desiredOutput)}`);

function intCode(initialState, noun, verb) {
    let programState = [...initialState];
    programState[1] = noun;
    programState[2] = verb;

    for (let instructionPointer = 0; instructionPointer < programState.length; instructionPointer += 4) {
        let operation = programState[instructionPointer];
        switch (operation) {
            case 1:
                programState[programState[instructionPointer + 3]] = add(findInProgramState(programState, programState[instructionPointer + 1]), findInProgramState(programState, programState[instructionPointer + 2]));
                break;
            case 2:
                programState[programState[instructionPointer + 3]] = multiply(findInProgramState(programState, programState[instructionPointer + 1]), findInProgramState(programState, programState[instructionPointer + 2]));
                break;
            case 99:
                return halt(programState);

        }
    }

}

function day2pt2(initialState, desiredOutput) {
    let terminate = false;

    for (let noun = 0; !terminate && noun <= 99; noun++) {
        for (let verb = 0; !terminate && verb <= 99; verb++) {
            let result = intCode([...initialState], noun, verb);

            if (result === desiredOutput) {
                terminate = true;
                return `DONE!\nNoun: ${noun}, Verb: ${verb}\nProgram output: ${100 * noun + verb}`;
            }
        }
    }
}

function halt(list) {
    return list[0];
}

function add(arg1, arg2) {
    return arg1 + arg2;
}

function multiply(arg1, arg2) {
    return arg1 * arg2;
}

function findInProgramState(list, arg) {
    return list[arg];
}