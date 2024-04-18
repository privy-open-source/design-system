/**
 * Split string to array
 * @param text
 * @param length
 */
export function toArray (text: string | undefined, length: number): string[] {
  return Array.from<string, string>({ length }, (_, i) => text?.[i] ?? '')
}
