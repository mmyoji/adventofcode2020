import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { answer2 } from "./two.ts";

Deno.test("two", async () => {
  {
    const score = await answer2("2022/02/input.sample.txt");
    assertEquals(score, 12);
  }
  {
    const score = await answer2("2022/02/input.txt");
    assertEquals(score, 14652);
  }
});
