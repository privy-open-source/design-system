import { vi } from 'vitest'

export const rotateImage = vi.fn(async (url: string, degrees: number) => `${url}___rotate(${degrees})`)

export const replaceColor = vi.fn(async (url: string, color: string) => `${url}___color(${color})`)
