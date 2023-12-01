import { readLines } from "../utils.ts";

export function parseLine1(line: string): { first: number; last: number } {
  let first = 0;
  let last = 0;
  let firstIdx = Number.MAX_SAFE_INTEGER;
  let lastIdx = -1;

  for (let i = 1; i < 10; i++) {
    const str = String(i);
    {
      const idx = line.indexOf(str);
      if (idx === -1) continue;

      if (idx < firstIdx) {
        firstIdx = idx;
        first = i;
      }
    }

    {
      const idx = line.lastIndexOf(str);
      if (idx > lastIdx) {
        lastIdx = idx;
        last = i;
      }
    }
  }

  return { first, last };
}

export async function question1(path: string): Promise<number> {
  const lines = await readLines(path);
  let total = 0;

  for (const line of lines) {
    const { first, last } = parseLine1(line);
    total += Number(`${first}${last}`);
  }

  return total;
}

const LETTERS = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
} as const;

export function parseLine2(line: string): { first: number; last: number } {
  let first = 0;
  let last = 0;
  let firstIdx = Number.MAX_SAFE_INTEGER;
  let lastIdx = -1;

  for (let i = 1; i < 10; i++) {
    const str = String(i);
    {
      const idx = line.indexOf(str);
      if (idx === -1) continue;

      if (idx < firstIdx) {
        firstIdx = idx;
        first = i;
      }
    }

    {
      const idx = line.lastIndexOf(str);
      if (idx > lastIdx) {
        lastIdx = idx;
        last = i;
      }
    }
  }

  for (const key of Object.keys(LETTERS)) {
    const i = LETTERS[key as keyof typeof LETTERS];

    {
      const idx = line.indexOf(key);
      if (idx === -1) continue;

      if (idx < firstIdx) {
        firstIdx = idx;
        first = i;
      }
    }

    {
      const idx = line.lastIndexOf(key);
      if (idx > lastIdx) {
        lastIdx = idx;
        last = i;
      }
    }
  }

  return { first, last };
}

export async function question2(path: string): Promise<number> {
  const lines = await readLines(path);
  let total = 0;

  for (const line of lines) {
    const { first, last } = parseLine2(line);
    total += Number(`${first}${last}`);
  }

  return total;
}

if (import.meta.main) {
  console.log(`Q1:`, await question1("01/inputs.txt"));
  // 56506

  console.log(`Q2:`, await question2("01/inputs.txt"));
  // 56017
}
