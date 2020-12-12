type SeatValue = "L" | "." | "#";

interface SeatState {
  x: number;
  y: number;
  state: SeatValue;
}

function getSeatStates(rawSeats: string[]): SeatState[] {
  const seatStates: SeatState[] = [];
  for (let y = 0; y < rawSeats.length; y++) {
    const vSeats = rawSeats[y].split("");
    for (let x = 0; x < vSeats.length; x++) {
      const seatValue = vSeats[x];
      if (!["L", ".", "#"].find((v) => v === seatValue)) {
        throw new Error(`Invalid seat value is found: ${seatValue}`);
      }

      seatStates.push({
        x,
        y,
        state: vSeats[x] as SeatValue,
      });
    }
  }

  return seatStates;
}

function findSeat(
  x: number,
  y: number,
  seatStates: SeatState[]
): SeatState | undefined {
  if (x < 0 || y < 0) {
    return undefined;
  }

  return seatStates.find((s) => s.x === x && s.y === y);
}

function getNeighbourSeats(
  ss: SeatState,
  seatStates: SeatState[]
): SeatState[] {
  const [x, y] = [ss.x, ss.y];
  return [
    findSeat(x - 1, y - 1, seatStates),
    findSeat(x, y - 1, seatStates),
    findSeat(x + 1, y - 1, seatStates),
    findSeat(x - 1, y, seatStates),
    findSeat(x + 1, y, seatStates),
    findSeat(x - 1, y + 1, seatStates),
    findSeat(x, y + 1, seatStates),
    findSeat(x + 1, y + 1, seatStates),
  ].filter(Boolean) as SeatState[];
}

function stateChangeable(ss: SeatState, seatStates: SeatState[]): boolean {
  if (ss.state === ".") {
    return false;
  }

  const neighbourSeats = getNeighbourSeats(ss, seatStates);
  switch (ss.state) {
    case "L":
      if (neighbourSeats.filter((s) => s.state === "#").length === 0) {
        return true;
      }
      break;
    case "#":
      if (neighbourSeats.filter((s) => s.state === "#").length >= 4) {
        return true;
      }
      break;
    default:
      return false;
  }

  return false;
}

function countOccupiedSeats(seatStates: SeatState[]): number {
  return seatStates.filter((s) => s.state === "#").length;
}

export async function main() {
  const data = await Deno.readTextFile("day11/inputs.txt");
  const lines = data.split("\n");
  const rawSeats = lines.slice(0, lines.length - 1);

  let current = getSeatStates(rawSeats);

  let round = 1;
  while (true) {
    let changed = false;
    const nextSeatStates: SeatState[] = [];

    for (let i = 0; i < current.length; i++) {
      const ss = current[i];

      if (!stateChangeable(ss, current)) {
        nextSeatStates[i] = { ...ss };
        continue;
      }

      if (ss.state === "L") {
        nextSeatStates[i] = { ...ss, state: "#" };
      } else {
        nextSeatStates[i] = { ...ss, state: "L" };
      }
      changed = true;
    }

    if (!changed) {
      break;
    }

    current = [...nextSeatStates];

    console.log(
      `${round} round - # of occupied: ${countOccupiedSeats(current)}`
    );

    round++;
  }

  console.log(`answer: ${countOccupiedSeats(current)}`);
  // 2470 (after 88 round)
}

main();
