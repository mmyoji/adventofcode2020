/// <reference no-default-lib="true" />
/// <reference lib="deno.worker" />

self.onmessage = (e) => {
  const { current: _current, instructions, nodes } = e.data as {
    current: string;
    instructions: string[];
    nodes: Map<string, string[]>;
  };

  let steps = 0;
  let i = 0;
  let current = _current;
  while (!current.endsWith("Z")) {
    if (i > instructions.length - 1) {
      i = 0;
    }

    const directions = nodes.get(current);
    if (!directions) throw new Error(`Invalid key: ${current}`);

    const [left, right] = directions;
    current = instructions[i] === "L" ? left : right;
    steps++;
    i++;
  }

  self.postMessage(steps);
  self.close();
};
