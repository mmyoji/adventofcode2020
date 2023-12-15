import { readLines } from "../utils.ts";

export const DAY = "15";

const strToASCII = (str: string): number => str.charCodeAt(0);

function hash(current: number, char: string): number {
  current += strToASCII(char);
  current *= 17;
  return (current %= 256);
}

export function calc(word: string, index: number, current: number): number {
  const char = word.at(index);
  if (!char) return current;

  return calc(word, ++index, hash(current, char));
}

export async function part1(path: string) {
  const lines = await readLines(path);
  const words = lines[0].split(",");
  return words.reduce((acc, word) => acc + calc(word, 0, 0), 0);
}

// { [box index]: { [chars]: <focal length> } }
type Boxes = Map<number, { key: string; focalLength: number }[]>;

function calc2(word: string, boxes: Boxes) {
  if (word.includes("=")) {
    const [chars, focalLength] = word.split("=");
    const boxIndex = calc(chars, 0, 0);
    const box = boxes.get(boxIndex);
    const item = { key: chars, focalLength: Number(focalLength) };
    if (box) {
      const i = box.findIndex(({ key }) => key === chars);
      if (i !== -1) {
        box.splice(i, 1, item);
      } else {
        box.push(item);
      }
    } else {
      boxes.set(boxIndex, [item]);
    }

    return;
  }

  const [chars] = word.split("-");
  const box = boxes.get(calc(chars, 0, 0));
  if (!box) return;

  const i = box.findIndex(({ key }) => key === chars);
  if (i === -1) return;

  box.splice(i, 1);
}

export async function part2(path: string) {
  const lines = await readLines(path);
  const words = lines[0].split(",");
  const boxes: Boxes = new Map();
  words.map((word) => calc2(word, boxes));

  let total = 0;
  for (const [boxIndex, items] of boxes.entries()) {
    for (let i = 0; i < items.length; i++) {
      total += (boxIndex + 1) * (i + 1) * items[i].focalLength;
    }
  }
  return total;
}

if (import.meta.main) {
  console.log(`Q1:`, await part1(`${DAY}/inputs.txt`));
  // answer: 502139

  console.log(`Q2:`, await part2(`${DAY}/inputs.txt`));
  // answer: 284132
}
