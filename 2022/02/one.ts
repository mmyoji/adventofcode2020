import { lineStream } from "utils/line-stream.ts";

// Question 1:
// A, X - Rock       -- 1
// B, Y - Paper      -- 2
// C, Z - Scissors   -- 3
//
// Win  -- 6
// Draw -- 3
// Lost -- 0

const ROCK = "A" as const;
const PAPER = "B" as const;
const SCISSORS = "C" as const;

const STRATEGY_ROCK = "X" as const;
const STRATEGY_PAPER = "Y" as const;
const STRATEGY_SCISSORS = "Z" as const;

const OUTCOME = {
  win: 6,
  draw: 3,
  lose: 0,
} as const;

type HAND = typeof ROCK | typeof PAPER | typeof SCISSORS;

type STRATEGY_HAND =
  | typeof STRATEGY_ROCK
  | typeof STRATEGY_PAPER
  | typeof STRATEGY_SCISSORS;

const POINTS = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3,
} as const;

const MY_HANDS = {
  [STRATEGY_ROCK]: ROCK,
  [STRATEGY_PAPER]: PAPER,
  [STRATEGY_SCISSORS]: SCISSORS,
} as const;

function getScore(opponent: HAND, myHand: STRATEGY_HAND): number {
  const me = MY_HANDS[myHand];
  const shapeScore = POINTS[me];

  if (opponent === me) {
    return shapeScore + OUTCOME.draw;
  }

  switch (opponent) {
    case ROCK: {
      return shapeScore + (me === PAPER ? OUTCOME.win : OUTCOME.lose);
    }
    case PAPER: {
      return shapeScore + (me === SCISSORS ? OUTCOME.win : OUTCOME.lose);
    }
    case SCISSORS: {
      return shapeScore + (me === ROCK ? OUTCOME.win : OUTCOME.lose);
    }
    default: {
      throw new Error(
        `Unexpected combinations: me=${me}, opponent=${opponent}`
      );
    }
  }
}

export async function answer1(path: string) {
  const [rstream, f] = await lineStream(path);

  let total = 0;

  for await (const rawLine of rstream) {
    if (!rawLine.trim()) {
      continue;
    }

    const [opponent, myStrategy] = rawLine.split(" ").map((s) => s.trim());
    total += getScore(opponent as HAND, myStrategy as STRATEGY_HAND);
  }

  f.close();

  return total;
}
