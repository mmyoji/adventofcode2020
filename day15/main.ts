const INPUTS = "0,3,6"; // 436
// const INPUTS = "1,3,2"; // 1
// const INPUTS = "2,1,3"; // 10
// const INPUTS = '1,2,3'; // 27
// const INPUTS = '2,3,1'; // 78
// const INPUTS = '3,2,1'; // 438
// const INPUTS = '3,1,2'; // 1836
// const INPUTS = '0,8,15,2,12,1,4';

type Memo = {
  [key: number]: number[];
};

function updateMemo(memo: Memo, key: number, current: number) {
  if (key in memo) {
    memo[key].push(current);
  } else {
    memo[key] = [current];
  }

  const values = memo[key];
  if (values.length > 2) {
    memo[key] = [values[values.length - 2], values[values.length - 1]];
  }
}

// Main

export async function main() {
  const inputs = INPUTS.split(",").map((n) => Number(n));

  const memo: Memo = {};
  let current = 1;

  // Initialize w/ inputs
  for (const n of inputs) {
    updateMemo(memo, n, current);
    current++;
  }

  let lastCalled: number = inputs[inputs.length - 1];
  while (current < 2021) {
    const _lastCalled = lastCalled;
    const lastIndices = memo[lastCalled];

    if (lastIndices.length > 1) {
      lastCalled = lastIndices[1] - lastIndices[0];
      updateMemo(memo, lastCalled, current);
    } else {
      lastCalled = 0;
      updateMemo(memo, _lastCalled, current);
      updateMemo(memo, lastCalled, current);
    }
    // console.log(`Turn ${current}: ${lastCalled}`);
    current++;
  }

  console.log(`answer: ${lastCalled}`);
}

main();
