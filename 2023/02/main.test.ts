import { question1, question2 } from "./main.ts";

import { assertEquals } from "std/assert/mod.ts";

Deno.test("question1()", async () => {
  assertEquals(await question1("02/inputs.test.txt"), 8);
});

Deno.test("question2()", async () => {
  assertEquals(await question2("02/inputs.test.txt"), 2286);
});
