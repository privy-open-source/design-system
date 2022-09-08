import defu from 'defu'
import loadImage from '../../avatar/utils/load-image'
import { toRGB } from '../../utils/color'

/**
 * Fill and replace color of image
 * @param canvas Target canvas
 * @param color new Color
 */
export function replaceColor (canvas: HTMLCanvasElement, color: string) {
  const context = canvas.getContext('2d')
  const imgData = context.getImageData(0, 0, canvas.width, canvas.height)
  const pixels  = imgData.data
  const rgb     = toRGB(color)

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] > 0) {
      pixels[i]     = rgb.R
      pixels[i + 1] = rgb.G
      pixels[i + 2] = rgb.B
    }
  }

  context.putImageData(imgData, 0, 0)
}

export interface DrawLineOptions {
  color?: string,
  lineSize?: number,
  lineJoin?: CanvasLineJoin,
  lineCap?: CanvasLineCap,
}

export type DrawLineCoordinate = [number, number, number, number]

/**
 *
 * @param canvas Target canvas
 * @param coordinate line coordinate, format is [x0, y0, x1, y1]
 * @param options line options
 * @example
 *
 * drawLine(canvas, [0,0,50,50], { color: '#e4e4e4' })
 */
export function drawLine (canvas: HTMLCanvasElement, coordinate: DrawLineCoordinate, options?: DrawLineOptions) {
  const context = canvas.getContext('2d')
  const style   = defu(options, {
    color   : '#000000',
    lineSize: 2.5,
    lineCap : 'round' as CanvasLineCap,
    lineJoin: 'round' as CanvasLineJoin,
  })

  context.strokeStyle = style.color
  context.lineWidth   = style.lineSize
  context.lineJoin    = style.lineJoin
  context.lineCap     = style.lineCap

  context.beginPath()
  context.moveTo(coordinate[0], coordinate[1])
  context.lineTo(coordinate[2], coordinate[3])
  context.stroke()
}

/**
 * Clear and reset canvas
 * @param canvas Target Canvas
 */
export function clearAll (canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')

  context.clearRect(0, 0, canvas.width, canvas.height)
}

/**
 * Load and place to image to canvas
 * @param canvas Target canvas
 * @param url Image url
 */
export async function placeImage (canvas: HTMLCanvasElement, url: string) {
  const context = canvas.getContext('2d')
  const image   = await loadImage(url)

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.drawImage(image, 0, 0)
}

export function toDataURL (canvas: HTMLCanvasElement): string {
  return canvas.toDataURL()
}
