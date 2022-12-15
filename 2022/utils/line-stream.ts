import { iterateReader } from "std/streams/iterate_reader.ts";
import { readableStreamFromIterable } from "std/streams/readable_stream_from_iterable.ts";
import { TextLineStream } from "std/streams/text_line_stream.ts";

export async function lineStream(
  path: string
): Promise<[ReadableStream<string>, Deno.FsFile]> {
  const f = await Deno.open(path);

  const stream = readableStreamFromIterable(iterateReader(f))
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream());

  return [stream, f];
}
