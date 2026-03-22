import { sumOf, toIntArray } from "../utils/array.ts";
import { lines } from "../utils/strings.ts";
import { advent } from "../utils/utils.ts";

function equationValid(acum: number, rest: number[], target: number): boolean {
  if (rest.length === 0) {
    return acum === target;
  }

  const next = rest[0];

  const sum = acum + next;
  const mult = acum * next;

  if (sum > target && mult > target) {
    return false;
  }

  if (mult > target) {
    return equationValid(sum, rest.slice(1), target);
  }

  return equationValid(sum, rest.slice(1), target) || equationValid(mult, rest.slice(1), target);
}

function equationValidConcat(acum: number, rest: number[], target: number): boolean {
  if (rest.length === 0) {
    return acum === target;
  }

  const next = rest[0];

  const results = [
    acum + next,
    acum * next,
    parseInt(`${acum}${next}`),
  ];

  return results
    .filter((result) => result <= target)
    .some((result) => equationValidConcat(result, rest.slice(1), target));
}

advent({
  day: 7,

  parse(raw) {
    return lines(raw).map((line) => {
      const split = line.split(": ");
      return { target: parseInt(split[0]), nums: toIntArray(split[1].split(" ")) };
    });
  },

  one: (equations) =>
    sumOf(
      equations,
      ({ target: value, nums }) => equationValid(nums[0], nums.slice(1), value) ? value : 0,
    ),

  two: (equations) =>
    sumOf(
      equations,
      ({ target: value, nums }) => equationValidConcat(nums[0], nums.slice(1), value) ? value : 0,
    ),
});
