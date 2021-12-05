import type { Command } from "./input.ts";

interface Position {
  x: number; // horizontal position
  y: number; // depth
  aim: number;
}

// forward X :: position.x += X
//           :: position.y *= position.aim * X
// down X    :: position.aim += X
// up X      :: position.aim -= X

function evalCommand(pos: Position, command: Command): void {
  const { operation, value } = command;
  switch (operation) {
    case "forward": {
      pos.x += value;
      pos.y += pos.aim * value;
      break;
    }
    case "down": {
      pos.aim += value;
      break;
    }
    case "up": {
      pos.aim -= value;
      break;
    }
    default: {
      throw new Error(`Unexpected command: ${command}`);
    }
  }
}

export function run(commands: Command[]) {
  const pos: Position = { x: 0, y: 0, aim: 0 };

  for (const command of commands) {
    evalCommand(pos, command);
  }

  console.log({ answer: pos.x * pos.y });
  // 1971232560
}
