/**
 * LCM ... Least Common Multiple (最小公倍数)
 * GCD ... Greatest Common Divisor (最大公約数)
 *
 * LCM = (A * B) / GCD
 */

function _findGCD(a: number, b: number): number {
  if (a === 0) return b;
  if (b === 0) return a;

  return _findGCD(b, a % b);
}

function findGCD(a: number, b: number): number {
  const [big, small] = a > b ? [a, b] : [b, a];
  return _findGCD(big, small);
}

function findLCM(a: number, b: number): number {
  if (a === 0 || b === 0) {
    return 0;
  }

  return a / findGCD(a, b) * b;
}

export function findLCMs(ns: number[]): number {
  if (ns.length === 0) return 0;

  let ret = ns[0];

  for (let i = 1; i < ns.length; i++) {
    ret = findLCM(ret, ns[i]);
  }

  return ret;
}
