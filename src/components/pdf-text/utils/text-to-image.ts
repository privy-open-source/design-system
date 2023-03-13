import { createCanvas } from '../../signature-draw/utils/canvas'
import loadFont from '../../signature-text/utils/load-font'
import { clamp } from 'lodash-es'

interface GenerateOptions {
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
   */
  color: string,
  /**
   * Text font size
   */
  size: number,
  /**
   * Minimum font size
   */
  minSize: number,
  /**
   * Maximum font size
   */
  maxSize: number,
  /**
   * Autofit mode
   */
  fixedSize: boolean,
  /**
   * Text font family
   */
  font: string,
  /**
   * Text line height
   */
  lineHeight: number,
  /**
   * Text box padding
   */
  padding: number,
}

function wrapText (context: CanvasRenderingContext2D, text: string, fontSize: number, lineHeight: number, fontFamily: string, maxWidth: number): string[] {
  const lines: string[] = []

  context.font         = `${fontSize}px ${JSON.stringify(fontFamily)}`
  context.textBaseline = 'top'

  let line = ''
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
        lines.push(line)

        line = `${words[i]} `
      } else
        line = test
    }

    lines.push(line)

    line = ''
  }

  return lines
}

export default async function generate (options: GenerateOptions) {
  const {
    text,
    color,
    padding,
    font,
    height,
    width,
    size,
    minSize,
    maxSize,
    fixedSize,
  } = options

  await loadFont(font)

  const canvas    = options.canvas ?? createCanvas(width, height)
  const context   = canvas.getContext('2d')
  const maxWidth  = width - (padding * 2)
  const maxHeight = height - (padding * 2)

  if (text) {
    let fontSize   = size
    let lineHeight = fontSize * options.lineHeight
    let lines      = wrapText(
      context,
      text,
      fontSize,
      lineHeight,
      font,
      maxWidth,
    )

    if (!fixedSize) {
      let textHeight = (lines.length * lineHeight)
      let count      = 0

      do {
        const newFontSize = clamp(
          Math.round(((maxHeight / textHeight * fontSize) + fontSize) / 2),
          minSize,
          maxSize,
        )

        if (newFontSize === fontSize)
          break

        fontSize   = newFontSize
        lineHeight = fontSize * options.lineHeight
        lines      = wrapText(
          context,
          text,
          fontSize,
          lineHeight,
          font,
          maxWidth,
        )

        textHeight = (lines.length * lineHeight)
      } while (textHeight > maxHeight && ++count < 5)
    }

    context.font         = `${fontSize}px ${JSON.stringify(font)}`
    context.textBaseline = 'top'
    context.textAlign    = 'start'
    context.fillStyle    = color

    for (const [i, line] of lines.entries())
      context.fillText(line, padding, (i * lineHeight) + padding)
  }

  return canvas.toDataURL('image/png')
}
