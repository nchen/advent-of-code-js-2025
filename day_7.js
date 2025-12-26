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

// Recursion + memo
function part_2(input) {
    const lines = input.split("\n");
    const beamIndex = lines[0].indexOf('S');

    // splitterLines[i] coresponds to lines[i+1] splitters
    const splitterLines = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const splitters = [];
        let lastIndex = -1;
        while (true) {
            const idx = line.indexOf('^', lastIndex + 1);
            if (idx === -1) break;
            splitters.push(idx);
            lastIndex = idx;
        }
        splitterLines.push(splitters);
    }

    const memo = {}; // key = row + "," + col

    function dfs(row, col) {
        // Current row index to process（1..lines.length-1）
        if (row === lines.length) {
            return 1;
        }

        const key = row + "," + col;
        if (key in memo) {
            return memo[key];
        }

        // splitterLines index for "row" is row-1 (since splitterLines[0] == lines[1])
        const splits = splitterLines[row - 1];
        const choices = [];

        if (!splits.includes(col)) {
            choices.push(col);
        } else {
            // splitter -> can go left/right if within bounds
            if (col > 0) {
                choices.push(col - 1);
            }
            if (col < lines[row].length - 1) {
                choices.push(col + 1);
            }
        }

        let total = 0;
        for (const c of choices) {
            total += dfs(row + 1, c);
        }
        memo[key] = total;
        return total;
    }

    const timelines = dfs(1, beamIndex);
    if (timelines != 25592971184998) {
        console.log("Error: incorrect timelines count");
        return;
    }
    console.log("Number of timelines:", timelines);
    return timelines;
}

part_1(input);
part_2(input);
