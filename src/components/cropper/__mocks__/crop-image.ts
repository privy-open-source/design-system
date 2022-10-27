import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { vi } from 'vitest'

// eslint-disable-next-line unicorn/prefer-module
export const sampleImage = `data:image/png;base64,${readFileSync(resolve(__dirname, './cropped-img.png')).toString('base64')}`

export const cropImage = vi.fn(() => sampleImage)
