export function run(data: number[]) {
  const min = Math.min(...data);
  const max = Math.max(...data);

  let m: number = 0;
  let minFuels = Number.MAX_SAFE_INTEGER;
  for (let i = min; i <= max; i++) {
    let fuelds = 0;
    for (const n of data) {
      const add = Math.abs(n - i);
      fuelds += add;
    }

    if (minFuels > fuelds) {
      minFuels = fuelds;
      m = i;
    }
  }

  return [m, minFuels];
  // [343, 340987]
}
