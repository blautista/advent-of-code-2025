import { EOL } from "node:os";
import { advent } from "../utils/utils.ts";
import { lines } from "../utils/strings.ts";
import { sumOf, toIntArray } from "../utils/array.ts";

advent({
  day: 5,
  // test: true,

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
      for (const [i, n] of update.entries()) {
        const rule = rules.get(n);

        if (rule) {
          const previous = new Set(update.slice(0, i));
          const intersection = rule.intersection(previous);

          if (intersection.size > 0) {
            return 0;
          }
        }
      }
      return update[Math.floor(update.length / 2)];
    }),

  two() {
    return 0;
  },
});
