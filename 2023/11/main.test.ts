import { assertEquals } from "std/assert/mod.ts";
import { DAY, part1, part2 } from "./main.ts";

Deno.test("Part 1", async () => {
  assertEquals(await part1(`${DAY}/inputs.test.txt`), 374);
  assertEquals(await part1(`${DAY}/inputs.txt`), 10276166);
});

Deno.test("Part 2", async () => {
  assertEquals(await part2(`${DAY}/inputs.test.txt`, 10), 1030);
  assertEquals(await part2(`${DAY}/inputs.test.txt`, 100), 8410);
  assertEquals(
    await part2(`${DAY}/inputs.txt`, 1_000_000),
    598_693_078_798,
  );
});
