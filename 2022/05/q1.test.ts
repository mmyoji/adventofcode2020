import { assertEquals } from "std/assert/mod.ts";
import { q1 } from "./q1.ts";

Deno.test("q1()", async () => {
  assertEquals(await q1("05/inputs.test.txt"), "CMZ");
  assertEquals(await q1("05/inputs.txt"), "BWNCQRMDB");
});
