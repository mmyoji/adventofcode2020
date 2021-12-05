import type { Command } from "./input.ts";

interface Position {
  x: number; // horizontal position
  y: number; // depth
}

// forward X :: position.x += X
// down X    :: position.y += X
// up X      :: position.y -= X

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

export function run(commands: Command[]) {
  const pos: Position = { x: 0, y: 0 };

  for (const command of commands) {
    evalCommand(pos, command);
  }

  console.log({ answer: pos.x * pos.y });
  // 1882980
}
