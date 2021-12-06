export function run(depths: number[]) {
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
