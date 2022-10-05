import {
  createTemplate,
  motionDetection,
  MotionTemplate,
} from '../utils/motion'
import { takePicture } from '../utils/take-picture'
import { defineAdapter } from './adapter'

const MOTION_THRESHOLD = 40
const MOTION_FPS       = 15
const MOTION_AREA_SIZE = 160

/**
 * Liveness adapter for camera, using Fast Motion Algorithm
 */
export default defineAdapter({
  meta: {
    mask      : 'circle',
    mirror    : 'all',
    facingMode: 'user',
  },
  async run ({ video, notify }) {
    return await new Promise((resolve) => {
      const photoA  = takePicture(video.value)
      const canvas  = document.createElement('canvas')
      const context = canvas.getContext('2d', { willReadFrequently: true })

      canvas.width  = MOTION_AREA_SIZE
      canvas.height = MOTION_AREA_SIZE

      let template: MotionTemplate

      const interval = setInterval(function processFrame () {
        // Take picture square from center
        context.drawImage(
          video.value,
          (video.value.videoWidth / 2) - MOTION_AREA_SIZE,
          (video.value.videoHeight / 2) - MOTION_AREA_SIZE,
          MOTION_AREA_SIZE,
          MOTION_AREA_SIZE,
          0,
          0,
          MOTION_AREA_SIZE,
          MOTION_AREA_SIZE,
        )

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

        if (template) {
          const movement = motionDetection(imageData, template)

          if (movement > MOTION_THRESHOLD) {
            const photoB = takePicture(video.value)

            clearInterval(interval)
            notify('')
            resolve([photoB, photoA])
          }
        } else
          template = createTemplate(imageData)
      }, 1000 / MOTION_FPS)

      notify('Move your head slowly. Your photo will be taken automatically')
    })
  },
})
