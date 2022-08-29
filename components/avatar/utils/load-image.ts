// eslint-disable-next-line @typescript-eslint/promise-function-async
export default function loadImage (url?: string | null): Promise<string> {
  if (!url)
    return Promise.reject(new Error('ERR_INVALID_IMAGE_SRC'))

  return new Promise((resolve, reject) => {
    const image  = new window.Image()
    const onLoad = () => {
      onFinish()
      resolve(url)
    }

    const onError = () => {
      onFinish()
      reject(new Error('ERR_FAILED_LOAD_IMAGE'))
    }

    const onFinish = () => {
      image.removeEventListener('load', onLoad)
      image.removeEventListener('error', onError)
    }

    image.addEventListener('load', onLoad)
    image.addEventListener('error', onError)
    image.src = url
  })
}
