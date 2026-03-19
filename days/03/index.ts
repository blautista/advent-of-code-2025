import { mult, sumOf, toIntArray } from "../utils/array.ts";
import { matches } from "../utils/strings.ts";
import { advent } from "../utils/utils.ts";

const mul = (match: string) => mult(toIntArray(matches(match, /\d+/g)));

advent({
  day: 3,

  one: (input) => sumOf(matches(input, /mul\(\d+,\d+\)/g), mul),

  two(input) {
    const sequence = matches(input, /((mul\(\d+,\d+\))|do\(\)|don't\(\))/g);

    let shouldMultiply = true;
    let count = 0;

    for (const match of sequence) {
      if (match.startsWith("mul") && shouldMultiply) {
        count += mul(match);
      }

      if (match === "don't()") {
        shouldMultiply = false;
      }

      if (match === "do()") {
        shouldMultiply = true;
      }
    }

    return count;
  },
});
