import { assertEquals } from "std/assert/mod.ts";
import { DAY, part1, part2 } from "./main.ts";

Deno.test("Part 1", async () => {
  assertEquals(await part1(`${DAY}/inputs.test.txt`), 405);
  assertEquals(await part1(`${DAY}/inputs.txt`), 36041);
});

Deno.test("Part 2", async () => {
  assertEquals(await part2(`${DAY}/inputs.test.txt`), 0);
});
