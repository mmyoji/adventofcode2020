import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { fetchData } from "./input.ts";
import { run } from "./part-two.ts";

Deno.test("run", async () => {
  let data = await fetchData("./sample-1.txt");
  assertEquals(run(data), 36);

  data = await fetchData("./sample-2.txt");
  assertEquals(run(data), 103);

  data = await fetchData("./sample-3.txt");
  assertEquals(run(data), 3509);
});
