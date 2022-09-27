export type Coordinate = number[];

type FoldDirection = "x" | "y";

export interface Fold {
  direction: FoldDirection;
  value: number;
}

interface Max {
  x: number;
  y: number;
}

export interface FetchDataValue {
  coordinates: Coordinate[];
  folds: Fold[];
  max: Max;
}

function isFoldDirection(value: string): value is FoldDirection {
  return !!value.trim() && ["x", "y"].includes(value);
}

export async function fetchData(path: string): Promise<FetchDataValue> {
  const text = await Deno.readTextFile(path);

  let maxX = 0;
  let maxY = 0;
  const coordinates: Coordinate[] = [];
  const folds: Fold[] = [];
  const lines = text.split("\n").filter((l) => !!l.trim());
  for (const line of lines) {
    if (line.startsWith("fold")) {
      const [_, instruction] = line.split(" along ");
      const [direction, value] = instruction.split("=");
      if (!isFoldDirection(direction)) {
        throw new Error(`Unexpected direction: ${direction}`);
      }

      folds.push({ direction, value: parseInt(value, 10) });
      continue;
    }

    const [x, y] = line.split(",").map((s) => parseInt(s, 10));
    if (x > maxX) {
      maxX = x;
    }

    if (y > maxY) {
      maxY = y;
    }
    coordinates.push([x, y]);
  }

  return {
    coordinates,
    folds,
    max: { x: maxX, y: maxY },
  };
}
