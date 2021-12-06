import type { Fishes } from "./input.ts";

export function run(fishes: Fishes): void {
  let counts: Record<string, number> = {};

  for (const n of fishes) {
    const ns = String(n);
    if (ns in counts) {
      counts[ns] += 1;
    } else {
      counts[ns] = 1;
    }
  }

  for (let i = 0; i < 256; i++) {
    const nextCounts: Record<string, number> = {};
    for (const n in counts) {
      if (counts[n] < 1) continue;

      if (n === "0") {
        nextCounts["6"] = counts[n];
        nextCounts["8"] = counts[n];
      } else {
        const key = `${Number(n) - 1}`;
        nextCounts[key] = (nextCounts[key] || 0) + counts[n];
      }
    }
    counts = { ...nextCounts };
  }

  let answer: number = 0;
  for (const n in counts) {
    answer += counts[n];
  }

  console.log({ answer });
  // { answer: 1572358335990 }
}
