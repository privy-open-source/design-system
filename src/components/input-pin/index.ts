/**
 * Split string to array
 * @param text
 * @param length
 */
export function toArray (text: string | undefined, length: number): string[] {
  return [...(text ?? '').padEnd(length)].slice(0, length)
}
