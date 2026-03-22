import * as Vector from "./vector.ts";

export const DIAGONAL_INDEXES = [
  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1],
];

export const STRAIGHT_INDEXES = [[1, 0], [0, 1], [-1, 0], [0, -1]];

export const STRAIGHT_VECTORS = STRAIGHT_INDEXES.map(([i, j]) => Vector.create(j, i));

export const ADJACENT_INDEXES = [...STRAIGHT_INDEXES, ...DIAGONAL_INDEXES];
