import { readLines } from "../utils.ts";

type PlantMap = {
  dest0: number;
  src0: number;
  range: number;
};

function parsePlantMap(line: string): PlantMap {
  const [dest0, src0, range] = line.split(" ").map(Number);
  return { dest0, src0, range };
}

function initPlantMaps(): PlantMap[][] {
  return [
    [], // soils
    [], // fertilizers
    [], // waters
    [], // lights
    [], // temperatures
    [], // humidities
    [], // locations
  ];
}

function getMapPosition(line: string): number | undefined {
  switch (true) {
    case line.startsWith("seed-to-"): {
      return 0;
    }
    case (line.startsWith("soil-to-")): {
      return 1;
    }
    case (line.startsWith("fertilizer-to-")): {
      return 2;
    }
    case (line.startsWith("water-to-")): {
      return 3;
    }
    case (line.startsWith("light-to-")): {
      return 4;
    }
    case (line.startsWith("temperature-to-")): {
      return 5;
    }
    case (line.startsWith("humidity-to-")): {
      return 6;
    }
    default: {
      return;
    }
  }
}

function getMappedValue(target: number, maps: PlantMap[]): number | undefined {
  for (const map of maps) {
    let src = map.src0;
    if (target < src || src + map.range < target) {
      continue;
    }

    let dest = map.dest0;
    for (let i = 0; i < map.range; i++) {
      if (target === src) {
        return dest;
      }

      src++;
      dest++;
    }
  }

  return undefined;
}

export async function question1(path: string) {
  const lines = await readLines(path);

  const seeds: number[] = [];
  const plantMaps = initPlantMaps();

  let current = -1;

  for (const line of lines) {
    if (line.startsWith("seeds:")) {
      const [_, rest] = line.split("seeds: ");
      seeds.push(...rest.split(" ").map(Number));
      continue;
    }

    const v = getMapPosition(line);
    if (typeof v === "number") {
      current = v;
      continue;
    }

    if (line.trim() === "") continue;

    if (current < 0) continue;

    plantMaps[current].push(parsePlantMap(line));
  }

  let min = Number.MAX_SAFE_INTEGER;
  for (const seed of seeds) {
    let next = seed;
    for (const maps of plantMaps) {
      next = getMappedValue(next, maps) ?? next;
    }
    if (next < min) {
      min = next;
    }
  }

  return min;
}

function parseSeeds(ns: number[]): number[][] {
  const ret: number[][] = [];

  let child: number[] = [];

  for (let i = 0; i < ns.length; i++) {
    if (i % 2 === 0) {
      child.push(ns[i]);
    } else {
      child.push(ns[i]);
      ret.push([...child]);
      child = [];
    }
  }

  return ret;
}

// TODO: Optimize this. Change algorithms, use workers, etc.
export async function question2(path: string) {
  const lines = await readLines(path);

  const seeds: number[][] = [];
  const plantMaps = initPlantMaps();

  let current = -1;

  for (const line of lines) {
    if (line.startsWith("seeds:")) {
      const [_, rest] = line.split("seeds: ");
      seeds.push(...parseSeeds(rest.split(" ").map(Number)));
      continue;
    }

    const v = getMapPosition(line);
    if (typeof v === "number") {
      current = v;
      continue;
    }

    if (line.trim() === "") continue;

    if (current < 0) continue;

    plantMaps[current].push(parsePlantMap(line));
  }

  let min = Number.MAX_SAFE_INTEGER;
  for (const [start, range] of seeds) {
    for (let seed = start; seed < start + range; seed++) {
      let next = seed;
      for (const maps of plantMaps) {
        next = getMappedValue(next, maps) ?? next;
      }
      if (next < min) {
        min = next;
      }
    }
  }

  return min;
}

if (import.meta.main) {
  // console.log(`Q1:`, await question1("05/inputs.txt"));
  // // answer: 551761867

  // FIXME: This takes too much time.
  console.log(`Q2:`, await question2("05/inputs.txt"));
  // answer:
}
