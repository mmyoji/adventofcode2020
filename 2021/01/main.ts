const data = await Deno.readTextFile("./input.txt");
const depths = data
  .split("\n")
  .filter((s) => !!s)
  .map((s) => Number(s));

function partOne() {
  let increased = 0;
  let former = depths[0];
  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > former) {
      increased++;
    }
    former = depths[i];
  }

  console.log({ answer: increased });
  // 1696
}
// partOne();

function partTwo() {
  const sum = (prev: number, curr: number) => prev + curr;
  const end = 3;

  let former = 0;
  let current = depths.slice(0, end).reduce(sum);
  let increased = 0;

  for (let i = 1; i < depths.length; i++) {
    former = current;
    const items = depths.slice(i, i + end);
    if (items.length !== 3) {
      break;
    }
    current = items.reduce(sum);
    if (former < current) {
      increased++;
    }
  }

  console.log({ answer: increased });
  // 1737
}
partTwo();
