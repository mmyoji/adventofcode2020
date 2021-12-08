import type { Line } from "./line.ts";

export function run(data: Line[]): number[] {
  return data.map((l) => l.analyze());
}
