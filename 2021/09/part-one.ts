export function run(data: number[][]): number {
  const lowPoints: number[] = [];

  for (let y = 0; y < data.length; y++) {
    const line = data[y];
    for (let x = 0; x < line.length; x++) {
      const current = line[x];
      const aroundPoints = [
        data[y - 1]?.[x],
        data[y + 1]?.[x],
        line[x - 1],
        line[x + 1],
      ].filter((s) => s != null);
      if (aroundPoints.every((p) => p > current)) {
        lowPoints.push(current);
      }
    }
  }

  // console.log("lowPoints", lowPoints);

  return lowPoints.map((n) => n + 1).reduce((p, c) => p + c);
}
