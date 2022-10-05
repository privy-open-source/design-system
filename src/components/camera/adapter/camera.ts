import { takePicture } from '../utils/take-picture'
import { defineAdapter } from './adapter'

/**
 * Simple adapter for capture image from camera
 */
export default defineAdapter({
  meta: { facingMode: 'environment' },
  run ({ video }) {
    return takePicture(video.value)
  },
})
