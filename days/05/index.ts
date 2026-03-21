import { EOL } from "node:os";
import { advent } from "../utils/utils.ts";
import { lines } from "../utils/strings.ts";
import { sumOf, toIntArray } from "../utils/array.ts";

type RuleMap = Map<number, ReadonlySet<number>>;

function isCorrectlyOrdered(rules: RuleMap, update: number[]): boolean {
  for (const [i, n] of update.entries()) {
    const rule = rules.get(n);

    if (rule) {
      const previous = new Set(update.slice(0, i));
      const intersection = rule.intersection(previous);

      if (intersection.size > 0) {
        return false;
      }
    }
  }

  return true;
}

function orderUpdate(rules: RuleMap, update: number[]): number[] {
  const ordered = [update[0]];

  for (const n of update.slice(1)) {
    let added = false;
    const rule = rules.get(n)!;

    if (rule) {
      for (const [i, previous] of ordered.entries()) {
        if (rule.has(previous)) {
          ordered.splice(i, 0, n);
          added = true;
          break;
        }
      }
    }

    if (!added) {
      ordered.push(n);
    }
  }

  return ordered;
}

function getUpdateValue(update: number[]): number {
  return update[Math.floor(update.length / 2)];
}

advent({
  day: 5,

  parse(raw) {
    const [rules, updates] = raw.split(EOL + EOL);

    const allRules = lines(rules).map((line) => toIntArray(line.split("|")));
    const ruleMap = new Map<number, ReadonlySet<number>>();

    for (const [before, after] of allRules) {
      const el = ruleMap.get(before) ?? [];

      ruleMap.set(before, new Set([...el, after]));
    }
    return {
      rules: ruleMap,
      updates: lines(updates).map((line) => toIntArray(line.split(","))),
    };
  },

  one: ({ rules, updates }) =>
    sumOf(updates, (update) => {
      if (!isCorrectlyOrdered(rules, update)) {
        return 0;
      }

      return getUpdateValue(update);
    }),

  two: ({ rules, updates }) =>
    sumOf(updates, (update) => {
      if (isCorrectlyOrdered(rules, update)) {
        return 0;
      }

      return getUpdateValue(orderUpdate(rules, update));
    }),
});
