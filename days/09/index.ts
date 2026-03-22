import { advent } from "../utils/utils.ts";
import { range, sum, sumOf, toIntArray } from "../utils/array.ts";

function parseToIdsArray(input: string) {
  const arr: (number | undefined)[] = [];

  let fileBlockId = 0;

  toIntArray(input.split("")).forEach((d, i) => {
    const isFileBlock = i % 2 === 0;

    if (isFileBlock) {
      if (d > 0) {
        arr.push(...Array(d).fill(fileBlockId));
      }
      fileBlockId++;
    } else {
      if (d > 0) {
        arr.push(...Array(d));
      }
    }
  });

  return arr;
}

function parseToMap(raw: string) {
  const blockMap = new Map<number, { id: number | undefined; size: number; moved?: true }>();
  const blockIndexes: number[] = [];
  const spaceIndexes: number[] = [];

  let blockId = 0;
  let index = 0;

  toIntArray(raw.split("")).forEach((d, i) => {
    const isFileBlock = i % 2 === 0;

    if (isFileBlock) {
      if (d > 0) {
        blockMap.set(index, { id: blockId, size: d });
        blockIndexes.push(index);
      }
      blockId++;
    } else {
      if (d > 0) {
        blockMap.set(index, { id: undefined, size: d });
        spaceIndexes.push(index);
      }
    }

    index += d;
  });

  return { blockMap, spaceIndexes, blockIndexes };
}

advent({
  day: 9,
  // test: true,

  one(raw) {
    const arr = parseToIdsArray(raw);
    const filledCount = arr.filter((d) => d != null).length;

    let lastSpacePos = 0;

    for (let i = arr.length - 1; i >= filledCount; i--) {
      if (!arr[i]) continue;

      for (let j = lastSpacePos; j < i; j++) {
        if (arr[j] == null) {
          arr[j] = arr[i];
          arr[i] = undefined;
          lastSpacePos = j + 1;
          break;
        }
      }
    }

    return sumOf(arr, (id, i) => id ? i * id : 0);
  },

  two(input) {
    const { blockMap, blockIndexes, spaceIndexes } = parseToMap(input);

    for (const blockIndex of blockIndexes.toReversed()) {
      const block = blockMap.get(blockIndex)!;

      for (const [i, spaceIndex] of spaceIndexes.entries()) {
        if (spaceIndex > blockIndex) break;
        const space = blockMap.get(spaceIndex)!;

        if (space.size >= block.size) {
          blockMap.set(spaceIndex, { id: block.id, size: block.size });
          blockMap.delete(blockIndex);
          spaceIndexes.splice(i, 1);

          if (space.size > block.size) {
            blockMap.set(spaceIndex + block.size, { id: undefined, size: space.size - block.size });
            spaceIndexes.splice(i, 0, spaceIndex + block.size);
          }
          break;
        }
      }
    }

    return sumOf(Array.from(blockMap.entries()), ([index, value]) => {
      if (value.id == null) return 0;

      return sum(range(value.size, index)) * value.id;
    });
  },
});
