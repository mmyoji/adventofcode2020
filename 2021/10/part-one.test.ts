import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { fetchData } from "./input.ts";
import { run } from "./part-one.ts";

Deno.test("run", async () => {
  const data = await fetchData("./sample.txt");
  const value = run(data);
  assertEquals(value, 26397);
});
