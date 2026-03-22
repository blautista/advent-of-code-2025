import { sumOf } from "../utils/array.ts";
import { STRAIGHT_VECTORS } from "../utils/graph.ts";
import { lines } from "../utils/strings.ts";
import { advent } from "../utils/utils.ts";
import * as Vector from "../utils/vector.ts";

function findPaths(
  graph: number[][],
  pos: Vector.Vec2,
  visitedTops?: Vector.VectorSet,
  lastValue = -1,
): number {
  const value = graph[pos.i]?.[pos.j];

  if (value === undefined) return 0;
  if (value !== lastValue + 1) return 0;
  if (value === 9) {
    // for part two
    if (!visitedTops) return 1;

    // for part one
    if (!visitedTops.has(pos)) {
      visitedTops.add(pos);
      return 1;
    }

    return 0;
  }

  return sumOf(
    STRAIGHT_VECTORS,
    (vel) => findPaths(graph, Vector.sum(pos, vel), visitedTops, value),
  );
}

advent({
  day: 10,

  parse(raw) {
    const starts: Vector.Vec2[] = [];
    const graph = [];

    const rows = lines(raw);
    for (let i = 0; i < rows.length; i++) {
      const intRow = [];

      for (let j = 0; j < rows[i].length; j++) {
        const n = parseInt(rows[i][j]);
        if (n === 0) starts.push(Vector.create(j, i));

        intRow.push(parseInt(rows[i][j]));
      }

      graph.push(intRow);
    }

    return { starts, graph };
  },

  one: ({ starts, graph }) =>
    sumOf(starts, (start) => findPaths(graph, start, new Vector.VectorSet())),

  two: ({ starts, graph }) => sumOf(starts, (start) => findPaths(graph, start)),
});
