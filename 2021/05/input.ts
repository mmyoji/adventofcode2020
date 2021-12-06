export interface Vent {
  x1: number;
  y1: number;

  x2: number;
  y2: number;
}

export async function fetchData(): Promise<Vent[]> {
  // const text = await Deno.readTextFile("./sample.txt");
  const text = await Deno.readTextFile("./input.txt");

  const lines = text.split("\n");
  const vents: Vent[] = [];

  for (const line of lines) {
    if (!line) continue;
    const [before, after] = line.split(" -> ");
    const [x1, y1] = before.split(",").map((s) => parseInt(s, 10));
    const [x2, y2] = after.split(",").map((s) => parseInt(s, 10));
    vents.push({ x1, y1, x2, y2 });
  }

  return vents;
}
