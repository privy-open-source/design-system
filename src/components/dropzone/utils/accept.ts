export default function attrAccept (accept: string, files: globalThis.File[]): globalThis.File[] {
  if (!accept)
    return files

  return files.filter((file) => {
    const fileName      = String(file.name).toLowerCase()
    const mimeType      = String(file.type).toLowerCase()
    const acceptedTypes = accept.split(',')

    return acceptedTypes.some((type) => {
      const validType = type.trim().toLowerCase()

      if (validType.charAt(0) === '.')
        return fileName.endsWith(validType)

      if (validType.endsWith('/*'))
        return mimeType.replace(/\/.*$/, '') === validType.replace(/\/.*$/, '')

      return mimeType === validType
    })
  })
}
