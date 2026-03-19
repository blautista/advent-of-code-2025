import { mult, sum, sumOf, toIntArray } from "../utils/array.js";
import { matches } from "../utils/strings.js";
import { advent } from "../utils/utils.js";

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
