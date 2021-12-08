export type Pattern = string;
export type Output = string;

export class Line {
  patterns: Pattern[];
  outputs: Output[];

  constructor(line: string) {
    const [patterns, outputs] = line.split(" | ");

    this.patterns = this.#buildPatterns(patterns);
    this.outputs = this.#buildOutputs(outputs);
  }

  #buildPatterns(str: string): Pattern[] {
    const patterns = str.split(" ");

    if (patterns.length !== 10) {
      throw new Error(`Patterns must be 10 but ${patterns.length}`);
    }

    return patterns;
  }

  #buildOutputs(str: string): Output[] {
    const outputs = str.split(" ");

    if (outputs.length !== 4) {
      throw new Error(`Outputs must be 4 but ${outputs.length}`);
    }

    return outputs;
  }
}

export async function fetchData(path: string): Promise<Line[]> {
  const text = await Deno.readTextFile(path);

  return text
    .split("\n")
    .filter((s) => s.includes("|"))
    .map((l) => new Line(l));
}
