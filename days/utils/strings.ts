export const lines = (str: string): string[] => str.trim().split(/\r?\n/);

export const matches = (str: string, regexp: RegExp): string[] =>
  Array.from(str.matchAll(regexp), (m) => m[0]);
