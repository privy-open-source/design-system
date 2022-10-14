export interface MotionTemplate {
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  xPos: number,
  yPos: number,
  buffer: Uint8ClampedArray,
}

export const MOTION_THRESHOLD = 40

export const MOTION_FPS = 15

export const MOTION_AREA_SIZE = 160

/**
 * Capture and create sample image from HTML Video Element
 * @param canvas Canvas 2d context
 * @param video Html Video element
 */
export function takeSample (canvas: HTMLCanvasElement, video: HTMLVideoElement): ImageData {
  const context = canvas.getContext('2d', { willReadFrequently: true })

  context.drawImage(
    video,
    (video.videoWidth / 2) - MOTION_AREA_SIZE,
    (video.videoHeight / 2) - MOTION_AREA_SIZE,
    MOTION_AREA_SIZE,
    MOTION_AREA_SIZE,
    0,
    0,
    MOTION_AREA_SIZE,
    MOTION_AREA_SIZE,
  )

  return context.getImageData(0, 0, canvas.width, canvas.height)
}

/**
 * create motion template
 * @param imageData sample imagedata
 */
export function createTemplate (imageData: ImageData): MotionTemplate {
  // cut out the template:
  // we use a small width, quarter-size image around the center as template
  const centerX = imageData.width / 2
  const centerY = imageData.height / 2
  const width   = imageData.width / 4
  const height  = imageData.height / 4
  const xPos    = centerX - width / 2
  const yPos    = centerY - height / 2
  const buffer  = new Uint8ClampedArray(width * height)

  const template: MotionTemplate = {
    centerX,
    centerY,
    width,
    height,
    xPos,
    yPos,
    buffer,
  }

  const p = imageData.data

  let counter = 0
  for (let y = template.yPos; y < template.yPos + template.height; y++) {
    let bufferIndex = (y * imageData.width * 4) + template.xPos * 4 + 1

    for (let x = template.xPos; x < template.xPos + template.width; x++) {
      template.buffer[counter++] = p[bufferIndex]

      bufferIndex += 4
    }
  }

  return template
}

/**
 * Compare image with Motion template and return the movement distance
 * @param imageData new sample's imagedata
 * @param template motion template to compare
 */
export function motionDetection (imageData: ImageData, template: MotionTemplate): number {
  // this is the major computing step: Perform a normalized cross-correlation between the template of the first image and each incoming image
  // this algorithm is basically called "Template Matching" - we use the normalized cross correlation to be independent of lighting changes
  // we calculate the correlation of template and image over the whole image area
  let bestHitX = 0
  let bestHitY = 0
  let maxCorr  = 0

  const searchWidth  = imageData.width / 4
  const searchHeight = imageData.height / 4
  const p            = imageData.data

  for (let y = template.centerY - searchHeight; y <= template.centerY + searchHeight - template.height; y++) {
    for (let x = template.centerX - searchWidth; x <= template.centerX + searchWidth - template.width; x++) {
      let nominator     = 0
      let denominator   = 0
      let templateIndex = 0

      // Calculate the normalized cross-correlation coefficient for this position
      for (let ty = 0; ty < template.height; ty++) {
        // we use only the green plane here
        let bufferIndex = x * 4 + 1 + (y + ty) * imageData.width * 4

        for (let tx = 0; tx < template.width; tx++) {
          const imagepixel = p[bufferIndex]

          nominator   += template.buffer[templateIndex++] * imagepixel
          denominator += imagepixel * imagepixel
          // we use only the green plane here
          bufferIndex += 4
        }
      }

      // The NCC coefficient is then (watch out for division-by-zero errors for pure black images):
      let ncc = 0
      if (denominator > 0)
        ncc = nominator * nominator / denominator

      // Is it higher than what we had before?
      if (ncc > maxCorr) {
        maxCorr  = ncc
        bestHitX = x
        bestHitY = y
      }
    }
  }

  // now the most similar position of the template is (bestHitX, bestHitY). Calculate the difference from the origin:
  const distX        = bestHitX - template.xPos
  const distY        = bestHitY - template.yPos
  const movementDiff = Math.sqrt(distX * distX + distY * distY)

  // the maximum movement possible is a complete shift into one of the corners, i.e:
  const maxDistX        = searchWidth - template.width / 2
  const maxDistY        = searchHeight - template.height / 2
  const maximumMovement = Math.sqrt(maxDistX * maxDistX + maxDistY * maxDistY)

  // the percentage of the detected movement is therefore:
  let movementPercentage = movementDiff / maximumMovement * 100
  if (movementPercentage > 100)
    movementPercentage = 100

  return movementPercentage
}
