import { parseLine1, parseLine2, question1, question2 } from "./main.ts";

import { assertEquals } from "std/assert/mod.ts";

Deno.test("parseLine1()", () => {
  assertEquals(parseLine1("1abc2"), { first: 1, last: 2 });
  assertEquals(parseLine1("pqr3stu8vwx"), { first: 3, last: 8 });
  assertEquals(parseLine1("a1b2c3d4e5f"), { first: 1, last: 5 });
  assertEquals(parseLine1("treb7uchet"), { first: 7, last: 7 });
});

Deno.test("question1()", async () => {
  const total = await question1("01/inputs.test.txt");

  assertEquals(total, 142);
});

Deno.test("parseLine2()", () => {
  assertEquals(parseLine2("two1nine"), { first: 2, last: 9 });
  assertEquals(parseLine2("eightwothree"), { first: 8, last: 3 });
  assertEquals(parseLine2("abcone2threexyz"), { first: 1, last: 3 });
  assertEquals(parseLine2("xtwone3four"), { first: 2, last: 4 });
  assertEquals(parseLine2("4nineeightseven2"), { first: 4, last: 2 });
  assertEquals(parseLine2("zoneight234"), { first: 1, last: 4 });
  assertEquals(parseLine2("7pqrstsixteen"), { first: 7, last: 6 });
});

Deno.test("question2()", async () => {
  const total = await question2("01/inputs2.test.txt");

  assertEquals(total, 281);
});
