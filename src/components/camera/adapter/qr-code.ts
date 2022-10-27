import { defineAdapter } from './adapter'
import { BrowserQRCodeReader } from '@zxing/browser'
import { takePicture } from '../utils/take-picture'

export default defineAdapter({
  meta: {
    mask      : 'square',
    facingMode: 'environment',
    autoStart : true,
  },
  async run ({ video, toast, meta }) {
    const isMirrored = !!(meta.value.mirror && meta.value.mirror !== 'preview')
    const reader     = new BrowserQRCodeReader()
    const result     = await reader.decodeOnceFromVideoElement(video.value)
    const image      = takePicture(video.value, isMirrored)
    const text       = result.getText()

    toast(text)

    return { preview: image, result: text }
  },
})
