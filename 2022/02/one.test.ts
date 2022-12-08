import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { answer1 } from "./one.ts";

Deno.test("one", async () => {
  {
    const score = await answer1("02/input.sample.txt");
    assertEquals(score, 15);
  }
  {
    const score = await answer1("02/input.txt");
    assertEquals(score, 10718);
  }
});
