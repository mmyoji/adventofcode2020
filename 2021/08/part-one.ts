import type { Output, Line } from "./line.ts";

export function isTarget(output: Output): boolean {
  return [2, 3, 4, 7].includes(output.length);
}

export function run(data: Line[]): number {
  const outputs = data.flatMap(({ outputs }) => outputs);

  let count = 0;
  for (const output of outputs) {
    if (isTarget(output)) {
      count++;
    }
  }

  return count;
}
