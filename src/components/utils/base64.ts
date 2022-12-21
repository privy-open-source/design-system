// eslint-disable-next-line @typescript-eslint/promise-function-async
export function toBase64 (file: globalThis.File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    const onLoad = () => {
      cleanup()
      resolve(reader.result as string)
    }

    const onError = (error: ProgressEvent<FileReader>) => {
      cleanup()
      reject(error)
    }

    const cleanup = () => {
      reader.removeEventListener('load', onLoad)
      reader.removeEventListener('error', onError)
    }

    reader.addEventListener('load', onLoad)
    reader.addEventListener('error', onError)
    reader.readAsDataURL(file)
  })
}

/**
 * Convert base64 data-uri to File
 * @param dataurl data base64
 * @param filename output's filename
 * @param mimeType output's mimeType
 */
export function fromBase64 (dataurl: string, filename?: string, mimeType?: string): globalThis.File {
  const name         = filename ?? (new Date()).toISOString()
  const [meta, body] = dataurl.split(',')
  const mime         = mimeType ?? meta.match(/:(.*?);/)[1]
  const buffer       = window.atob(body)

  return new globalThis.File([buffer], name, { type: mime })
}
