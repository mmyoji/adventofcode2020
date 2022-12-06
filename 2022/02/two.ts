import { lineStream } from "../utils/line-stream.ts";

// Question 2:
// X - Need to lose
// Y - Need to draw
// Z - Need to win

const ROCK = "A" as const;
const PAPER = "B" as const;
const SCISSORS = "C" as const;

const STRATEGY_LOSE = "X" as const;
const STRATEGY_DRAW = "Y" as const;
const STRATEGY_WIN = "Z" as const;

const OUTCOME = {
  [STRATEGY_WIN]: 6,
  [STRATEGY_DRAW]: 3,
  [STRATEGY_LOSE]: 0,
} as const;

type HAND = typeof ROCK | typeof PAPER | typeof SCISSORS;

type STRATEGY =
  | typeof STRATEGY_LOSE
  | typeof STRATEGY_DRAW
  | typeof STRATEGY_WIN;

const POINTS = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3,
} as const;

const WIN_HAND = {
  [ROCK]: PAPER,
  [PAPER]: SCISSORS,
  [SCISSORS]: ROCK,
} as const;

const LOSE_HAND = {
  [ROCK]: SCISSORS,
  [PAPER]: ROCK,
  [SCISSORS]: PAPER,
};

function getHand(strategy: STRATEGY, opponent: HAND): HAND {
  switch (strategy) {
    case STRATEGY_WIN: {
      return WIN_HAND[opponent];
    }
    case STRATEGY_DRAW: {
      return opponent;
    }
    case STRATEGY_LOSE: {
      return LOSE_HAND[opponent];
    }
    default: {
      throw new Error(`Unexpected strategy: ${strategy}`);
    }
  }
}

function getScore(opponent: HAND, strategy: STRATEGY): number {
  const myHand = getHand(strategy, opponent);
  return POINTS[myHand] + OUTCOME[strategy];
}

export async function answer2(path: string) {
  const [rstream, f] = await lineStream(path);

  let total = 0;

  for await (const rawLine of rstream) {
    if (!rawLine.trim()) {
      continue;
    }

    const [opponent, strategy] = rawLine.split(" ").map((s) => s.trim());
    total += getScore(opponent as HAND, strategy as STRATEGY);
  }

  f.close();

  return total;
}
