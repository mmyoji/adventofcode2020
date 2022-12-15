import { assertEquals } from "std/testing/asserts.ts";
import { getMax } from "./one.ts";

Deno.test("one", async () => {
  {
    const maxCalories = await getMax("01/input.sample.txt");
    assertEquals(maxCalories, 24000);
  }
  {
    const maxCalories = await getMax("01/input.txt");
    assertEquals(maxCalories, 72017);
  }
});
