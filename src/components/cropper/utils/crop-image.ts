import { createCanvas } from '../../signature-draw/utils/canvas'

interface CropImage {
  image: HTMLImageElement,
  width: number,
  height: number,
  scale: number,
  angle: number,
  x: number,
  y: number,
  rounded: boolean,
}

export function cropImage (options: CropImage): string {
  const {
    width,
    height,
    image,
    scale,
    angle,
    x,
    y,
    rounded,
  } = options

  const canvas = createCanvas(width, height)
  const ctx    = canvas.getContext('2d')

  const imgW = image.width * scale
  const imgH = image.height * scale

  const offsetX = x * scale
  const offsetY = y * scale

  ctx.translate(width / 2, height / 2)
  ctx.rotate(angle * Math.PI / 180)
  ctx.translate(width / -2, height / -2)
  ctx.drawImage(
    image,
    (width - imgW) / 2 + offsetX,
    (height - imgH) / 2 + offsetY,
    imgW,
    imgH,
  )

  if (rounded) {
    const r = Math.min(width / 2, height / 2)

    ctx.globalCompositeOperation = 'destination-in'
    ctx.beginPath()
    ctx.moveTo(r, 0)
    ctx.arcTo(width, 0, width, height, r) // top-right
    ctx.arcTo(width, height, 0, height, r) // bottom-right
    ctx.arcTo(0, height, 0, 0, r) // bottom-left
    ctx.arcTo(0, 0, width, 0, r) // top-left
    ctx.closePath()
    ctx.fill()
  }

  return canvas.toDataURL()
}
