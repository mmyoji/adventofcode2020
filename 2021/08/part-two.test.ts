import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { fetchData } from "./input.ts";
import { run } from "./part-two.ts";

Deno.test("run", async () => {
  const data = await fetchData("./sample.txt");
  const value = run(data);
  assertEquals(value.length, 10);
  assertEquals(value[0], 8394);
  assertEquals(value[1], 9781);
  assertEquals(value[2], 1197);
  assertEquals(value[3], 9361);
  assertEquals(value[4], 4873);
  assertEquals(value[5], 8418);
  assertEquals(value[6], 4548);
  assertEquals(value[7], 1625);
  assertEquals(value[8], 8717);
  assertEquals(value[9], 4315);
  assertEquals(
    value.reduce((p, c) => p + c),
    61229
  );
});
