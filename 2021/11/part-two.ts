interface AdjacentsArgs {
  x: number;
  y: number;
  lines: number[][];
}

function incrAll(lines: number[][]): number[][] {
  const flashing: number[][] = [];

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      line[x] += 1;

      if (line[x] === 10) {
        flashing.push([x, y]);
      }
    }
  }

  return flashing;
}

function getAdjacents({ x, y, lines }: AdjacentsArgs): number[][] {
  const adjacents: number[][] = [];

  for (const yy of [y - 1, y, y + 1]) {
    const line = lines[yy];
    if (line == null) {
      continue;
    }

    for (const xx of [x - 1, x, x + 1]) {
      if (yy === y && xx === x) {
        continue;
      }

      if (typeof line[xx] === "number" && line[xx] < 10) {
        adjacents.push([xx, yy]);
      }
    }
  }

  return adjacents;
}

function incrAdjacents({ x, y, lines }: AdjacentsArgs) {
  for (const [xx, yy] of getAdjacents({ x, y, lines })) {
    const line = lines[yy];
    line[xx] += 1;

    if (line[xx] === 10) {
      incrAdjacents({ x: xx, y: yy, lines });
    }
  }
}

function updateFlashed(lines: number[][]) {
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];

    for (let x = 0; x < line.length; x++) {
      if (line[x] > 9) {
        line[x] = 0;
      }
    }
  }
}

function allFlashed(lines: number[][]): boolean {
  for (const line of lines) {
    if (!line.every((n) => n === 0)) {
      return false;
    }
  }

  return true;
}

export function run(data: number[][]): number {
  let step = 1;
  for (step; ; step++) {
    const flashing = incrAll(data);

    for (const [x, y] of flashing) {
      incrAdjacents({ x, y, lines: data });
    }

    updateFlashed(data);

    if (allFlashed(data)) {
      break;
    }
  }

  return step;
}
