const input = require("./input-6");
// const input = {string: "COM)B\n" + "B)C\n" + "C)D\n" + "D)E\n" + "E)F\n" + "B)G\n" + "G)H\n" + "D)I\n" + "E)J\n" + "J)K\n" + "K)L"}; //test 1
// const input = {string: "COM)B\n" + "B)C\n" + "C)D\n" + "D)E\n" + "E)F\n" + "B)G\n" + "G)H\n" + "D)I\n" + "E)J\n" + "J)K\n" + "K)L\n" + "K)YOU\n" + "I)SAN"}; //test 2

console.log(`Part 1: ${part1(input.string)}`);
console.log(`Part 2: ${part2(input.string)}`);

function part1(input) {
    const orbits = parseInput(input);
    return (`Total # of orbits: ` +
        Object.keys(orbits)
            .map(name => getNumOrbits(orbits, name))
            .reduce((a, b) => a + b, 0)
    );
}

function parseInput(input) {
    return input.split('\n')
        .map(s => s.split(')'))
        .reduce((acc, [value, key]) => ({...acc, [key]: value}), {});
}

function getNumOrbits(orbits, name) {
    return orbits[name] ? 1 + getNumOrbits(orbits, orbits[name]) : 0;
}

function part2(input) {
    return "# of orbital transfers to get to SAN: " +
        (djikstra(getGraph(parseInput(input)), 'YOU')[0].get('SAN') - 2);
}

function djikstra(graph, source) {
    const nodes = new Set(Object.keys(graph));
    const dist = new Map();
    const prev = new Map();

    [...nodes].forEach(node => {
        dist.set(node, Infinity)
    });
    dist.set(source, 0);

    while (nodes.size) {
        const closest = [...nodes].reduce(minBy(n => dist.get(n)));
        nodes.delete(closest);
        graph[closest].forEach(neighbor => {
            const alt = dist.get(closest) + 1;
            if (alt < dist.get(neighbor)) {
                dist.set(neighbor, alt);
                prev.set(neighbor, closest);
            }
        });
    }
    return [dist, prev];

}

function minBy(cb) {
    return (a, b) => (cb(b) < cb(a) ? b : a)
}

function getGraph(orbits) {
    return Object.entries(orbits).reduce((acc, [key, value]) => {
        acc[key] = acc[key] || [];
        acc[value] = acc[value] || [];
        acc[key].push(value);
        acc[value].push(key);
        return acc;
    }, {});
}

module.exports = {
    part1: part1,
    part2: part2
};