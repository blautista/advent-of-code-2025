import { readFileSync } from "node:fs";
import { EOL } from "node:os";
import path from "node:path";

const start = performance.now();

export const readInput = (day: number, test?: boolean) =>
  readFileSync(
    path.join(process.cwd(), "inputs", `${String(day).padStart(2, "0")}${test ? "_test" : ""}.txt`),
    "utf8",
  );

export const printSolutions = (
  firstTest: number | string | string[],
  secondTest?: number | string | string[],
  first?: number | string | string[],
  second?: number | string | string[],
) => {
  console.log("Part one:", first);
  console.log("  (test):", firstTest);
  console.log(EOL);
  console.log("Part two:", second);
  console.log("  (test):", secondTest);
  console.log(EOL);
  console.log(`Total run time: ${((performance.now() - start) / 1000).toFixed(3)}s`);
};

type AdventConfig<Input> = {
  day: number;
  parse?: (raw: string) => Input;
  test?: boolean;
  one: (input: Input) => number | string;
  two?: (input: Input) => number | string;
};

export const advent = <Input = string>(config: AdventConfig<Input>) => {
  const raw = readInput(config.day, false);
  const rawTest = readInput(config.day, true);

  if (raw.includes("INPUT HERE")) {
    console.error("missing puzzle input");
    return;
  }

  const parsed = config.parse?.(raw) ?? (raw as Input);
  const parsedTest = config.parse?.(rawTest) ?? (rawTest as Input);

  if (config.test) {
    printSolutions(config.one(parsedTest), config.two?.(parsedTest), "skipped", "skipped");
  } else {
    printSolutions(
      config.one(parsedTest),
      config.two?.(parsedTest),
      config.one(parsed),
      config.two?.(parsed),
    );
  }
};
