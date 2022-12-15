import { assertEquals } from "std/testing/asserts.ts";
import { two } from "./two.ts";

Deno.test("two", async () => {
  {
    const sum = await two("04/input.sample.txt");
    assertEquals(sum, 4);
  }
  {
    const sum = await two("04/input.txt");
    assertEquals(sum, 893);
  }
});
