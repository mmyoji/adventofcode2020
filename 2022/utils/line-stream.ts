import { iterateReader } from "https://deno.land/std@0.167.0/streams/iterate_reader.ts";
import { readableStreamFromIterable } from "https://deno.land/std@0.167.0/streams/readable_stream_from_iterable.ts";
import { TextLineStream } from "https://deno.land/std@0.167.0/streams/text_line_stream.ts";

export async function lineStream(
  path: string
): Promise<[ReadableStream<string>, Deno.FsFile]> {
  const f = await Deno.open(path);

  const stream = readableStreamFromIterable(iterateReader(f))
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream());

  return [stream, f];
}
