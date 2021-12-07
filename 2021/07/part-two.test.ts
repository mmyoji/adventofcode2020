import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { fetchData } from "./input.ts";
import { run } from "./part-two.ts";

Deno.test("run", async () => {
  const data = await fetchData("./sample.txt");
  const [distance, minFuelds] = run(data);
  assertEquals(distance, 5);
  assertEquals(minFuelds, 168);
});
