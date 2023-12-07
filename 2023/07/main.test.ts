import { assertEquals } from "std/assert/mod.ts";
import { question1 } from "./q1.ts";
import { question2 } from "./q2.ts";

Deno.test("Q1", async () => {
  assertEquals(await question1("07/inputs.test.txt"), 6440);
});

Deno.test("Q2", async () => {
  assertEquals(await question2("07/inputs.test.txt"), 5905);
});
