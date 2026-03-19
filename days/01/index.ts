import { sumOf } from "../utils/array.ts";
import { lines } from "../utils/strings.ts";
import { advent } from "../utils/utils.ts";

advent({
  day: 1,
  parse(raw) {
    const rows = lines(raw);
    const col1 = [];
    const col2 = [];

    for (const row of rows) {
      const [a, b] = row.split("   ");
      col1.push(parseInt(a));
      col2.push(parseInt(b.trim()));
    }

    return [col1, col2];
  },

  one(input) {
    const [col1, col2] = input.map((col) => col.toSorted());

    function similarityScore(a: number, b: number) {
      return Math.abs(a - b);
    }

    return sumOf(col1, (n, i) => similarityScore(n, col2[i]));
  },

  two: ([col1, col2]) => sumOf(col1, (left) => sumOf(col2, (right) => (right === left ? left : 0))),
});
