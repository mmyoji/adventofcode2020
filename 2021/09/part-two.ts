interface LookupBasinArgs {
  area: number[][];
  x: number;
  y: number;
  points: Set<string>;
}

function lookupBasin({ area, x, y, points }: LookupBasinArgs): number {
  const current = area[y][x];

  for (const [xx, yy] of [
    [x, y - 1], // up
    [x, y + 1], // down
    [x - 1, y], // left
    [x + 1, y], // right
  ]) {
    const key = `${xx}-${yy}`;

    const target: number | undefined = area[yy]?.[xx];
    if (typeof target !== "number") {
      continue;
    }

    if (target === 9) {
      continue;
    }

    if (target > current) {
      if (points.has(key)) {
        continue;
      }

      points.add(key);
      lookupBasin({ area, x: xx, y: yy, points });
    }
  }

  return points.size;
}

export function run(data: number[][]) {
  const lowPoints: number[][] = [];

  for (let y = 0; y < data.length; y++) {
    const line = data[y];
    for (let x = 0; x < line.length; x++) {
      const current = line[x];
      const aroundPoints = [
        data[y - 1]?.[x],
        data[y + 1]?.[x],
        line[x - 1],
        line[x + 1],
      ].filter((s) => s != null);
      if (aroundPoints.every((p) => p > current)) {
        lowPoints.push([x, y]);
      }
    }
  }

  const areas: number[] = [];

  for (const [x, y] of lowPoints) {
    const points = new Set<string>();
    points.add(`${x}-${y}`);

    areas.push(lookupBasin({ area: data, x, y, points }));
  }

  const top3 = [...areas].sort((a, b) => b - a).slice(0, 3);
  return top3.reduce((p, c) => p * c);
}
