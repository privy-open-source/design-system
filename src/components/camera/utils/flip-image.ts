import loadImage from '../../avatar/utils/load-image'

export async function flipVertical (url: string): Promise<string> {
  const canvas  = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const image   = await loadImage(url)

  canvas.width  = image.width
  canvas.height = image.height

  context.scale(-1, 1)
  context.drawImage(image, 0, 0, canvas.width * -1, canvas.height)

  return canvas.toDataURL('image/jpeg')
}
