import { vi } from 'vitest'
import { BrowserQRCodeReader } from '@zxing/browser'
import { sampleImage, takePicture } from '../__mocks__/take-picture'
import { BarcodeFormat, Result } from '@zxing/library'
import { runAdapter, video } from '../__mocks__/run-adapter'
import QrCodeAdapter from './qr-code'

const decode = vi.spyOn(BrowserQRCodeReader.prototype, 'decodeOnceFromVideoElement')
  .mockResolvedValue(new Result('Hello World', new Uint8Array(), 8, [], BarcodeFormat.QR_CODE))

vi.mock('../utils/take-picture.ts', () => {
  return { takePicture }
})

it('should capture qr code', async () => {
  const output = await runAdapter(QrCodeAdapter)

  expect(output.preview).toBe(sampleImage)
  expect(output.result).toBe('Hello World')
  expect(decode).toBeCalledWith(video)
})

it('should capture image from video in mirror mode', async () => {
  const output = await runAdapter(QrCodeAdapter, { mirror: true })

  expect(output.preview).toBe(sampleImage)
  expect(takePicture).toBeCalledWith(video, true)
})
