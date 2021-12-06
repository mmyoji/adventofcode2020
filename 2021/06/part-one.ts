import type { Fishes } from "./input.ts";

export function run(fishes: Fishes): void {
  let _fishes: Fishes = [...fishes];

  for (let day = 1; day <= 80; day++) {
    let add = 0;
    _fishes = _fishes.map((n) => {
      if (n === 0) {
        add++;
        return 6;
      }

      return n - 1;
    });

    if (add > 0) {
      for (let i = 0; i < add; i++) {
        _fishes.push(8);
      }
    }
  }

  console.log({ answer: _fishes.length });
  // { answer: 346063 }
}
