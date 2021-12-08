/**
 * a - b for string.
 */
export function subtract(a: string, b: string): string {
  const aArr = Array.from(a);
  const bArr = Array.from(b);

  const diff = aArr.filter((char) => !bArr.includes(char));
  return diff.join("");
}

export function sort(s: string): string {
  return Array.from(s).sort().join("");
}
