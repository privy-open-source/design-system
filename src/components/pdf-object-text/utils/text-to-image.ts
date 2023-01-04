import { createCanvas } from '../../signature-draw/utils/canvas'

function wrapText (context: CanvasRenderingContext2D, text: string, x0: number, y0: number, maxWidth: number, lineHeight: number) {
  const x = x0

  let line      = ''
  let lineCount = 0
  let y         = y0

  let i: number
  let test: string
  let metrics: TextMetrics

  for (const paragraph of text.split('\n')) {
    const words = paragraph.split(' ')

    for (i = 0; i < words.length; i++) {
      test    = words[i]
      metrics = context.measureText(test)

      while (metrics.width > maxWidth) {
        // Determine how much of the word will fit
        test    = test.slice(0, Math.max(0, test.length - 1))
        metrics = context.measureText(test)
      }

      if (words[i] !== test) {
        words.splice(i + 1, 0, words[i].slice(test.length))
        words[i] = test
      }

      test    = `${line + words[i]} `
      metrics = context.measureText(test)

      if (metrics.width > maxWidth && i > 0) {
        context.fillText(line, x, y)
        line       = `${words[i]} `
        y         += lineHeight
        lineCount += 1
      } else
        line = test
    }

    context.fillText(line, x, y)

    y         += lineHeight
    lineCount += 1
    line       = ''
  }

  return {
    height: y,
    count : lineCount,
  }
}

interface ToImage {
  /**
   * Canvas's element
   */
  canvas?: HTMLCanvasElement,
  /**
   * Text to be generated
   */
  text: string,
  /**
   * Image width
   */
  width: number,
  /**
   * Image height
   */
  height: number,
  /**
   * Text color
   * @default '#4a5362'
   */
  color?: string,
  /**
   * Text font size
   * @default 16
   */
  fontSize?: number,
  /**
   * Text font family
   * @default 'DM Sans'
   */
  fontFamily?: string,
  /**
   * Text line height
   * @default 1.65
   */
  lineHeight?: number,
  /**
   * Text box padding
   * @default 12
   */
  padding?: number,
}

export function toImage (options: ToImage) {
  const canvas     = options.canvas ?? createCanvas(options.width, options.height)
  const context    = canvas.getContext('2d')
  const text       = options.text
  const width      = options.width
  const fontFamily = options.fontFamily ?? 'DM Sans'
  const fontSize   = options.fontSize ?? 16
  const lineHeight = options.lineHeight ?? 1.65
  const padding    = options.padding ?? 12
  const color      = options.color ?? '#4a5362'

  context.font         = `${fontSize}px "${fontFamily}"`
  context.fillStyle    = color
  context.textBaseline = 'top'

  wrapText(
    context,
    text,
    padding,
    padding,
    width - (padding * 2),
    fontSize * lineHeight,
  )

  return canvas.toDataURL('image/png')
}

export function getTextWidth (options: ToImage): number {
  const canvas     = options.canvas ?? createCanvas(options.width, options.height)
  const context    = canvas.getContext('2d')
  const text       = options.text
  const fontFamily = options.fontFamily ?? 'DM Sans'
  const fontSize   = options.fontSize ?? 16
  const padding    = options.padding ?? 12
  const color      = options.color ?? '#4a5362'

  context.font         = `${fontSize}px "${fontFamily}"`
  context.fillStyle    = color
  context.textBaseline = 'top'

  return context.measureText(text).width + (padding * 2)
}
