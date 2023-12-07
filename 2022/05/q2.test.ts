import { assertEquals } from "std/assert/mod.ts";
import { q2 } from "./q2.ts";

Deno.test("q2()", async () => {
  assertEquals(await q2("05/inputs.test.txt"), "MCD");
  assertEquals(await q2("05/inputs.txt"), "NHWZCBNBF");
});
