import { lineStream } from "../utils/line-stream.ts";

export async function getMax(path: string): Promise<number> {
  let max = -1;

  const [rstream, f] = await lineStream(path);

  let tmp = 0;
  for await (const rawLine of rstream) {
    const line = rawLine.trim();
    if (line === "") {
      if (tmp > max) {
        max = tmp;
      }
      tmp = 0;
      continue;
    }

    const n = Number(line);
    tmp += n;
  }

  f.close();

  return max;
}
