import {
  CloseChunk,
  CHUNKS,
  validate,
  isOpenChunk,
  isCloseChunk,
} from "./chunks.ts";

const POINTS: Record<CloseChunk, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

function findCorrupted(line: string): number {
  const chunks: CloseChunk[] = [];

  for (const char of line) {
    if (isOpenChunk(char)) {
      chunks.push(CHUNKS[char]);
      continue;
    }

    if (isCloseChunk(char)) {
      if (validate(char, chunks)) {
        continue;
      }

      return POINTS[char];
    }

    throw new Error(`Invalid char detected: ${char}`);
  }

  return 0;
}

export function run(data: string[]) {
  let total = 0;

  for (const line of data) {
    total += findCorrupted(line);
  }

  return total;
}
