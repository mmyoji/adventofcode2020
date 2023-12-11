import { readLines } from "../utils.ts";

export const DAY = "11";

type Galaxy = { x: number; y: number };

type Distance = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
};

const SYMBOL = {
  EMPTY: ".",
  GALAXY: "#",
};

const range = (start: number, end: number) =>
  Array.from(
    { length: end - start + 1 },
    (_, i) => start + i,
  );

function getDistances(lines: string[]) {
  const emptyColumns = new Set<number>(range(0, lines.length - 1));
  const emptyRows = new Set<number>(range(0, lines[0].length - 1));
  const galaxies: Galaxy[] = [];
  const distances: Distance[] = [];

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const c = line[x];
      if (!Object.values(SYMBOL).includes(c)) {
        throw new Error(`Unexpected point: x=${x}, y=${y}`);
      }

      if (c === SYMBOL.EMPTY) continue;

      emptyColumns.has(y) && emptyColumns.delete(y);
      emptyRows.has(x) && emptyRows.delete(x);

      const current = { x, y };
      for (const galaxy of galaxies) {
        distances.push({
          x0: galaxy.x,
          y0: galaxy.y,
          x1: current.x,
          y1: current.y,
        });
      }

      galaxies.push(current);
    }
  }

  return { emptyColumns, emptyRows, distances };
}

export async function calc(path: string, times: number) {
  const lines = await readLines(path);

  const { emptyColumns, emptyRows, distances } = getDistances(lines);

  let total = 0;
  for (const { x0, x1, y0, y1 } of distances) {
    let step = 0;

    const [bigY, smallY] = y0 > y1 ? [y0, y1] : [y1, y0];
    for (let y = smallY; y <= bigY; y++) {
      step++;

      if (emptyColumns.has(y)) {
        step += times - 1;
      }
    }
    step--;

    const [bigX, smallX] = x0 > x1 ? [x0, x1] : [x1, x0];
    for (let x = smallX; x <= bigX; x++) {
      step++;
      if (emptyRows.has(x)) {
        step += times - 1;
      }
    }
    step--;

    total += step;
  }

  return total;
}

export const part1 = (path: string) => calc(path, 2);
export const part2 = (path: string, times: number) => calc(path, times);

if (import.meta.main) {
  console.log(`Q1:`, await part1(`${DAY}/inputs.txt`));
  // answer: 10276166

  console.log(`Q2:`, await part2(`${DAY}/inputs.txt`, 1_000_000));
  // answer: 598693078798
}
