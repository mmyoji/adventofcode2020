import { readLines } from "../utils.ts";

export const DAY = "14";

const SYMBOL = {
  roundedRock: "O",
  cubeShapedRock: "#",
  empty: ".",
};

function dig(
  x: number,
  y: number,
  lines: string[],
  stacks: number[],
  memo: Map<number, number>,
) {
  const c = lines[y]?.[x];
  if (c == null) return;

  if (c === SYMBOL.roundedRock) {
    if (stacks.length) {
      memo.set(y, stacks.shift() as number);

      stacks.push(y);
      stacks.sort((a, b) => a - b);
    }

    return dig(x, y + 1, lines, stacks, memo);
  }

  if (c === SYMBOL.empty) {
    stacks.push(y);
    return dig(x, y + 1, lines, stacks, memo);
  }

  return dig(x, y + 1, lines, [], memo);
}

export async function part1(path: string) {
  const lines = await readLines(path);

  let total = 0;
  for (let x = 0; x < lines[0].length; x++) {
    // former y - new y
    const memo = new Map<number, number>();

    dig(x, 0, lines, [], memo);

    for (let y = 0; y < lines.length; y++) {
      const c = lines[y][x];
      const newY = memo.get(y);
      if (newY != null) {
        total += lines.length - newY;
        continue;
      }

      if (c === SYMBOL.roundedRock) {
        total += lines.length - y;
      }
    }
  }

  return total;
}

export async function part2(path: string) {
  const lines = await readLines(path);

  // TODO: impl

  return lines.length;
}

if (import.meta.main) {
  console.log(`Q1:`, await part1(`${DAY}/inputs.txt`));
  // answer: 108955

  console.log(`Q2:`, await part2(`${DAY}/inputs.txt`));
  // answer: yyy
}
