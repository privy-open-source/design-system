export function capitalize (text: string) {
  return String(text)
    .toLowerCase()
    .replace(/^\w|([\s,.])(\w)/gm, (i) => i.toUpperCase())
}

export function formatName (text: string) {
  if (!text)
    return ''

  return capitalize(String(text).trim().replace(/[^\s,.A-z]+/g, ''))
}
