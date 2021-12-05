export async function fetchData(): Promise<string[]> {
  const txt = await Deno.readTextFile("./input.txt");
  return txt.split("\n").filter((s) => !!s);
}
