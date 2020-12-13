// Interfaces

// Constants

// Functions

function getAnswer(time: number, busIds: number[]): number {
  let currentTime = time;
  let targetBusId: number = 0;
  while (true) {
    for (const busId of busIds) {
      if (currentTime % busId === 0) {
        targetBusId = busId;
        break;
      }
    }

    if (targetBusId) {
      break;
    }
    currentTime++;
  }

  return (currentTime - time) * targetBusId;
}

// Main

export async function main() {
  const data = await Deno.readTextFile("day13/inputs.txt");
  const rawLines = data.split("\n");

  const time = parseInt(rawLines[0], 10);
  const busIds = rawLines[1]
    .split(",")
    .filter((s) => s !== "x")
    .map((s) => parseInt(s, 10))
    .sort((a, b) => a - b);

  console.log(`answer: ${getAnswer(time, busIds)}`);
  // 4207
}

main();
