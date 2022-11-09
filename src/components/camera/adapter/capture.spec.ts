import { vi } from 'vitest'
import { takePicture, sampleImage } from '../__mocks__/take-picture'
import CaptureAdapter from './capture'
import { runAdapter, video } from '../__mocks__/run-adapter'

vi.mock('../utils/take-picture.ts', () => {
  return { takePicture }
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('should capture image from video', async () => {
  const output = await runAdapter(CaptureAdapter)

  expect(output.preview).toBe(sampleImage)
  expect(output.result).toBeInstanceOf(File)
  expect(takePicture).toBeCalledWith(video, false)
})

it('should capture image from video in mirror mode', async () => {
  const output = await runAdapter(CaptureAdapter, { mirror: true })

  expect(output.preview).toBe(sampleImage)
  expect(takePicture).toBeCalledWith(video, true)
})

it('should return base64 as result', async () => {
  const output = await runAdapter(CaptureAdapter, { base64: true })

  expect(output.result).toBe(sampleImage)
  expect(takePicture).toBeCalledWith(video, false)
})
