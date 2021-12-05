interface Position {
  x: number; // horizontal position
  y: number; // depth
}

// forward X :: position.x += X
// down X    :: position.y += X
// up X      :: position.y -= X

type Operation = "forward" | "down" | "up";
const operations = ["forward", "down", "up"];

interface Command {
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

const data = await Deno.readTextFile("./input.txt");
const commands = data
  .split("\n")
  .filter((s) => !!s)
  .map((s) => parseCommand(s));

function evalCommand(pos: Position, command: Command): void {
  const { operation, value } = command;
  switch (operation) {
    case "forward": {
      pos.x += value;
      break;
    }
    case "down": {
      pos.y += value;
      break;
    }
    case "up": {
      pos.y -= value;
      break;
    }
    default: {
      throw new Error(`Unexpected command: ${command}`);
    }
  }
}

function partOne() {
  const pos: Position = { x: 0, y: 0 };

  for (const command of commands) {
    evalCommand(pos, command);
  }

  console.log({ answer: pos.x * pos.y });
  // 1882980
}
partOne();
