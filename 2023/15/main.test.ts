import { assertEquals } from "std/assert/mod.ts";
import { DAY, calc, part1, part2 } from "./main.ts";

Deno.test("calc()", () => {
  assertEquals(calc("HASH", 0, 0), 52);
  assertEquals(calc("rn", 0, 0), 0);
  assertEquals(calc("cm", 0, 0), 0);
  assertEquals(calc("qp", 0, 0), 1);
  assertEquals(calc("pc", 0, 0), 3);
});

Deno.test("Part 1", async () => {
  assertEquals(await part1(`${DAY}/inputs.test.txt`), 1320);
  assertEquals(await part1(`${DAY}/inputs.txt`), 502139);
});

Deno.test("Part 2", async () => {
  assertEquals(await part2(`${DAY}/inputs.test.txt`), 145);
  assertEquals(await part2(`${DAY}/inputs.txt`), 284132);
});
