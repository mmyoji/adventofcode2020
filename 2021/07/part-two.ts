// distance, amount
// 1       , 1
// 2       , 1 + 2 = 3
// 3       , 1 + 2 + 3 = 6

function fuelize(n: number): number {
  if (n < 0) throw new Error("invalid number");

  if (n === 0) return 0;

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

export function run(data: number[]) {
  const min = Math.min(...data);
  const max = Math.max(...data);

  let m: number = 0;
  let minFuels = Number.MAX_SAFE_INTEGER;
  for (let i = min; i <= max; i++) {
    let fuelds = 0;
    for (const n of data) {
      const add = fuelize(Math.abs(n - i));
      fuelds += add;
    }

    if (minFuels > fuelds) {
      minFuels = fuelds;
      m = i;
    }
  }

  return [m, minFuels];
  // [478, 96987874]
}
