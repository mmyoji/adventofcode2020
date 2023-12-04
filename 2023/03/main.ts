import { readLines } from "../utils.ts";

type NumberWithPosition = {
  n: number;
  x0: number;
  x1: number;
};

function getNumbers(line: string): NumberWithPosition[] {
  const ret: NumberWithPosition[] = [];
  let s = "";
  let x0 = -1;
  for (let x = 0; x < line.length; x++) {
    const c = line[x];
    const n = Number(c);
    if (Number.isNaN(n)) {
      if (s !== "") {
        ret.push({ x0, x1: x - 1, n: Number(s) });
      }

      s = "";
      x0 = -1;
      continue;
    }

    s += c;
    if (x0 === -1) {
      x0 = x;
    }
  }

  if (s !== "") {
    ret.push({ x0, x1: line.length - 1, n: Number(s) });
  }

  return ret;
}

function adjacent(
  { x0, x1, y, lines }: { x0: number; x1: number; y: number; lines: string[] },
): boolean {
  for (const yy of [y - 1, y, y + 1]) {
    const line = lines[yy];
    if (line == null) continue;

    for (let x = x0 - 1; x <= x1 + 1; x++) {
      const c = line[x];
      if (c == null) continue;
      if (!Number.isNaN(Number(c))) continue;
      if (c === ".") continue;

      return true;
    }
  }

  return false;
}

export async function question1(path: string) {
  const lines = await readLines(path);
  const ns: number[] = [];

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (const { n, x0, x1 } of getNumbers(line)) {
      if (adjacent({ x0, x1, y, lines })) {
        ns.push(n);
      }
    }
  }

  return ns.reduce((acc, n) => acc + n, 0);
}

const GEAR = "*";

function getX(line: string): number[] {
  const xs: number[] = [];
  for (let x = 0; x < line.length; x++) {
    const c = line[x];
    if (c === GEAR) {
      xs.push(x);
    }
  }
  return xs;
}

function neighbors({ x, y, lines }: { x: number; y: number; lines: string[] }) {
  const _neighbors: { x0: number; y: number; n: number }[] = [];

  for (const yy of [y - 1, y, y + 1]) {
    const line = lines[yy];
    if (!line) continue;

    for (const xx of [x - 1, x, x + 1]) {
      const c = line[xx];
      if (!c) continue;
      const n = Number(c);
      if (Number.isNaN(n)) continue;

      for (const { n, x0, x1 } of getNumbers(line)) {
        if (x0 > x + 1 || x1 < x - 1) continue;
        if (
          _neighbors.find((nb) => nb.n === n && nb.x0 === x0 && nb.y === yy)
        ) {
          continue;
        }
        _neighbors.push({ n, x0, y: yy });
        if (_neighbors.length > 2) {
          return 0;
        }
      }
    }
  }

  if (_neighbors.length !== 2) return 0;

  return _neighbors.map((nb) => nb.n).reduce((acc, n) => acc * n, 1);
}

export async function question2(path: string) {
  const lines = await readLines(path);
  const ns: number[] = [];

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (const x of getX(line)) {
      ns.push(neighbors({ x, y, lines }));
    }
  }

  return ns.reduce((acc, n) => acc + n, 0);
}

if (import.meta.main) {
  console.log(`Q1:`, await question1("03/inputs.txt"));
  // 507214

  console.log(`Q2:`, await question2("03/inputs.txt"));
  // 72553319
}
