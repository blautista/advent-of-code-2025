import { dayToString } from "./utils/utils.ts";

const day = Deno.args[0];

if (!day) {
  console.error("Please provide a day");
  Deno.exit(1);
}

// console.clear();
await import(`./${dayToString(day)}/index.ts`);
