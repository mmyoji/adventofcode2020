export async function fetchData(path: string): Promise<number[]> {
  const text = await Deno.readTextFile(path);

  return text
    .split("\n")[0]
    .split(",")
    .map((s) => parseInt(s, 10));
}
