export async function fetchData(): Promise<number[]> {
  const data = await Deno.readTextFile("./input.txt");
  return data
    .split("\n")
    .filter((s) => !!s)
    .map((s) => Number(s));
}
