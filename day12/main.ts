// Interfaces and Types

interface CurrentPosition {
  east: number;
  north: number;
  direction: Direction;
}

type Direction = "N" | "S" | "E" | "W";

type Degree = 90 | 180 | 270;

type Forward = {
  steps: number;
};

type Turning = {
  to: "L" | "R";
  degree: Degree;
};

type Move = {
  direction: Direction;
  steps: number;
};

type Operation = Forward | Turning | Move;

type TurningMapType = {
  [direction in Direction]: {
    [degree in Degree]: Direction;
  };
};

// Constants
const LEFT_MAP: TurningMapType = {
  N: {
    90: "W",
    180: "S",
    270: "E",
  },
  S: {
    90: "E",
    180: "N",
    270: "W",
  },
  E: {
    90: "N",
    180: "W",
    270: "S",
  },
  W: {
    90: "S",
    180: "E",
    270: "N",
  },
};

const RIGHT_MAP: TurningMapType = {
  N: {
    90: "E",
    180: "S",
    270: "W",
  },
  S: {
    90: "W",
    180: "N",
    270: "E",
  },
  E: {
    90: "S",
    180: "W",
    270: "N",
  },
  W: {
    90: "N",
    180: "E",
    270: "S",
  },
};

// Functions

function run(cur: CurrentPosition, op: Operation): CurrentPosition {
  if (isForward(op)) {
    return forward(cur, op);
  }

  if (isTurning(op)) {
    return turn(cur, op);
  }

  if (isMove(op)) {
    return move(cur, op);
  }

  throw new Error(`Unexpected operation: ${op}`);
}

function parseOperataion(line: string): Operation {
  const s = line[0];
  const steps = parseInt(line.slice(1, line.length), 10);

  if (["N", "S", "E", "W"].find((d) => d === s)) {
    return { direction: s as Direction, steps };
  }

  if (["L", "R"].find((d) => d === s)) {
    return { to: s as "L" | "R", degree: steps as Degree };
  }

  return { steps };
}

function move(cur: CurrentPosition, op: Move): CurrentPosition {
  switch (op.direction) {
    case "N":
      return { ...cur, north: cur.north + op.steps };
    case "S":
      return { ...cur, north: cur.north - op.steps };
    case "E":
      return { ...cur, east: cur.east + op.steps };
    case "W":
      return { ...cur, east: cur.east - op.steps };
    default:
      throw new Error(`Unexpected op.direction: ${op.direction}`);
  }
}

function turn(cur: CurrentPosition, op: Turning): CurrentPosition {
  switch (op.to) {
    case "L":
      return { ...cur, direction: LEFT_MAP[cur.direction][op.degree] };
    case "R":
      return { ...cur, direction: RIGHT_MAP[cur.direction][op.degree] };
    default:
      throw new Error(`Unexpected op.to=${op.to}`);
  }
}

function forward(cur: CurrentPosition, op: Forward): CurrentPosition {
  switch (cur.direction) {
    case "N":
      return { ...cur, north: cur.north + op.steps };
    case "S":
      return { ...cur, north: cur.north - op.steps };
    case "E":
      return { ...cur, east: cur.east + op.steps };
    case "W":
      return { ...cur, east: cur.east - op.steps };
    default:
      throw new Error(`cur has wrong direction: ${cur.direction}`);
  }
}

function isForward(op: Operation): op is Forward {
  return "steps" in op && !("direction" in op);
}

function isTurning(op: Operation): op is Turning {
  return "to" in op && "degree" in op;
}

function isMove(op: Operation): op is Move {
  return "direction" in op && "steps" in op;
}

// Main

export async function main() {
  const data = await Deno.readTextFile("day12/inputs.txt");
  const rawLines = data.split("\n");
  const lines = rawLines.slice(0, rawLines.length - 1);

  let cur: CurrentPosition = { east: 0, north: 0, direction: "E" };
  for (const line of lines) {
    const op = parseOperataion(line);
    console.log(`op=${JSON.stringify(op)}`);

    cur = run(cur, op);
    console.log(`cur=${JSON.stringify(cur)}`);
  }

  console.log(`answer: ${Math.abs(cur.east) + Math.abs(cur.north)}`);
  // 1482
}

main();
