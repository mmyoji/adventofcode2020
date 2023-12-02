import { readLines } from "../utils.ts";

const LIMIT = {
  red: 12,
  green: 13,
  blue: 14,
} as const;

const COLORS = Object.keys(LIMIT);

function possibleCubes(games: string) {
  for (const game of games.split(";")) {
    const cubes = game.trim().split(",").map((s) => s.trim());
    for (const cube of cubes) {
      const [count, color] = cube.split(" ");
      if (!COLORS.includes(color)) continue;

      if (LIMIT[color as keyof typeof LIMIT] < Number(count)) {
        return false;
      }
    }
  }

  return true;
}

export async function question1(path: string) {
  const lines = await readLines(path);

  const ids: number[] = [];
  for (const line of lines) {
    // "Game 1", "3 blue, ..."
    const [prefix, rest] = line.split(": ");
    const [, id] = prefix.split(" ");
    if (possibleCubes(rest)) {
      ids.push(Number(id));
    }
  }

  return ids.reduce((acc, i) => acc + i, 0);
}

function getPower(games: string): number {
  let counter = {
    red: 0,
    green: 0,
    blue: 0,
  } as const;

  for (const game of games.split(";")) {
    const cubes = game.trim().split(",").map((s) => s.trim());
    for (const cube of cubes) {
      const [countStr, color] = cube.split(" ");
      if (!COLORS.includes(color)) continue;

      const count = Number(countStr);
      if (count > counter[color as keyof typeof counter]) {
        counter = {
          ...counter,
          [color]: count,
        };
      }
    }
  }

  return Object.values(counter).reduce((acc, i) => acc * i, 1);
}

export async function question2(path: string) {
  const lines = await readLines(path);

  let total = 0;
  for (const line of lines) {
    const [_, rest] = line.split(": ");
    total += getPower(rest);
  }
  return total;
}

if (import.meta.main) {
  console.log(`Q1:`, await question1("02/inputs.txt"));
  // 2545

  console.log(`Q2:`, await question2("02/inputs.txt"));
  // 78111
}
