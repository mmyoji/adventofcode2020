import { lineStream } from "utils/line-stream.ts";

export async function getSumOfTop3(path: string): Promise<number> {
  let first = -1;
  let second = -1;
  let third = -1;

  const [rstream, f] = await lineStream(path);

  let tmp = 0;
  for await (const rawLine of rstream) {
    const line = rawLine.trim();
    if (line === "") {
      if (tmp > first) {
        third = second;
        second = first;
        first = tmp;
      } else if (tmp > second) {
        third = second;
        second = tmp;
      } else if (tmp > third) {
        third = tmp;
      }

      tmp = 0;
      continue;
    }

    const n = Number(line);
    tmp += n;
  }

  f.close();

  return first + second + third;
}
