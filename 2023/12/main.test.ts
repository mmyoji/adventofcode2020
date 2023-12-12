import { assertEquals } from "std/assert/mod.ts";
import { DAY, arrangements, part1, part2 } from "./main.ts";

Deno.test("arrangements()", () => {
  assertEquals(arrangements("???.###", [1, 1, 3]), 1);
  assertEquals(arrangements(".??..??...?##.", [1, 1, 3]), 4);
  assertEquals(arrangements("?#?#?#?#?#?#?#?", [1, 3, 1, 6]), 1);
  assertEquals(arrangements("????.#...#...", [4, 1, 1]), 1);
  assertEquals(arrangements("????.######..#####.", [1, 6, 5]), 4);
  assertEquals(arrangements("?###????????", [3, 2, 1]), 10);
});

Deno.test("Part 1", async () => {
  assertEquals(await part1(`${DAY}/inputs.test.txt`), 0);
});

Deno.test("Part 2", async () => {
  assertEquals(await part2(`${DAY}/inputs.test.txt`), 0);
});
