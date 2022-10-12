import { fromBase64 } from '../../utils/base64'
import {
  createTemplate,
  motionDetection,
  MotionTemplate,
  MOTION_AREA_SIZE,
  MOTION_FPS,
  MOTION_THRESHOLD,
  takeSample,
} from '../utils/motion'
import { takePicture } from '../utils/take-picture'
import { defineAdapter } from './adapter'

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
      const isMirrored = !!(meta.value.mirror && meta.value.mirror !== 'preview')
      const photoA     = takePicture(video.value, isMirrored)
      const canvas     = document.createElement('canvas')

      canvas.width  = MOTION_AREA_SIZE
      canvas.height = MOTION_AREA_SIZE

      let template: MotionTemplate

      const interval = setInterval(function processFrame () {
        if (video.value) {
          const imageData = takeSample(canvas, video.value)

          if (!template)
            template = createTemplate(imageData)
          else if (motionDetection(imageData, template) > MOTION_THRESHOLD) {
            const photoB = takePicture(video.value, isMirrored)
            const result = modifier.value.base64
              ? [photoB, photoA]
              : [fromBase64(photoB), fromBase64(photoA)]

            clearInterval(interval)
            toast('')
            resolve({
              preview: photoB,
              result : result,
            })
          }
        }
      }, 1000 / MOTION_FPS)

      toast('Move your head slowly. Your photo will be taken automatically')
    })
  },
})
