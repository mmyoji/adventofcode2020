// Can't solve by myself :(
// ref: https://www.reddit.com/r/adventofcode/comments/rehj2r/comment/hol30st/
// ref: https://www.reddit.com/r/adventofcode/comments/rehj2r/comment/hok4qy4/

function isLowerCase(value: string) {
  return value === value.toLowerCase();
}

type PathMap = Record<string, string[]>;
type CurPath = Record<string, number>;

function findPaths(
  map: PathMap,
  start: string,
  end: string,
  paths: CurPath[] = [],
  curPath: CurPath = {}
): CurPath[] {
  curPath[start] = curPath[start] + 1 || 1;
  if (isLowerCase(start) && curPath[start] === 2) {
    curPath["smallCaveVistedTwice"] = 1;
  }

  if (start === end) {
    paths.push(curPath);
    return paths;
  }

  if (!map[start]) {
    throw new Error(`Invalid start path: ${start}`);
  }

  for (const x of map[start]) {
    if (isLowerCase(x) && x in curPath) {
      if (["start", "end"].includes(x) || curPath["smallCaveVistedTwice"]) {
        continue;
      }
    }

    findPaths(map, x, end, paths, { ...curPath });
  }

  return paths;
}

export function run(data: string[][]) {
  const map: PathMap = {};
  for (const [a, b] of data) {
    map[a] ? map[a].push(b) : (map[a] = [b]);
    map[b] ? map[b].push(a) : (map[b] = [a]);
  }

  const paths = findPaths(map, "start", "end");
  return paths.length;
}
