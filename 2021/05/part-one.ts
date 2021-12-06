import type { Vent } from "./input.ts";

const covered: Record<string, number> = {};

function points({ x1, y1, x2, y2 }: Vent): string[] {
  const data: string[] = [];

  if (x1 !== x2 && y1 !== y2) {
    return data;
  }

  if (x1 === x2) {
    const [smaller, larger] = y1 < y2 ? [y1, y2] : [y2, y1];
    for (let i = smaller; i <= larger; i++) {
      data.push(`${x1}-${i}`);
    }
    return data;
  }

  const [smaller, larger] = x1 < x2 ? [x1, x2] : [x2, x1];
  for (let i = smaller; i <= larger; i++) {
    data.push(`${i}-${y1}`);
  }
  return data;
}

export function run(vents: Vent[]) {
  for (const v of vents) {
    for (const p of points(v)) {
      if (p in covered) {
        covered[p] += 1;
      } else {
        covered[p] = 1;
      }
    }
  }

  let count = 0;
  for (const key in covered) {
    if (covered[key] > 1) {
      count++;
    }
  }
  console.log({ answer: count });
  // { answer: 7473 }
}
