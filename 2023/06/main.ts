import { readLines } from "../utils.ts";

type Race = {
  time: number;
  distance: number;
};

const getNumbers = (line: string) =>
  line
    .split(" ")
    .filter(Boolean)
    .map(Number)
    .filter((n) => !Number.isNaN(n));

function winPatterns(race: Race): number {
  let wins = 0;
  // Actually you just need a half of them.
  for (let push = 0; push <= race.time; push++) {
    const rest = race.time - push;
    const distance = push * rest;
    if (distance > race.distance) {
      wins++;
    }
  }
  return wins;
}

export async function question1(path: string) {
  const lines = await readLines(path);

  const times = getNumbers(lines[0]);
  const distances = getNumbers(lines[1]);

  const patterns: number[] = [];
  for (let i = 0; i < times.length; i++) {
    patterns.push(winPatterns({ time: times[i], distance: distances[i] }));
  }

  return patterns.reduce((acc, i) => acc * i, 1);
}

const getNumber = (line: string) =>
  Number(
    line
      .split(" ")
      .filter(Boolean)
      .map(Number)
      .filter((n) => !Number.isNaN(n))
      .join("")
  );

export async function question2(path: string) {
  const lines = await readLines(path);

  return winPatterns({
    time: getNumber(lines[0]),
    distance: getNumber(lines[1]),
  });
}

if (import.meta.main) {
  console.log(`Q1:`, await question1("06/inputs.txt"));
  // answer: 4811940

  console.log(`Q2:`, await question2("06/inputs.txt"));
  // answer: 30077773
}
