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
  J: -1,
  T: 10,
};

function getType(card: string): HandType {
  const m = countPerSymbol(card);

  if (m.has("J")) {
    const v = m.get("J");
    const pairs = Array.from(m.keys()).length;
    switch (pairs) {
      case 1:
      case 2: {
        return "five";
      }
      case 3: {
        // 1, 1, 3 or 1, 2, 2
        const [max] = Array.from(m.values()).toSorted((a, b) => b - a);
        if (max === 3) return "four";

        return v === 2 ? "four" : "full";
      }
      case 4: {
        return "three";
      }
    }

    // 1, 1, 1, 1, 1
    return "one";
  }

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

export async function question2(path: string) {
  const lines = await readLines(path);
  return lines.map(toHand)
    .toSorted((a, b) => play(a, b))
    .map(({ bid }, i) => bid * (i + 1))
    .reduce((acc, n) => acc + n, 0);
}
