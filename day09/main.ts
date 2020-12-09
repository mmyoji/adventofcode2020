const LENGTH = 25;

export async function main() {
  const data = await Deno.readTextFile("day09/inputs.txt");
  const numbers = data.split("\n").map((s) => parseInt(s, 10));

  for (let i = 0; i < numbers.length; i++) {
    const targets = numbers.slice(i, i + LENGTH);
    const sum = numbers[i + LENGTH];
    if (pairMatches(targets)(sum)) {
      continue;
    }

    console.log(`answer: ${sum}`);
    // 257342611
    break;
  }
}

function pairMatches(numbers: number[]): (sum: number) => boolean {
  return (sum) => {
    for (let i = 0; i < numbers.length; i++) {
      if (!numbers[i + 1]) {
        break;
      }

      if (numbers[i] >= sum) {
        continue;
      }

      if (
        numbers.slice(i + 1, numbers.length).find((n) => sum === n + numbers[i])
      ) {
        return true;
      }
    }

    return false;
  };
}

main().catch(console.error);
