import { readLines } from "../utils.ts";

export const DAY = "13";

function mirrorY(
  { y0, y1, lines, matched }: {
    y0: number;
    y1: number;
    lines: string[];
    matched: number;
  },
): boolean {
  if (!lines[y0] || !lines[y1]) {
    return matched > 0;
  }

  if (lines[y0] !== lines[y1]) return false;

  return mirrorY({ y0: y0 - 1, y1: y1 + 1, lines, matched: ++matched });
}

function mirrorX(
  { x0, x1, lines, matched }: {
    x0: number;
    x1: number;
    lines: string[];
    matched: number;
  },
): boolean {
  const line = lines[0];
  if (!line[x0] || !line[x1]) {
    return matched > 0;
  }

  if (line[x0] !== line[x1]) return false;

  for (let y = 1; y < lines.length; y++) {
    const line = lines[y];
    if (line[x0] !== line[x1]) return false;
  }

  return mirrorX({ x0: x0 - 1, x1: x1 + 1, lines, matched: ++matched });
}

function calc(lines: string[]): number {
  for (let y0 = 0; y0 < lines.length; y0++) {
    const y1 = y0 + 1;
    if (!lines[y1]) break;

    if (mirrorY({ y0, y1, lines, matched: 0 })) {
      return (y0 + 1) * 100;
    }
  }

  const line = lines[0];
  for (let x0 = 0; x0 < line.length; x0++) {
    const x1 = x0 + 1;
    if (!line[x1]) break;

    if (mirrorX({ x0, x1, lines, matched: 0 })) {
      return x0 + 1;
    }
  }

  return 0;
}

export async function part1(path: string) {
  const lines = await readLines(path);

  let total = 0;
  let start = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") {
      total += calc(lines.slice(start, i));
      start = i + 1;
    }

    if (i === lines.length - 1) {
      total += calc(lines.slice(start, i + 1));
    }
  }

  return total;
}

export async function part2(path: string) {
  const lines = await readLines(path);

  // TODO: impl

  return lines.length;
}

if (import.meta.main) {
  console.log(`Q1:`, await part1(`${DAY}/inputs.txt`));
  // answer: 36041

  console.log(`Q2:`, await part2(`${DAY}/inputs.txt`));
  // answer: yyy
}
