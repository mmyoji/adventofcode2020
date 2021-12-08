import { Line } from "./line.ts";

export async function fetchData(path: string): Promise<Line[]> {
  const text = await Deno.readTextFile(path);

  return text
    .split("\n")
    .filter((s) => s.includes("|"))
    .map((l) => new Line(l));
}
