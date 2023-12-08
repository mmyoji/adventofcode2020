import { findLCMs } from "./math.ts";

import { assertEquals } from "std/assert/mod.ts";

Deno.test("findLCMs()", () => {
  assertEquals(findLCMs([2, 3]), 6);
  assertEquals(findLCMs([2, 3, 6]), 6);
  assertEquals(findLCMs([2, 3, 4]), 12);
});
