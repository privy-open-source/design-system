import { vi } from 'vitest'
import { runAdapter } from '../__mocks__/run-adapter'
import {
  sampleImage,
  sampleImage2,
  takePicture,
} from '../__mocks__/take-picture'
import * as motion from '../__mocks__/motion'
import LivenessAdapter from './liveness'

vi.mock('../utils/take-picture.ts', () => {
  return { takePicture }
})

vi.mock('../utils/motion.ts', () => motion)

afterEach(() => {
  vi.restoreAllMocks()
})

it('should capture image with motion', async () => {
  const output = await runAdapter(LivenessAdapter)

  expect(output.preview).toBe(sampleImage)
  expect(output.result).toBeArray()
  expect(output.result[0]).toBeInstanceOf(File)
  expect(output.result[1]).toBeInstanceOf(File)
})

it('should return base64 as result', async () => {
  takePicture
    .mockReturnValueOnce(sampleImage)
    .mockReturnValueOnce(sampleImage2)

  const output = await runAdapter(LivenessAdapter, { base64: true })

  expect(output.preview).toBe(sampleImage2)
  expect(output.result[0]).toBe(sampleImage2)
  expect(output.result[1]).toBe(sampleImage)
})
