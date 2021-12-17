export async function fetchData(path: string): Promise<number[][]> {
  const text = await Deno.readTextFile(path);
  return text
    .split("\n")
    .filter((line) => !!line.trim())
    .map((line) => line.split(""))
    .map((chars) => chars.map((s) => parseInt(s, 10)));
}
