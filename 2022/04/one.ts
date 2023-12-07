import { lineStream } from "utils/line-stream.ts";

export function contains(first: number[], second: number[]): boolean {
  if (first[0] === second[0] || first[1] === second[1]) {
    return true;
  }

  if (first[0] < second[0]) {
    return first[1] >= second[1];
  }

  return second[1] >= first[1];
}

export async function one(path: string): Promise<number> {
  const [stream, close] = await lineStream(path);

  let sum = 0;

  for await (const line of stream) {
    if (!line.length) {
      continue;
    }

    const [first, second] = line
      .split(",")
      .map((str) => str.split("-").map((s) => Number(s)));
    if (contains(first, second)) {
      sum++;
    }
  }

  close();

  return sum;
}
