import { defineAdapter } from './adapter'
import { BrowserQRCodeReader } from '@zxing/browser'
import { takePicture } from '../utils/take-picture'

export default defineAdapter({
  meta: {
    mask         : 'square',
    facingMode   : 'environment',
    autoStart    : true,
    transformable: false,
  },
  async run ({ video, notify }) {
    const reader = new BrowserQRCodeReader()
    const result = await reader.decodeOnceFromVideoElement(video.value)
    const image  = takePicture(video.value)
    const text   = result.getText()

    notify(text)

    return [image, text]
  },
})
