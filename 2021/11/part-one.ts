interface IncrAdjacentsArgs {
  x: number;
  y: number;
  lines: number[][];
}

function incrAdjacents({ x, y, lines }: IncrAdjacentsArgs): number[][] {
  const reaches10: number[][] = [];

  for (const _y of [-1, 0, 1]) {
    const yy = y + _y;
    const line = lines[yy];
    if (!line) {
      continue;
    }

    for (const _x of [-1, 0, 1]) {
      if (_y === 0 && _x === 0) {
        continue;
      }

      const xx = x + _x;
      if (typeof line[xx] === "number") {
        line[xx] += 1;

        if (line[xx] === 10) {
          reaches10.push([xx, yy]);
        }
      }
    }
  }

  return reaches10;
}

const STEPS = 100;

export function run(data: number[][]): number {
  let allFlashCount = 0;

  for (let i = 0; i < STEPS; i++) {
    let reaches10: number[][] = [];
    for (let y = 0; y < data.length; y++) {
      const line = data[y];
      for (let x = 0; x < line.length; x++) {
        line[x] += 1;

        if (line[x] === 10) {
          reaches10 = [...reaches10, [x, y]];
        }
      }
    }

    let newReaches10: typeof reaches10 = [];
    do {
      newReaches10 = [];
      for (const [x, y] of reaches10) {
        newReaches10.push(...incrAdjacents({ x, y, lines: data }));
      }
      reaches10 = [...newReaches10];
    } while (newReaches10.length);

    let flashCount = 0;
    for (let y = 0; y < data.length; y++) {
      const line = data[y];
      for (let x = 0; x < line.length; x++) {
        if (line[x] >= 10) {
          flashCount++;
          line[x] = 0;
        }
      }
    }

    allFlashCount += flashCount;
  }

  return allFlashCount;
}
