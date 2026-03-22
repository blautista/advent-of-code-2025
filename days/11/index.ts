import { sum, toBigIntArray } from "../utils/array.ts";
import { advent } from "../utils/utils.ts";

function blink(stones: bigint[]): bigint[] {
  const newStones: bigint[] = [];

  for (const stone of stones) {
    const stoneStr = stone.toString();

    if (stone === 0n) {
      newStones.push(1n);
    } else if (stoneStr.length % 2 === 0) {
      newStones.push(
        BigInt(stoneStr.slice(0, stoneStr.length / 2)),
        BigInt(stoneStr.slice(stoneStr.length / 2)),
      );
    } else {
      newStones.push(stone * 2024n);
    }
  }

  return newStones;
}

function blinkOptimized(stones: Map<bigint, number>): Map<bigint, number> {
  const newStones = new Map();

  function setStoneCount(n: bigint, count: number) {
    newStones.set(n, (newStones.get(n) ?? 0) + count);
  }

  for (const [stone, count] of stones.entries()) {
    const stoneStr = stone.toString();

    if (stone === 0n) {
      setStoneCount(1n, count);
    } else if (stoneStr.length % 2 === 0) {
      const left = BigInt(stoneStr.slice(0, stoneStr.length / 2));
      const right = BigInt(stoneStr.slice(stoneStr.length / 2));

      setStoneCount(left, count);
      setStoneCount(right, count);
    } else {
      setStoneCount(stone * 2024n, count);
    }
  }

  return newStones;
}

advent({
  day: 11,

  parse(raw) {
    return toBigIntArray(raw.split(" "));
  },

  one(input) {
    let stones = [...input];

    for (let i = 0; i < 25; i++) {
      stones = blink(stones);
    }

    return stones.length;
  },

  two(input) {
    let stones = new Map(input.map((stone) => [stone, 1]));

    for (let i = 0; i < 75; i++) {
      stones = blinkOptimized(stones);
    }

    return sum(Array.from(stones.values()));
  },
});
