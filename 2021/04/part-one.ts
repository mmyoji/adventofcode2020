import type { CalledNumbers } from "./input.ts";
import type { Board } from "./board.ts";

export function run(numbers: CalledNumbers, boards: Board[]): void {
  for (const n of numbers) {
    for (const board of boards) {
      board.open(n);

      if (board.bingo()) {
        console.log({
          n,
          score: n * board.score(),
        });
        return;
      }
    }
  }
  // { n: 41, score: 35670 }
}
