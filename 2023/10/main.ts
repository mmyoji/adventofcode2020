import { readLines } from "../utils.ts";

export const DAY = "10";

const SYMBOL = {
  START: "S",
  V_PIPE: "|",
  H_PIPE: "-",
  BEND_NE: "L",
  BEND_NW: "J",
  BEND_SW: "7",
  BEND_SE: "F",
  GROUND: ".",
};

const UP = [SYMBOL.V_PIPE, SYMBOL.BEND_SW, SYMBOL.BEND_SE];
const LEFT = [SYMBOL.H_PIPE, SYMBOL.BEND_NE, SYMBOL.BEND_SE];
const RIGHT = [SYMBOL.H_PIPE, SYMBOL.BEND_NW, SYMBOL.BEND_SW];
const DOWN = [SYMBOL.V_PIPE, SYMBOL.BEND_NE, SYMBOL.BEND_NW];

type Coordinate = { step: number; x: number; y: number; symbol: string };

function findStart(lines: string[]): Coordinate {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes(SYMBOL.START)) {
      continue;
    }

    return {
      step: 0,
      x: line.indexOf(SYMBOL.START),
      y: i,
      symbol: SYMBOL.START,
    };
  }

  throw new Error("Start position is not found!");
}

function findNeighbors(
  start: Coordinate,
  lines: string[],
): [Coordinate, Coordinate] {
  const neighbors: Coordinate[] = [];

  // up
  {
    const [x, y] = [start.x, start.y - 1];
    const symbol = lines[y]?.[x];
    if (UP.includes(symbol)) {
      neighbors.push({ x, y, step: 1, symbol });
    }
  }

  // left
  {
    const [x, y] = [start.x - 1, start.y];
    const symbol = lines[y]?.[x];
    if (LEFT.includes(symbol)) {
      neighbors.push({ x, y, step: 1, symbol });
    }
  }

  // right
  {
    const [x, y] = [start.x + 1, start.y];
    const symbol = lines[y]?.[x];
    if (RIGHT.includes(symbol)) {
      neighbors.push({ x, y, step: 1, symbol });
    }
  }

  // down
  {
    const [x, y] = [start.x, start.y + 1];
    const symbol = lines[y]?.[x];
    if (DOWN.includes(symbol)) {
      neighbors.push({ x, y, step: 1, symbol });
    }
  }

  if (neighbors.length !== 2) {
    throw new Error(`Invalid neighbors: ${JSON.stringify(neighbors, null, 1)}`);
  }

  const [one, two] = neighbors;
  return [one, two];
}

function checkUp(
  former: Coordinate,
  current: Coordinate,
  lines: string[],
): Coordinate | undefined {
  const [x, y] = [current.x, current.y - 1];
  if (isSame(former, { x, y })) {
    return;
  }

  const symbol = lines[y]?.[x];
  if (!UP.includes(symbol)) {
    throw new Error(`unexpected up symbol: ${symbol}`);
  }
  return { x, y, step: current.step + 1, symbol };
}

function checkLeft(
  former: Coordinate,
  current: Coordinate,
  lines: string[],
): Coordinate | undefined {
  const [x, y] = [current.x - 1, current.y];
  if (isSame(former, { x, y })) {
    return;
  }

  const symbol = lines[y]?.[x];
  if (!LEFT.includes(symbol)) {
    throw new Error(`unexpected up symbol: ${symbol}`);
  }
  return { x, y, step: current.step + 1, symbol };
}

function checkRight(
  former: Coordinate,
  current: Coordinate,
  lines: string[],
): Coordinate | undefined {
  const [x, y] = [current.x + 1, current.y];
  if (isSame(former, { x, y })) {
    return;
  }

  const symbol = lines[y]?.[x];
  if (!RIGHT.includes(symbol)) {
    throw new Error(`unexpected up symbol: ${symbol}`);
  }
  return { x, y, step: current.step + 1, symbol };
}

function checkDown(
  former: Coordinate,
  current: Coordinate,
  lines: string[],
): Coordinate | undefined {
  const [x, y] = [current.x, current.y + 1];
  if (isSame(former, { x, y })) {
    return;
  }

  const symbol = lines[y]?.[x];
  if (!DOWN.includes(symbol)) {
    throw new Error(`unexpected up symbol: ${symbol}`);
  }
  return { x, y, step: current.step + 1, symbol };
}

const format = (crd: Coordinate) => JSON.stringify(crd, null, 1);

function findNext(
  former: Coordinate,
  current: Coordinate,
  lines: string[],
): [Coordinate, Coordinate] {
  switch (current.symbol) {
    case "|": {
      for (const fn of [checkUp, checkDown]) {
        const next = fn(former, current, lines);
        if (next) {
          return [current, next];
        }
      }

      break;
    }
    case "-": {
      for (const fn of [checkLeft, checkRight]) {
        const next = fn(former, current, lines);
        if (next) {
          return [current, next];
        }
      }

      break;
    }
    case "L": {
      for (const fn of [checkUp, checkRight]) {
        const next = fn(former, current, lines);
        if (next) {
          return [current, next];
        }
      }

      break;
    }
    case "J": {
      for (const fn of [checkUp, checkLeft]) {
        const next = fn(former, current, lines);
        if (next) {
          return [current, next];
        }
      }

      break;
    }
    case "7": {
      for (const fn of [checkDown, checkLeft]) {
        const next = fn(former, current, lines);
        if (next) {
          return [current, next];
        }
      }

      break;
    }
    case "F": {
      for (const fn of [checkDown, checkRight]) {
        const next = fn(former, current, lines);
        if (next) {
          return [current, next];
        }
      }

      break;
    }
    default: {
      throw new Error(`unexpected symbol ${current.symbol}`);
    }
  }

  throw new Error(
    `Invalid neighbor: former=${format(former)}, current=${format(current)}`,
  );
}

function isSame(
  crd1: Pick<Coordinate, "x" | "y">,
  crd2: Pick<Coordinate, "x" | "y">,
): boolean {
  return crd1.x === crd2.x && crd1.y === crd2.y;
}

export async function part1(path: string) {
  const lines = await readLines(path);

  const start = findStart(lines);

  let former1 = { ...start };
  let former2 = { ...start };
  let [neighbor1, neighbor2] = findNeighbors(start, lines);
  while (!isSame(neighbor1, neighbor2)) {
    [former1, neighbor1] = findNext(former1, neighbor1, lines);
    [former2, neighbor2] = findNext(former2, neighbor2, lines);
  }

  return neighbor1.step;
}

export async function part2(path: string) {
  const lines = await readLines(path);

  // TODO: impl

  return lines.length;
}

if (import.meta.main) {
  console.log(`Q1:`, await part1(`${DAY}/inputs.txt`));
  // answer: 7030

  console.log(`Q2:`, await part2(`${DAY}/inputs.txt`));
  // answer: yyy
}
