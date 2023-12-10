import { readLines } from "../utils.ts";

export const DAY = "xx";

export async function part1(path: string) {
  const lines = await readLines(path);

  // TODO: impl

  return lines.length;
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
