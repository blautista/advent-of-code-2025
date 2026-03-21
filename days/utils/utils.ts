import { EOL } from "node:os";

const start = performance.now();

export const dayToString = (day: unknown) => String(day).padStart(2, "0");

const dayInputFileUrl = (day: number, test = false) =>
  new URL(
    `../${dayToString(day)}/${test ? "test_input" : "input"}.txt`,
    import.meta.url,
  );

export const readInput = (day: number, test = false) => {
  const url = dayInputFileUrl(day, test);

  return Deno.readTextFileSync(url);
};

export const printSolutions = ({
  firstTest,
  secondTest,
  first,
  second,
}: {
  firstTest?: number | string;
  secondTest?: number | string;
  first?: number | string;
  second?: number | string;
}) => {
  console.log("Part one:", first ?? "skipped");
  console.log("  (test):", firstTest ?? "skipped");
  console.log(EOL);
  console.log("Part two:", second ?? "skipped");
  console.log("  (test):", secondTest ?? "skipped");
  console.log(EOL);
  console.log(
    `Total run time: ${((performance.now() - start) / 1000).toFixed(3)}s`,
  );
};

type AdventConfig<Input> = {
  day: number;
  parse?: (raw: string) => Input;
  test?: boolean;
  one: (input: Input) => number | string;
  two?: (input: Input) => number | string;
};

export async function advent<Input = string>(config: AdventConfig<Input>) {
  let raw = readInput(config.day, false);
  const rawTest = readInput(config.day, true);

  if (!raw || raw.includes("INPUT HERE")) {
    const session = Deno.env.get("SESSION");

    if (!session) {
      console.error(
        "missing puzzle input; add a .env file with your session cookie to fetch it automatically, or add it manually",
      );
      return;
    }

    console.log(
      "missing puzzle input, fetching...",
    );
    try {
      const input = await fetchInput(config.day, session);
      raw = input;
      Deno.writeTextFileSync(dayInputFileUrl(config.day), input);
    } catch {
      console.error(
        "there was a problem fetching your input :/, try adding it manually",
      );
      return;
    }
  }

  let solutions = {};
  const parsed = config.parse?.(raw) ?? (raw as Input);

  if (rawTest && !rawTest.includes("INPUT HERE")) {
    const parsedTest = config.parse?.(rawTest) ?? (rawTest as Input);
    solutions = { firstTest: config.one(parsedTest), secondTest: config.two?.(parsedTest) };
  }

  if (config.test) {
    printSolutions(solutions);
  } else {
    printSolutions({
      ...solutions,
      first: config.one(parsed),
      second: config.two?.(parsed),
    });
  }
}

async function fetchInput(day: number, session: string) {
  const res = await fetch(`https://adventofcode.com/2024/day/${day}/input`, {
    headers: { Cookie: `session=${session}` },
  });

  if (!res.ok) {
    throw new Error("couldnt fetch input");
  }

  return res.text();
}
