import { lineStream } from "utils/line-stream.ts";

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

function findCommonChars(a: string[], b: string[]): string[] {
  const ret: string[] = [];

  for (const char of a) {
    if (b.includes(char)) {
      ret.push(char);
    }
  }

  return ret;
}

function findCommonChar(group: string[]): string {
  const [sortedA, sortedB, sortedC] = group.map((s) => {
    const sarr = s.split("");
    sarr.sort((a, b) => (a > b ? 1 : -1));
    return sarr;
  });

  const ss = findCommonChars(sortedA, sortedB);

  for (const char of ss) {
    if (sortedC.includes(char)) {
      return char;
    }
  }

  return "";
}

export async function two(path: string): Promise<number> {
  const [stream, f] = await lineStream(path);

  let sum = 0;
  let group: string[] = [];

  for await (const line of stream) {
    // Last line
    if (!line.length) {
      continue;
    }

    group.push(line);

    if (group.length < 3) {
      continue;
    }

    const s = findCommonChar(group);
    if (!s) {
      throw new Error(`Common character is not found in ${line}`);
    }

    sum += AlphebetScore[s];

    group = [];
  }

  f.close();

  return sum;
}
