import { countOf } from "../utils/array.ts";
import { lines } from "../utils/strings.ts";
import { advent } from "../utils/utils.ts";

const XMAS = "XMAS";
const MAS = XMAS.slice(1);

function formsXmas(
  graph: string[],
  iStart: number,
  jStart: number,
  iInc: number,
  jInc: number,
): boolean {
  let i = iStart + iInc;
  let j = jStart + jInc;

  for (const c of MAS) {
    if (c !== graph?.[i]?.[j]) return false;

    i += iInc;
    j += jInc;
  }

  return true;
}

const diagonalIndexes = [
  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1],
];

const adjacentIndexes = [[1, 0], [0, 1], [-1, 0], [0, -1], ...diagonalIndexes];

function countXmas(graph: string[], i: number, j: number) {
  return countOf(adjacentIndexes, ([iInc, jInc]) => formsXmas(graph, i, j, iInc, jInc));
}

function formsX(graph: string[], i: number, j: number): boolean {
  const diagonalPositions = diagonalIndexes.map(([iInc, jInc]) => graph?.[i + iInc]?.[j + jInc]);

  // this is dumb
  return (
    diagonalPositions.every((c) => c === "M" || c === "S") &&
    countOf(diagonalPositions, (c) => c === "S") === 2 &&
    graph[i - 1][j - 1] !== graph[i + 1][j + 1]
  );
}

advent({
  day: 4,

  parse(raw) {
    const graph = lines(raw);
    return { graph, height: graph.length, width: graph[0].length };
  },

  one({ graph, width, height }) {
    let count = 0;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (graph[i][j] === "X") {
          count += countXmas(graph, i, j);
        }
      }
    }

    return count;
  },

  two({ graph, width, height }) {
    let count = 0;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (graph[i][j] === "A" && formsX(graph, i, j)) {
          count++;
        }
      }
    }

    return count;
  },
});
