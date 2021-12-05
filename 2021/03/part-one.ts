function getGammaRateBinary(data: string[]): string {
  const length = data[0].length;
  const result: string[] = [];
  for (let i = 0; i < length; i++) {
    let zeroCount = 0;
    let oneCount = 0;
    for (const b of data) {
      if (b[i] === "1") {
        oneCount++;
      } else {
        zeroCount++;
      }
    }

    if (oneCount > zeroCount) {
      result.push("1");
    } else {
      result.push("0");
    }
  }

  return result.join("");
}

function getEpsilonRate(gamma: string): number {
  const length = gamma.length;
  let base: string = "";
  for (let i = 0; i < length; i++) {
    base += "1";
  }

  return parseInt(gamma, 2) ^ parseInt(base, 2);
}

function run(data: string[]) {
  const gmBin = getGammaRateBinary(data);
  const ep = getEpsilonRate(gmBin);
  const result = {
    gammaRate: parseInt(gmBin, 2),
    epsilonRate: ep,
  };

  return {
    ...result,
    powerConsumption: result.gammaRate * result.epsilonRate,
  };
  // { gammaRate: 3903, epsilonRate: 192, powerConsumption: 749376 }
}
