import type { FetchDataValue, Coordinate } from "./input.ts";

/**
 *
 * xxxxxxx
 * xxxxxxx
 * xxxxxxx 2
 * xxxxxxx
 * xxxxxxx
 *
 * maxY = 4
 *
 * fold along y=2 (middle)
 * (0, 0) -> (0, 0)
 * (0, 1) -> (0, 1)
 * (0, 2) -> None
 * (0, 3) -> (0, 1)
 * (0, 4) -> (0, 0)
 *
 * Math.floor(lineHeight / 2) >= 2
 *
 * fold along y=1
 * (0, 0) -> (0, 2)
 * (0, 1) -> None
 * (0, 2) -> (0, 2)
 * (0, 3) -> (0, 1)
 * (0, 4) -> (0, 0)
 *
 * fold along y=3
 * (0, 0) -> (0, 0)
 * (0, 1) -> (0, 1)
 * (0, 2) -> (0, 2)
 * (0, 3) -> None
 * (0, 4) -> (0, 2)
 */

export function run({ coordinates, folds, max }: FetchDataValue) {
  const { direction, value } = folds[0];

  const newCoordinates: Coordinate[] = [];
  for (const [x, y] of coordinates) {
    if (direction === "x") {
      if (x === value) {
        continue;
      }

      if (x < value) {
        newCoordinates.push([x, y]);
        continue;
      }

      // if (x > value)
      newCoordinates.push([x - value + 1, y]);
    }

    if (direction === "y") {
      if (y === value) {
        continue;
      }

      if (y < value) {
        newCoordinates.push([x, y]);
        continue;
      }

      // if (y > value)
      newCoordinates.push([x, y - value + 1]);
    }
  }

  const set = new Set<string>();
  for (const c of newCoordinates) {
    set.add(c.toString());
  }

  return set.size;
}
