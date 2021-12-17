import {
  CloseChunk,
  CHUNKS,
  validate,
  isOpenChunk,
  isCloseChunk,
} from "./chunks.ts";

const SCORES: Record<CloseChunk, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

function findIncomplete(line: string): number {
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

      return 0;
    }

    throw new Error(`Invalid char detected: ${char}`);
  }

  // Incomplete
  if (chunks.length) {
    let total = 0;
    while (chunks.length) {
      const chunk = chunks.pop();
      if (chunk == null) break;

      total = total * 5 + SCORES[chunk];
    }

    return total;
  }

  return 0;
}

export function run(data: string[]) {
  const scores: number[] = [];

  for (const line of data) {
    const score = findIncomplete(line);
    if (score > 0) {
      scores.push(score);
    }
  }

  const sortedScores = [...scores].sort((a, b) => a - b);

  return sortedScores[Math.floor(scores.length / 2)];
}
