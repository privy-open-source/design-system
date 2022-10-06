import { fromBase64 } from '../../utils/base64'
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
    mask      : 'round',
    mirror    : true,
    facingMode: 'user',
  },
  async run ({ video, toast, meta, modifier }) {
    return await new Promise((resolve) => {
      const isMirrored = meta.value.mirror && meta.value.mirror !== 'preview'
      const photoA     = takePicture(video.value, isMirrored)
      const canvas     = document.createElement('canvas')
      const context    = canvas.getContext('2d', { willReadFrequently: true })

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

        if (!template)
          template = createTemplate(imageData)
        else if (motionDetection(imageData, template) > MOTION_THRESHOLD) {
          const photoB = takePicture(video.value, isMirrored)
          const result = modifier.value.base64
            ? [fromBase64(photoB), fromBase64(photoA)]
            : [photoB, photoA]

          clearInterval(interval)
          toast('')
          resolve({
            preview: photoB,
            result : result,
          })
        }
      }, 1000 / MOTION_FPS)

      toast('Move your head slowly. Your photo will be taken automatically')
    })
  },
})
