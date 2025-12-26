const fs = require('fs');

const input = fs.readFileSync("./inputs/input-7.txt", "utf-8");

// console.log(input);

const part_1 = function(input) {
    const lines = input.split("\n");
    var beams = [];

    const sourceIndex = lines[0].indexOf('S');
    // console.log(sourceIndex); // 70
    beams.push(sourceIndex);
    var hitCount = 0;

    for (var i = 1; i < lines.length; i++) {
        const line = lines[i];
        // Find splitters on this line
        const splitters = [];
        var lastIndex = -1;
        while (true) {
            const index = line.indexOf('^', lastIndex + 1);
            if (index == -1) {
                break;
            }
            splitters.push(index);
            lastIndex = index;
        }

        // console.log('Splitters: ' + splitters);

        // Check whether the beams hit any of the splitters
        var newBeams = [];
        for (var j = 0; j < beams.length; j++) {
            var hit = false;
            for (var k = 0; k < splitters.length; k++) {
                if (beams[j] == splitters[k]) {
                    hit = true;
                    hitCount++;
                    newBeams.push(splitters[k] - 1);
                    newBeams.push(splitters[k] + 1);
                    break;
                }
            }
            if (!hit) {
                newBeams.push(beams[j]);
            }
        }
        // Deduplicate the new beams
        var newBeamsSet = new Set(newBeams);
        newBeams = Array.from(newBeamsSet);
        newBeams.sort();
        beams = newBeams;
        // console.log(beams);
        // console.log(hitCount);
    }

    if (hitCount != 1560) {
        throw new Error("Part 1: Wrong hit count");
    }
    console.log("Hit count: " + hitCount)
}

part_1(input);
