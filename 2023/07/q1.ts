import {
  _getType,
  countPerSymbol,
  Hand,
  HAND_TYPE,
  HandType,
} from "./_shared.ts";
import { readLines } from "../utils.ts";

const CARD_VALUE: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
};

function getType(card: string): HandType {
  const m = countPerSymbol(card);
  return _getType(m);
}

function toHand(line: string): Hand {
  const [card, bid] = line.split(" ");
  return { card, type: getType(card), bid: Number(bid) };
}

function play(handA: Hand, handB: Hand): number {
  if (handA.type === handB.type) {
    const cardA = handA.card;
    const cardB = handB.card;
    for (let i = 0; i < 5; i++) {
      const s1 = cardA[i];
      const s2 = cardB[i];
      const n1 = CARD_VALUE[s1] || Number(s1);
      const n2 = CARD_VALUE[s2] || Number(s2);
      if (n1 === n2) continue;

      return n1 - n2;
    }
  }

  return HAND_TYPE[handA.type] - HAND_TYPE[handB.type];
}

export async function question1(path: string) {
  const lines = await readLines(path);
  return lines.map(toHand)
    .toSorted((a, b) => play(a, b))
    .map(({ bid }, i) => bid * (i + 1))
    .reduce((acc, n) => acc + n, 0);
}
