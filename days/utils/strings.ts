import { EOL } from "node:os";

export const lines = (str: string): string[] => str.trim().split(EOL);
