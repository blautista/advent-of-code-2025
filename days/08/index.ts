import { compareAll } from "../utils/array.ts";
import { lines } from "../utils/strings.ts";
import { advent } from "../utils/utils.ts";
import * as Vector from "../utils/vector.ts";

function findResonantAntinodes(
  antenna: Vector.Vec2,
  diff: Vector.Vec2,
  width: number,
  height: number,
): Vector.Vec2[] {
  const antinodes = [antenna];

  let antinode = Vector.sum(antenna, diff);

  while (Vector.withinBounds(antinode, height, width)) {
    antinodes.push(antinode);
    antinode = Vector.sum(antinode, diff);
  }

  return antinodes;
}

advent({
  day: 8,

  parse(raw) {
    const vectorMap = new Map<string, Vector.Vec2[]>();

    const rows = lines(raw);
    rows.forEach((line, i) => {
      for (let j = 0; j < line.length; j++) {
        const c = line[j];

        if (c === ".") continue;

        const arr = vectorMap.get(c);
        const vector = Vector.create(j, i);

        if (arr) {
          arr.push(vector);
        } else {
          vectorMap.set(c, [vector]);
        }
      }
    });

    return { vectorMap, height: rows.length, width: rows[0].length };
  },

  one({ vectorMap, height, width }) {
    const allAntinodes = new Vector.VectorSet();

    for (const [, vectors] of vectorMap.entries()) {
      compareAll(vectors, (a, b) => {
        const diff = Vector.subtract(a, b);
        const antinodes = [Vector.sum(a, diff), Vector.subtract(b, diff)];

        antinodes.forEach((antinode) => {
          if (Vector.withinBounds(antinode, height, width)) {
            allAntinodes.add(antinode);
          }
        });
      });
    }

    return allAntinodes.size;
  },

  two({ vectorMap, height, width }) {
    const allAntinodes = new Vector.VectorSet();

    for (const [, vectors] of vectorMap.entries()) {
      compareAll(vectors, (a, b) => {
        const diff = Vector.subtract(a, b);
        const antinodes = [
          ...findResonantAntinodes(a, diff, width, height),
          ...findResonantAntinodes(b, Vector.opposite(diff), width, height),
        ];

        antinodes.forEach((antinode) => {
          allAntinodes.add(antinode);
        });
      });
    }

    return allAntinodes.size;
  },
});
