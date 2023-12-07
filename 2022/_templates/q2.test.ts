import { assertEquals } from "std/assert/mod.ts";
import { q2 } from "./q2.ts";

Deno.test("q2()", async () => {
  assertEquals(await q2("xx/inputs.test.txt"), 0);
  assertEquals(await q2("xx/inputs.txt"), 0);
});
