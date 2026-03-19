export const range = (n: number) => Array.from({ length: n }, (_, i) => i);

export function sum(arr: number[]): number {
  return arr.reduce((prev, curr) => prev + curr, 0);
}

export function toIntArray(arr: string[]): number[] {
  return arr.map((e) => parseInt(e));
}

export function mult(arr: number[]): number {
  return arr.reduce((prev, curr) => prev * curr, 1);
}

export function sumOf<T>(arr: T[], selector: (n: T, i: number) => number): number {
  return sum(arr.map(selector));
}

export function countOf<T>(arr: T[], predicate: (n: T, i: number) => boolean): number {
  return sumOf(arr, (n, i) => (predicate(n, i) ? 1 : 0));
}

export function shuffle<T>(unshuffled: T[]): T[] {
  return unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function drop<T>(arr: T[], amount = 1): T[] {
  return arr.slice(amount);
}

export function dropLast<T>(arr: T[], amount = 1): T[] {
  if (amount > arr.length) return [];
  return arr.slice(0, arr.length - amount);
}

export function take<T>(arr: T[], amount: number): T[] {
  return arr.slice(0, amount);
}

export function takeLast<T>(arr: T[], amount: number): T[] {
  if (amount < 1) return [];
  return arr.slice(-amount);
}

export function head<T>(arr: T[]): T | undefined {
  return arr.at(0);
}

export function tail<T>(arr: T[]): T | undefined {
  return arr.at(-1);
}

export function isStrictlyDescending(arr: number[]): boolean {
  return arr.every((v, i) => (arr[i - 1] ? v + 1 === arr[i - 1] : true));
}

export function isStrictlyAscending(arr: number[]): boolean {
  return arr.every((v, i) => (arr[i - 1] ? v - 1 === arr[i - 1] : true));
}

export function isStrictlyAscOrDesc(arr: number[]): boolean {
  return arr.every((v, i) => (arr[i - 1] ? v - 1 === arr[i - 1] || v + 1 === arr[i - 1] : true));
}

export function dedupe<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export function createArray<T>(size: number, mapper: (index: number) => T): T[] {
  return Array(size)
    .fill(0)
    .map((_, i) => mapper(i));
}
