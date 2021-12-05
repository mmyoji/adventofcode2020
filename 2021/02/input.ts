type Operation = "forward" | "down" | "up";
const operations = ["forward", "down", "up"];

export interface Command {
  operation: Operation;
  value: number;
}

function parseCommand(input: string): Command {
  if (!input) {
    throw new Error(`input must be present.`);
  }

  const [op, v] = input.split(" ");
  if (!operations.includes(op) || v == null) {
    throw new Error(`Unexpected line of input: ${input}`);
  }

  return {
    operation: op as Operation,
    value: Number(v),
  };
}

export async function fetchCommands(): Promise<Command[]> {
  const data = await Deno.readTextFile("./input.txt");
  return data
    .split("\n")
    .filter((s) => !!s)
    .map((s) => parseCommand(s));
}
