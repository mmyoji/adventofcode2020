export type Fishes = number[];

export async function fetchData(): Promise<Fishes> {
  // const text = await Deno.readTextFile("./sample.txt");
  const text = await Deno.readTextFile("./input.txt");
  const lines = text.split("\n");
  return lines[0].split(",").map((s) => parseInt(s, 10));
}
