/// <reference no-default-lib="true" />
/// <reference lib="deno.worker" />

type PlantMap = {
  dest0: number;
  src0: number;
  range: number;
};

function getMappedValue(target: number, maps: PlantMap[]): number | undefined {
  for (const map of maps) {
    const src = map.src0;
    if (target < src || src + map.range < target) {
      continue;
    }

    const diff = target - src;
    return map.dest0 + diff;
  }

  return undefined;
}

self.onmessage = (e) => {
  const { start, length, plantMaps } = e.data as {
    start: number;
    length: number;
    plantMaps: PlantMap[][];
  };

  let min = Number.MAX_SAFE_INTEGER;
  for (let seed = start; seed < start + length; seed++) {
    let next = seed;
    for (const maps of plantMaps) {
      next = getMappedValue(next, maps) ?? next;
    }
    if (next < min) {
      min = next;
    }
  }

  postMessage(min);

  self.close();
};
