import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { fetchData } from "./input.ts";
import { run } from "./part-one.ts";

Deno.test("run", async () => {
  let data = await fetchData("./sample-1.txt");
  assertEquals(run(data), 10);

  data = await fetchData("./sample-2.txt");
  assertEquals(run(data), 19);

  data = await fetchData("./sample-3.txt");
  assertEquals(run(data), 226);
});
