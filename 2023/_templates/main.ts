import { readLines } from "../utils.ts";

export async function question1(path: string) {
  const lines = await readLines(path);

  // TODO: impl

  return lines.length;
}

export async function question2(path: string) {
  const lines = await readLines(path);

  // TODO: impl

  return lines.length;
}

if (import.meta.main) {
  console.log(`Q1:`, await question1("xx/inputs.txt"));
  // answer: xxx

  console.log(`Q2:`, await question2("xx/inputs.txt"));
  // answer: yyy
}
