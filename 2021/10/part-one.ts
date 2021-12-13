type OpenChunk = "(" | "[" | "{" | "<";
type CloseChunk = ")" | "]" | "}" | ">";

const OPEN_CHUNKS = ["(", "[", "{", "<"];
const CLOSE_CHUNKS = [")", "]", "}", ">"];

const CHUNKS: Record<OpenChunk, CloseChunk> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const POINTS: Record<CloseChunk, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

function isOpenChunk(s: string): s is OpenChunk {
  return !!s && OPEN_CHUNKS.includes(s);
}

function isCloseChunk(s: string): s is CloseChunk {
  return !!s && CLOSE_CHUNKS.includes(s);
}

function validate(chunk: CloseChunk, chunks: CloseChunk[]): boolean {
  const arr = [...chunks];
  const last = arr.pop();
  if (last == chunk) {
    chunks.pop();
    return true;
  }

  return false;
}

function findCorrupted(line: string): number {
  const chunks: CloseChunk[] = [];

  for (const char of line) {
    if (isOpenChunk(char)) {
      chunks.push(CHUNKS[char]);
      continue;
    }

    if (isCloseChunk(char)) {
      if (validate(char, chunks)) {
        continue;
      }

      return POINTS[char];
    }

    throw new Error(`Invalid char detected: ${char}`);
  }

  return 0;
}

export function run(data: string[]) {
  let total = 0;

  for (const line of data) {
    total += findCorrupted(line);
  }

  return total;
}
