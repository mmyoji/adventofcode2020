import { lineStream } from "../utils/line-stream.ts";

function generateAlphabetScore() {
  let start = "a".charCodeAt(0);
  let end = "z".charCodeAt(0);

  const data: Record<string, number> = {};

  let score = 1;
  for (let i = start; i <= end; i++) {
    data[String.fromCharCode(i)] = score;
    score++;
  }

  start = "A".charCodeAt(0);
  end = "Z".charCodeAt(0);

  for (let i = start; i <= end; i++) {
    data[String.fromCharCode(i)] = score;
    score++;
  }

  return data;
}

const AlphebetScore = generateAlphabetScore();

function findCommonChar(a: string[], b: string[]): string {
  for (const char of a) {
    if (b.includes(char)) {
      return char;
    }
  }

  return "";
}

export async function one(path: string): Promise<number> {
  const [stream, f] = await lineStream(path);

  let sum = 0;

  for await (const line of stream) {
    if (!line.length) {
      continue;
    }

    const midIndex = line.length / 2;
    const [a, b] = [line.slice(0, midIndex), line.slice(midIndex, line.length)];
    const [sortedA, sortedB] = [a, b].map((s) => {
      const sarr = s.split("");
      sarr.sort((a, b) => (a > b ? 1 : -1));
      return sarr;
    });

    console.log({
      sortedA,
      sortedB,
    });
    const s = findCommonChar(sortedA, sortedB);
    if (!s) {
      throw new Error(`Common character is not found in ${line}`);
    }

    sum += AlphebetScore[s];
  }

  f.close();

  return sum;
}
