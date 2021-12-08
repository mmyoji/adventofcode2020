export type Pattern = string;
export type Output = string;

/**
 * "0" ... 6
 * "1" ... 2 (uniq)
 * "2" ... 5
 * "3" ... 5
 * "4" ... 4 (uniq)
 * "5" ... 5
 * "6" ... 6
 * "7" ... 3 (uniq)
 * "8" ... 7 (uniq)
 * "9" ... 6
 *
 * 長さが 2 と 3 の文字列を比較して、 "a" の位置を特定.
 * 長さが 6 の 3つのうち,
 *   - "1" を含まないやつが "6"
 *   - "c" と "f" も特定
 * 長さが 5 の 3つのうち,
 *   - "c" & "f" 両方あるのが "3"
 *   - "c" しかないのが "2"
 *   - "f" しかないのが "5"
 * "2" と "3" を比較して "e" を特定
 * 長さが 6 の残り2つのうち, "8" と比較して "e" が残る方が "9", そうじゃない方が "0"
 */

function strToArray(str: string): string[] {
  return Array.from(str);
}

/**
 * a - b for string.
 */
function subtract(a: string, b: string): string {
  const aArr = strToArray(a);
  const bArr = strToArray(b);

  const diff = aArr.filter((char) => !bArr.includes(char));
  return diff.join("");
}

function findSix(sixes: string[], one: string): string {
  for (const str of sixes) {
    if (subtract(str, one).length !== 4) {
      return str;
    }
  }

  throw new Error("6 is not found.");
}

function findFives(fives: string[], c: string, f: string) {
  let two = "";
  let three = "";
  let five = "";

  for (const str of fives) {
    const arr = strToArray(str);
    if (arr.includes(c) && arr.includes(f)) {
      three = str;
      continue;
    }

    if (arr.includes(c)) {
      two = str;
      continue;
    }

    if (arr.includes(f)) {
      five = str;
      continue;
    }
  }

  return [two, three, five];
}

function sortStr(s: string): string {
  return Array.from(s).sort().join("");
}

export class Line {
  patterns: Pattern[];
  outputs: Output[];

  constructor(line: string) {
    const [patterns, outputs] = line.split(" | ");

    this.patterns = this.#buildPatterns(patterns);
    this.outputs = this.#buildOutputs(outputs);
  }

  analyze(): number {
    const mapping = this.analyzePatterns();

    const result: string[] = [];
    for (const output of this.outputs) {
      const sorted = sortStr(output);
      if (sorted in mapping) {
        result.push(mapping[sorted]);
        continue;
      }
    }

    if (result.length !== this.outputs.length) {
      throw new Error("You have invalid mapping.");
    }

    return parseInt(result.join(""), 10);
  }

  analyzePatterns(): Record<string, string> {
    const mapping: Record<string, string> = {};
    const fives: string[] = [];
    const sixes: string[] = [];

    for (const p of this.patterns) {
      if (p.length === 2) {
        mapping["1"] = p;
        continue;
      }

      if (p.length === 3) {
        mapping["7"] = p;
        continue;
      }

      if (p.length === 4) {
        mapping["4"] = p;
        continue;
      }

      if (p.length === 7) {
        mapping["8"] = p;
      }

      if (p.length === 5) {
        fives.push(p);
        continue;
      }

      if (p.length === 6) {
        sixes.push(p);
        continue;
      }
    }

    const alphabet: Record<string, string> = {};
    const a = subtract(mapping["7"], mapping["1"]);
    alphabet["a"] = a;

    mapping["6"] = findSix(sixes, mapping["1"]);

    alphabet["c"] = subtract(mapping["1"], mapping["6"]);
    alphabet["f"] = subtract(mapping["1"], alphabet["c"]);

    const [two, three, five] = findFives(fives, alphabet["c"], alphabet["f"]);
    mapping["2"] = two;
    mapping["3"] = three;
    mapping["5"] = five;

    alphabet["e"] = subtract(mapping["2"], mapping["3"]);

    const zeroOrNine = sixes.filter((s) => s != mapping["6"]);
    for (const s of zeroOrNine) {
      const c = subtract(mapping["8"], s);
      if (c === alphabet["e"]) {
        mapping["9"] = s;
      } else {
        mapping["0"] = s;
      }
    }

    const ret: typeof mapping = {};
    for (const key in mapping) {
      ret[sortStr(mapping[key])] = key;
    }

    return ret;
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
