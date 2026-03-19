import fs from "node:fs";
import os from "node:os";
import path, { dirname } from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFolderPath = (day: string) => path.join(__dirname, "..", "..", "days", day);

const indexTemplate = (day: number) =>
  `import { advent } from "../utils/utils.js";

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

rl.question("Enter day ", (day) => {
  const num = Number(day);
  if (num < 1 || num > 25) throw new Error("invalid day");

  if (num < 10) day = `0${num}`;

  const folderPath = getFolderPath(day);

  fs.mkdirSync(folderPath, { recursive: true });

  fs.writeFileSync(path.join(folderPath, "index.ts"), indexTemplate(num), { flag: "ax" });

  fs.writeFileSync(path.join(__dirname, "..", "..", "inputs", `${day}.txt`), "INPUT HERE", {
    flag: "ax",
  });
  fs.writeFileSync(
    path.join(__dirname, "..", "..", "inputs", `${day}_test.txt`),
    "TEST INPUT HERE",
    {
      flag: "ax",
    },
  );

  rl.close();
});
