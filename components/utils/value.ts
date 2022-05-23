export function isEqual (a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

export function valueIn (array: unknown[], value: unknown): boolean {
  return array.some((item) => isEqual(item, value))
}
