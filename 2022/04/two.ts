import { lineStream } from "../utils/line-stream.ts";
import { contains } from "./one.ts";

function overwrapped(first: number[], second: number[]): boolean {
  if (contains(first, second)) return true;

  if (first[0] === second[1] || first[1] === second[0]) {
    return true;
  }

  if (first[0] < second[0]) {
    return first[1] >= second[0];
  }

  return second[1] >= first[0];
}

export async function two(path: string): Promise<number> {
  const [stream, f] = await lineStream(path);

  let sum = 0;

  for await (const line of stream) {
    if (!line.length) {
      continue;
    }

    const [first, second] = line
      .split(",")
      .map((str) => str.split("-").map((s) => Number(s)));
    if (overwrapped(first, second)) {
      sum++;
    }
  }

  f.close();

  return sum;
}
