import { assertEquals } from "std/assert/mod.ts";
import { question1, question2 } from "./main.ts";

Deno.test("Q1", async () => {
  assertEquals(await question1("08/inputs.test.txt"), 2);
  assertEquals(await question1("08/inputs.test2.txt"), 6);
  assertEquals(await question1("08/inputs.txt"), 22199);
});

Deno.test("Q2", async () => {
  assertEquals(await question2("08/inputs.test3.txt"), 6);
  assertEquals(await question2("08/inputs.txt"), 13334102464297);
});
