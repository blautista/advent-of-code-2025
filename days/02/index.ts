import { countOf, range, sumOf } from "../utils/array.js";
import { lines } from "../utils/strings.js";
import { advent } from "../utils/utils.js";

function isSafeReport(report: number[]): boolean {
  const desc = report[1] < report[0];

  for (let i = 1; i < report.length; i++) {
    const right = report[i];
    const left = report[i - 1];

    const safe =
      right !== left &&
      right < left === desc &&
      Math.abs(right - left) <= 3 &&
      Math.abs(right - left) >= 1;

    if (!safe) return false;
  }

  return true;
}

advent({
  day: 2,

  parse: (raw) => lines(raw).map((e) => e.split(" ").map((e) => parseInt(e))),

  one: (reports) => countOf(reports, isSafeReport),

  two: (reports) =>
    countOf(reports, (report) =>
      range(report.length).some((i) => isSafeReport(report.toSpliced(i, 1))),
    ),
});
