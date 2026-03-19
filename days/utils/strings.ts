import { EOL } from "node:os";

export const lines = (str: string): string[] => str.trim().split(EOL);

export const matches = (str: string, regexp: RegExp): string[] =>
  Array.from(str.matchAll(regexp), (m) => m[0]);
