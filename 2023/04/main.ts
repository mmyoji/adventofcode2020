import { readLines } from "../utils.ts";

function parseNumbers(line: string): number[] {
  return line.split(" ").filter(Boolean).map(Number);
}

function getPoints(winning: number[], myNumbers: number[]): number {
  let point = 0;

  for (const w of winning) {
    if (myNumbers.includes(w)) {
      if (point) {
        point *= 2;
      } else {
        point = 1;
      }
    }
  }

  return point;
}

export async function question1(path: string) {
  const lines = await readLines(path);
  let total = 0;
  for (const line of lines) {
    const [_, numbers] = line.split(": ");
    const [winning, mine] = numbers.split(" | ");
    total += getPoints(parseNumbers(winning), parseNumbers(mine));
  }

  return total;
}

function getWins(winning: number[], myNumbers: number[]): number {
  let count = 0;

  for (const w of winning) {
    if (myNumbers.includes(w)) {
      count += 1;
    }
  }

  return count;
}

export async function question2(path: string) {
  const lines = await readLines(path);
  const copy: Map<number, number> = new Map();
  for (let y = 0; y < lines.length; y++) {
    const current = copy.get(y);
    copy.set(y, current ? current + 1 : 1);

    const line = lines[y];
    const [_, numbers] = line.split(": ");
    const [winning, mine] = numbers.split(" | ");
    const count = getWins(parseNumbers(winning), parseNumbers(mine));
    if (!count) {
      continue;
    }

    for (let repeat = copy.get(y) as number; repeat > 0; repeat--) {
      for (let yy = 0; yy < count; yy++) {
        const key = y + yy + 1;
        const v = copy.get(key);
        copy.set(key, v ? v + 1 : 1);
      }
    }
  }

  let total = 0;
  for (const count of copy.values()) {
    total += count;
  }

  return total;
}

if (import.meta.main) {
  console.log(`Q1:`, await question1("04/inputs.txt"));
  // 27059

  console.log(`Q2:`, await question2("04/inputs.txt"));
  // 5744979
}
