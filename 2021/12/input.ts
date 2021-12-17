export async function fetchData(path: string): Promise<string[][]> {
  const text = await Deno.readTextFile(path);
  return text
    .split("\n")
    .filter((s) => !!s.trim())
    .map((line) => line.split("-"));
}
