import { assertEquals } from "std/assert/mod.ts";
import { question1, question2 } from "./main.ts";

Deno.test("Q1", async () => {
  assertEquals(await question1("05/inputs.test.txt"), 35);
});

Deno.test("Q2", async () => {
  assertEquals(await question2("05/inputs.test.txt"), 46);
});
