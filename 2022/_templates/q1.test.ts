import { assertEquals } from "std/assert/mod.ts";
import { q1 } from "./q1.ts";

Deno.test("q1()", async () => {
  assertEquals(await q1("xx/inputs.test.txt"), 0);
  assertEquals(await q1("xx/inputs.txt"), 0);
});
