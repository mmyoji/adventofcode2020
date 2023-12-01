export async function readFile(path: string): Promise<string> {
  return await Deno.readTextFile(path);
}

export async function readLines(path: string): Promise<string[]> {
  const text = await readFile(path);
  const lines = text.split("\n");
  return lines.slice(0, lines.length - 1);
}
