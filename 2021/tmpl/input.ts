export async function fetchData(path: string) {
  const text = await Deno.readTextFile(path);

  // TODO: impl
  return text.split("\n");
}
