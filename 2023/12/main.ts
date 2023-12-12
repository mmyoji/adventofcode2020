import { readLines } from "../utils.ts";

export const DAY = "12";

export function arrangements(line: string, combo: number[]): number {
  let total = 0;

  // TODO: impl

  return total;
}

export async function part1(path: string) {
  const lines = await readLines(path);
  return lines
    .map((line) => {
      const [l, combo] = line.split(" ");
      return arrangements(l, combo.split(",").map(Number));
    })
    .reduce((acc, n) => acc + n, 0);
}

export async function part2(path: string) {
  const lines = await readLines(path);

  // TODO: impl

  return lines.length;
}

if (import.meta.main) {
  console.log(`Q1:`, await part1(`${DAY}/inputs.txt`));
  // answer: xxx

  console.log(`Q2:`, await part2(`${DAY}/inputs.txt`));
  // answer: yyy
}
