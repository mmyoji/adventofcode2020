import { readLines } from "../utils.ts";

const toNumbers = (line: string) => line.split(" ").map(Number);
const last = (ns: number[]) => ns.at(-1) as number;
const first = (ns: number[]) => ns[0];

function diffList(base: number[]): number[][] {
  const diffs: number[][] = [];

  let target = [...base];
  while (diffs.length === 0 || new Set(diffs.at(-1)).size !== 1) {
    const next: number[] = [];
    for (let i = 1; i < target.length; i++) {
      next.push(target[i] - target[i - 1]);
    }

    diffs.push(next);
    target = [...next];
  }

  return diffs;
}

function predictNext(base: number[]): number {
  const diffs = diffList(base).toReversed();

  let next = last(diffs[0]);
  for (const diff of diffs.slice(1, diffs.length)) {
    next = last(diff) + next;
  }

  return last(base) + next;
}

export async function question1(path: string) {
  const lines = await readLines(path);
  const predictions = lines.map((line) => predictNext(toNumbers(line)));
  return predictions.reduce((acc, n) => acc + n, 0);
}

function predictPrev(base: number[]): number {
  const diffs = diffList(base).toReversed();

  let next = first(diffs[0]);
  for (const diff of diffs.slice(1, diffs.length)) {
    next = first(diff) - next;
  }

  return first(base) - next;
}

export async function question2(path: string) {
  const lines = await readLines(path);
  const predictions = lines.map((line) => predictPrev(toNumbers(line)));
  return predictions.reduce((acc, n) => acc + n, 0);
}

if (import.meta.main) {
  console.log(`Q1:`, await question1("09/inputs.txt"));
  // answer: 1972648895

  console.log(`Q2:`, await question2("09/inputs.txt"));
  // answer: 919
}
