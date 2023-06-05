export function capitalize (text: string) {
  return String(text)
    .toLowerCase()
    .replaceAll(/^\w|([\s,.])(\w)/gm, (i) => i.toUpperCase())
}

export function formatName (text: string) {
  if (!text)
    return ''

  return capitalize(String(text).trim().replaceAll(/[^\s,.A-Za-z]+/g, ''))
}
