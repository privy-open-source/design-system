import { vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// eslint-disable-next-line unicorn/prefer-module
export const sampleImage = `data:image/jpeg;base64,${readFileSync(resolve(__dirname, './sample.jpeg')).toString('base64')}`

// eslint-disable-next-line unicorn/prefer-module
export const sampleImage2 = `data:image/jpeg;base64,${readFileSync(resolve(__dirname, './sample-2.jpeg')).toString('base64')}`

export const takePicture = vi.fn(() => sampleImage)
