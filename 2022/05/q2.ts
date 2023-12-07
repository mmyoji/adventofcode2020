import { readLines } from "utils/read-lines.ts";

function parseMove(line: string) {
  const [, size, , from, , to] = line.split(" ");
  return { size: Number(size), from: Number(from) - 1, to: Number(to) - 1 };
}

export async function q2(path: string) {
  const lines = await readLines(path);

  const stacks: string[][] = [];

  const stackSize = (lines[0].length + 1) / 4;
  for (let i = 0; i < stackSize; i++) {
    stacks.push([]);
  }

  let current = "stacks";
  for (const line of lines) {
    if (!line.trim()) continue;

    if (line.startsWith(" 1 ")) {
      current = "moves";
      for (const stack of stacks) {
        stack.reverse();
      }
      continue;
    }

    if (current === "stacks") {
      for (let i = 0; i < line.length; i += 4) {
        const str = line.slice(i, i + 3);
        if (!str.trim()) continue;

        stacks[i === 0 ? 0 : i / 4].push(str[1]);
      }
    }

    if (current === "moves") {
      const { size, from, to } = parseMove(line);
      const tmp = [];
      for (let i = size; i > 0; i--) {
        const crate = stacks[from].pop();
        if (crate != null) {
          tmp.push(crate);
        }
      }

      tmp.reverse();
      for (const crate of tmp) {
        stacks[to].push(crate);
      }
    }
  }

  return stacks.map((s) => s.at(-1)).join("");
}
