import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getSumOfTop3 } from "./two.ts";

Deno.test("two", async () => {
  {
    const maxCalories = await getSumOfTop3("01/input.sample.txt");
    assertEquals(maxCalories, 45000);
  }
  {
    const maxCalories = await getSumOfTop3("01/input.txt");
    assertEquals(maxCalories, 212520);
  }
});
