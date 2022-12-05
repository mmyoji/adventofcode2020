import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getMax } from "./one.ts";

Deno.test("one", async () => {
  {
    const maxCalories = await getMax("2022/01/input.sample.txt");
    assertEquals(maxCalories, 24000);
  }
  {
    const maxCalories = await getMax("2022/01/input.txt");
    assertEquals(maxCalories, 72017);
  }
});
