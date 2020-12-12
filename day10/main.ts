export async function main() {
  const data = await Deno.readTextFile("day10/inputs.txt");
  const numbers = data.split("\n").map((s) => parseInt(s, 10));

  const sorted = numbers.sort((a, b) => a - b);
  const validNums = sorted.slice(0, sorted.length - 1);
  const diffs: { [k: number]: number } = {};

  // Prepend first 0
  validNums.unshift(0);
  // my device
  validNums.push(validNums[validNums.length - 1] + 3);

  for (let i = 0; i < validNums.length - 1; i++) {
    const diff = validNums[i + 1] - validNums[i];
    if (diff in diffs) {
      diffs[diff] += 1;
    } else {
      diffs[diff] = 1;
    }
  }

  console.log(`all: ${JSON.stringify(diffs)}`);

  console.log(`# of 1 diffs: ${diffs[1]}`);
  console.log(`# of 3 diffs: ${diffs[3]}`);
  console.log(`# of 1 x # of 3: ${diffs[1] * diffs[3]}`);
  // 1876
}

main();
