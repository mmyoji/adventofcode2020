import { iterateReader } from "https://deno.land/std@0.167.0/streams/iterate_reader.ts";
import { readableStreamFromIterable } from "https://deno.land/std@0.167.0/streams/readable_stream_from_iterable.ts";
import { TextLineStream } from "https://deno.land/std@0.167.0/streams/text_line_stream.ts";

export async function getSumOfTop3(path: string): Promise<number> {
  let first = -1;
  let second = -1;
  let third = -1;

  const f = await Deno.open(path);
  const rstream = readableStreamFromIterable(iterateReader(f))
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream());

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
