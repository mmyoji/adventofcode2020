import type { CalledNumbers } from "./input.ts";
import type { Board } from "./board.ts";

export function run(numbers: CalledNumbers, boards: Board[]): void {
  let wonCount = 0;

  for (const n of numbers) {
    for (const board of boards) {
      if (board.won) {
        continue;
      }

      board.open(n);
      if (board.bingo()) {
        wonCount += 1;

        if (wonCount === boards.length) {
          console.log({
            n,
            score: board.score() * n,
          });
        }
      }
    }
  }
  // { n: 88, score: 22704 }
}
