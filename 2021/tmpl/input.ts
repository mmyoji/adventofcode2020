export async function fetchData() {
  const text = await Deno.readTextFile("./sample.txt");
  // const text = await Deno.readTextFile("./input.txt");

  // TODO: impl
  return text.split("\n");
}
