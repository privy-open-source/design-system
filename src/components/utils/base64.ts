import { format } from 'date-fns'
// eslint-disable-next-line unicorn/prefer-node-protocol
import { Buffer } from 'buffer'

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

    reader.readAsDataURL(file)
    reader.addEventListener('load', onLoad)
    reader.addEventListener('error', onError)
  })
}

/**
 * Convert base64 data-uri to File
 * @param dataurl data base64
 * @param filename output filename
 */
export function fromBase64 (dataurl: string, filename?: string): globalThis.File {
  const name   = filename ?? format(new Date(), 'yyyyMMddHHmmss')
  const arr    = dataurl.split(',')
  const mime   = arr[0].match(/:(.*?);/)[1]
  const buffer = Buffer.from(arr[1], 'base64')

  return new File([buffer], name, { type: mime })
}
