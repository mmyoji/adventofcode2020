import { subtract, sort } from "./strings.ts";

export type Pattern = string;
export type Output = string;

/**
 *   0:      1:      2:      3:      4:
 *  aaaa    ....    aaaa    aaaa    ....
 * b    c  .    c  .    c  .    c  b    c
 * b    c  .    c  .    c  .    c  b    c
 *  ....    ....    dddd    dddd    dddd
 * e    f  .    f  e    .  .    f  .    f
 * e    f  .    f  e    .  .    f  .    f
 *  gggg    ....    gggg    gggg    ....
 *
 *   5:      6:      7:      8:      9:
 *  aaaa    aaaa    aaaa    aaaa    aaaa
 * b    .  b    .  .    c  b    c  b    c
 * b    .  b    .  .    c  b    c  b    c
 *  dddd    dddd    ....    dddd    dddd
 * .    f  e    f  .    f  e    f  .    f
 * .    f  e    f  .    f  e    f  .    f
 *  gggg    gggg    ....    gggg    gggg
 *
 * | Number | Length | Unique |
 * ----------------------------
 * |  "0"   |   6    |        |
 * |  "1"   |   2    |    x   |
 * |  "2"   |   5    |        |
 * |  "3"   |   5    |        |
 * |  "4"   |   4    |    x   |
 * |  "5"   |   5    |        |
 * |  "6"   |   6    |        |
 * |  "7"   |   3    |    x   |
 * |  "8"   |   7    |        |
 * |  "9"   |   6    |    x   |
 *
 * [Part 2 Solution]
 * 1. Find "1", "4", "7" and "8" with its length.
 * 2. Get "a" by comparing "1" and "7"
 * 3. Among 6 length numbers,
 *   a. "6" doesn't contain "1"
 *   b. and get "c" and "f"
 * 4. Among 5 length numbers,
 *   a. "3" has both "c" and "f"
 *   b. "2" has only "c"
 *   c. "5" has only "f"
 * 5. Get "e" by comparing "2" and "3"
 * 6. Among the rest of 6 length numbers,
 *   a. "9" lefts "e" by comparing "8"
 *   b. and the other is "0"
 */

function findSix(sixes: string[], one: string): string {
  for (const str of sixes) {
    // Both "0" and "9" gets 4 length, "6" gets 5.
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
    const arr = Array.from(str);
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
      const sorted = sort(output);
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
      ret[sort(mapping[key])] = key;
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
