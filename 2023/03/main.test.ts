import { question1, question2 } from "./main.ts";

import { assertEquals } from "std/assert/mod.ts";

Deno.test("question1()", async () => {
  assertEquals(await question1("03/inputs.test.txt"), 4361);
});

Deno.test("question2()", async () => {
  assertEquals(await question2("03/inputs.test.txt"), 467835);
});
