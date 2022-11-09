import { fromBase64 } from '../../utils/base64'
import { takePicture } from '../utils/take-picture'
import { defineAdapter } from './adapter'

/**
 * Basic adapter for capture image from camera
 */
export default defineAdapter({
  meta: { facingMode: 'environment' },
  run ({ video, meta, modifier }) {
    const isMirrored = !!(meta.value.mirror && meta.value.mirror !== 'preview')
    const preview    = takePicture(video.value, isMirrored)
    const result     = modifier.value.base64 ? preview : fromBase64(preview)

    return { preview, result }
  },
})
