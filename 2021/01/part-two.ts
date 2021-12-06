export function run(depths: number[]) {
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
