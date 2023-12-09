import { assertEquals } from "std/assert/mod.ts";
import { question1, question2 } from "./main.ts";

Deno.test("Q1", async () => {
  assertEquals(await question1("09/inputs.test.txt"), 114);
  assertEquals(await question1("09/inputs.txt"), 1972648895);
});

Deno.test("Q2", async () => {
  assertEquals(await question2("09/inputs.test.txt"), 2);
  assertEquals(await question2("09/inputs.txt"), 919);
});
