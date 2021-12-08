import type { Line } from "./input.ts";

export function run(data: Line[]): number[] {
  return data.map((l) => l.analyze());
}
