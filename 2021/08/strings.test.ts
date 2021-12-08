import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { subtract, sort } from "./strings.ts";

Deno.test("subtract", () => {
  assertEquals(subtract("abc", "ba"), "c");
  assertEquals(subtract("abcd", "efgh"), "abcd");
  assertEquals(subtract("abc", "bcd"), "a");
  assertEquals(subtract("ab", "ba"), "");
});

Deno.test("sort", () => {
  assertEquals(sort("abc"), "abc");
  assertEquals(sort("bac"), "abc");
  assertEquals(sort("cab"), "abc");
  assertEquals(sort("cba"), "abc");
  assertEquals(sort("afcg"), "acfg");
  assertEquals(sort("gcadebf"), "abcdefg");
  assertEquals(sort("bgcad"), "abcdg");
});
