import { Board } from "./board.ts";

export type CalledNumbers = number[];

export async function fetchData(): Promise<[CalledNumbers, Board[]]> {
  // const data = (await Deno.readTextFile("./sample.txt")).split("\n");
  const data = (await Deno.readTextFile("./input.txt")).split("\n");

  const calledNumbers: CalledNumbers = data[0]
    .split(",")
    .map((s) => parseInt(s, 10));

  const boardData = data.slice(2, data.length);

  const boards: Board[] = [];
  let lines: string[] = [];
  for (const line of boardData) {
    if (!line) continue;

    lines.push(line);

    if (lines.length === 5) {
      boards.push(new Board(lines));
      lines = [];
    }
  }

  return [calledNumbers, boards];
}
