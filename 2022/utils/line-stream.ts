import { TextLineStream } from "std/streams/mod.ts";

export async function lineStream(
  path: string,
): Promise<[ReadableStream<string>, () => void]> {
  const f = await Deno.open(path, { read: true });

  const stream = f.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream());

  const close = () => {
    try {
      Deno.close(f.rid);
    } catch (_err) {
      // ignore
    }
  };

  return [stream, close];
}
