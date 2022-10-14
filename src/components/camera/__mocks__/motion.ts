import { vi } from 'vitest'

export const takeSample = vi.fn()

export const createTemplate = vi.fn(() => ({}))

export const motionDetection = vi.fn(() => 41)

export const MOTION_THRESHOLD = 40

export const MOTION_FPS = 15

export const MOTION_AREA_SIZE = 160
