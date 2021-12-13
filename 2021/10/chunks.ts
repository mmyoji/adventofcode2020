type OpenChunk = "(" | "[" | "{" | "<";
export type CloseChunk = ")" | "]" | "}" | ">";

const OPEN_CHUNKS = ["(", "[", "{", "<"];
const CLOSE_CHUNKS = [")", "]", "}", ">"];

export const CHUNKS: Record<OpenChunk, CloseChunk> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

export function isOpenChunk(s: string): s is OpenChunk {
  return !!s && OPEN_CHUNKS.includes(s);
}

export function isCloseChunk(s: string): s is CloseChunk {
  return !!s && CLOSE_CHUNKS.includes(s);
}

export function validate(chunk: CloseChunk, chunks: CloseChunk[]): boolean {
  const arr = [...chunks];
  const last = arr.pop();
  if (last == chunk) {
    chunks.pop();
    return true;
  }

  return false;
}
