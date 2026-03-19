import process from "node:process";
import readline from "node:readline";
import { dayToString } from "../days/utils/utils.ts";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getDayFolderPath = (day: string) =>
  new URL(
    `../days/${day}/`,
    import.meta.url,
  );

const indexTemplate = (day: number) =>
  `import { advent } from "../utils/utils.ts";

advent({
  day: ${day},
  test: true,

  parse(raw) {
    return raw
  },

  one(input) {
    return 0;
  },

  two(input) {
    return 0;
  },
});
`;

const day = Deno.args[0];

if (!day) throw new Error("please pass a day as an argument");

const num = Number(day);

if (num < 1 || num > 25) throw new Error("invalid day");

const folderPath = getDayFolderPath(dayToString(num));

Deno.mkdirSync(folderPath);

Deno.writeTextFileSync(new URL("./index.ts", folderPath), indexTemplate(num));

Deno.writeTextFileSync(
  new URL("./input.txt", folderPath),
  "INPUT HERE",
);

Deno.writeTextFileSync(
  new URL("./test_input.txt", folderPath),
  "TEST INPUT HERE",
);

rl.close();

console.log(`Day created! Find it in days/${dayToString(num)}`);
