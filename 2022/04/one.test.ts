import { assertEquals } from "std/assert/mod.ts";
import { one } from "./one.ts";

Deno.test("one", async () => {
  {
    const sum = await one("04/input.sample.txt");
    assertEquals(sum, 2);
  }
  {
    const sum = await one("04/input.txt");
    assertEquals(sum, 582);
  }
});
