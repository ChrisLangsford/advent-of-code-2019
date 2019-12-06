// const input = require("./input-6");
// const input = {string: "COM)B\n" + "B)C\n" + "C)D\n" + "D)E\n" + "E)F\n" + "B)G\n" + "G)H\n" + "D)I\n" + "E)J\n" + "J)K\n" + "K)L"};
// const input = {string: "COM)B\n" + "B)C\n" + "B)G\n" + "G)H\n"};
const input = {string: "COM)B\n" + "B)C\n" + "B)G\n"};
// const input = {string: "COM)B\n" + "B)C"};

console.log(`Part 1: ${part1(input.string)}`);
console.log(`Part 2: ${part2(input.string)}`);

function part1(input) {
    let bodies = {};
    let instructions = input.split('\n').sort();

    instructions.forEach(i => {
        let a = i.split(")")[0];
        let b = i.split(")")[1];
        if (!bodies[a]) {
            bodies[a] = [];
        }
        if (!bodies[b]) {
            bodies[b] = [];
        }
        if (bodies[a] && bodies[b]) {
            bodies[a].push(b);
        }
    });

    let ans = 0;
    ans += f(bodies, "COM");

    return ans;

}

function f(bodies, start) {
    let ans = 0;

    if (bodies[start].length === 0) {
        ans++;
    }

    bodies[start].forEach(c => {
        ans += f(bodies, c);
    });

    return ans;
}

function part2(input) {
    return null;
}

module.exports = {
    part1: part1,
    part2: part2
};