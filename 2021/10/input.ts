export async function fetchData(path: string) {
  const text = await Deno.readTextFile(path);

  return text.split("\n");
}
