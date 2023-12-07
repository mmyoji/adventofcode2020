import { question1 } from "./q1.ts";
import { question2 } from "./q2.ts";

if (import.meta.main) {
  console.log(`Q1:`, await question1("07/inputs.txt"));
  // answer: 253954294

  console.log(`Q2:`, await question2("07/inputs.txt"));
  // answer: 254837398
}
