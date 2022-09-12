export async function toBase64 (file: globalThis.File): Promise<string> {
  const base64 = Buffer.from(await file.text()).toString('base64')
  const type   = file.type

  return `data:${type};base64,${base64}`
}
