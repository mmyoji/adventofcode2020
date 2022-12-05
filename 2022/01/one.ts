import { iterateReader } from "https://deno.land/std@0.167.0/streams/iterate_reader.ts";
import { readableStreamFromIterable } from "https://deno.land/std@0.167.0/streams/readable_stream_from_iterable.ts";
import { TextLineStream } from "https://deno.land/std@0.167.0/streams/text_line_stream.ts";

export async function getMax(path: string): Promise<number> {
  let max = -1;

  const f = await Deno.open(path);
  const rstream = readableStreamFromIterable(iterateReader(f))
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream());

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
