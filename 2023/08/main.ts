import { readLines } from "../utils.ts";
import { findLCMs } from "./math.ts";

function parseInstructions(line: string) {
  return line.split("").filter(Boolean);
}

function parseDirections(str: string) {
  const [left, right] = str.split(", ");
  return [left.slice(1, left.length), right.slice(0, right.length - 1)];
}

export async function question1(path: string) {
  const lines = await readLines(path);

  const instructions = parseInstructions(lines[0]);

  const nodes = new Map<string, string[]>();
  for (const line of lines.slice(2, lines.length)) {
    const [key, directions] = line.split(" = ");
    nodes.set(key, parseDirections(directions));
  }

  let steps = 0;
  let i = 0;
  let current = "AAA";
  while (current !== "ZZZ") {
    const directions = nodes.get(current);
    if (!directions) throw new Error(`Invalid key: ${current}`);

    const [left, right] = directions;
    if (i > instructions.length - 1) {
      i = 0;
    }
    current = instructions[i] === "L" ? left : right;
    steps++;
    i++;
  }

  return steps;
}

function findSteps(
  current: string,
  instructions: string[],
  nodes: Map<string, string[]>,
): Promise<number> {
  return new Promise((resolve) => {
    const worker = new Worker(
      new URL("./find-steps.ts", import.meta.url).href,
      { type: "module" },
    );
    worker.postMessage({ current, instructions, nodes });
    worker.onmessage = (e) => {
      resolve(e.data as number);
    };
  });
}

export async function question2(path: string) {
  const lines = await readLines(path);

  const instructions = parseInstructions(lines[0]);

  const startKeys: string[] = [];
  const nodes = new Map<string, string[]>();
  for (const line of lines.slice(2, lines.length)) {
    const [key, directions] = line.split(" = ");
    if (key.endsWith("A")) {
      startKeys.push(key);
    }
    nodes.set(key, parseDirections(directions));
  }

  const allSteps = await Promise.all(
    startKeys.map((key) => findSteps(key, instructions, nodes)),
  );

  return findLCMs(allSteps);
}

if (import.meta.main) {
  console.log(`Q1:`, await question1("08/inputs.txt"));
  // answer: 22199

  console.log(`Q2:`, await question2("08/inputs.txt"));
  // answer: 13334102464297
}
