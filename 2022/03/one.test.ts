import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { one } from "./one.ts";

Deno.test("one", async () => {
  {
    const sum = await one("03/input.sample.txt");
    assertEquals(sum, 157);
  }
  {
    const sum = await one("03/input.txt");
    assertEquals(sum, 8493);
  }
});
