export const HAND_TYPE = {
  five: 5,
  four: 4,
  full: 3.5,
  three: 3,
  two: 2,
  one: 1,
  high: 0,
} as const;

export type HandType = keyof typeof HAND_TYPE;

export type Hand = {
  card: string;
  type: HandType;
  bid: number;
};

export function countPerSymbol(card: string): Map<string, number> {
  const m = new Map<string, number>();
  for (const char of card) {
    const count = m.get(char);
    m.set(char, count != null ? count + 1 : 1);
  }
  return m;
}

export function _getType(m: Map<string, number>): HandType {
  const pairs = Array.from(m.keys()).length;
  switch (pairs) {
    case 1: {
      return "five";
    }
    case 2: {
      // 1, 4 or 2, 3
      const [min] = Array.from(m.values()).toSorted();
      return min === 1 ? "four" : "full";
    }
    case 3: {
      // 1, 1, 3 or 1, 2, 2
      const [max] = Array.from(m.values()).toSorted((a, b) => b - a);
      return max === 3 ? "three" : "two";
    }
    case 4: {
      return "one";
    }
    default: {
      return "high";
    }
  }
}
