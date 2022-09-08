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
