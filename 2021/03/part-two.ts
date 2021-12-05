// TODO: This is inefficient. Find a much better solution.

function getOxGenRate(data: string[]): number {
  const length = data[0].length;

  let current = [...data];

  for (let i = 0; i < length; i++) {
    const oneArr: string[] = [];
    const zeroArr: string[] = [];

    for (const line of current) {
      if (line[i] === "1") {
        oneArr.push(line);
      } else {
        zeroArr.push(line);
      }
    }

    if (oneArr.length >= zeroArr.length) {
      current = [...oneArr];
    } else {
      current = [...zeroArr];
    }

    if (current.length === 1) {
      console.log(current[0]);
      break;
    }
  }

  return parseInt(current[0], 2);
}

function getCO2ScrubRate(data: string[]): number {
  const length = data[0].length;

  let current = [...data];

  for (let i = 0; i < length; i++) {
    const oneArr: string[] = [];
    const zeroArr: string[] = [];

    for (const line of current) {
      if (line[i] === "1") {
        oneArr.push(line);
      } else {
        zeroArr.push(line);
      }
    }

    if (oneArr.length < zeroArr.length) {
      current = [...oneArr];
    } else {
      current = [...zeroArr];
    }

    if (current.length === 1) {
      console.log(current[0]);
      break;
    }
  }

  return parseInt(current[0], 2);
}

export function run(data: string[]): void {
  const oxGenRate = getOxGenRate(data);
  const co2ScrubRate = getCO2ScrubRate(data);

  console.log({
    oxGenRate,
    co2ScrubRate,
    lifeSupportingRate: oxGenRate * co2ScrubRate,
  });
  // { oxGenRate: 3871, co2ScrubRate: 613, lifeSupportingRate: 2372923 }
}
