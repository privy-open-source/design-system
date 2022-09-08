import { vi } from 'vitest'

const rotateImage = vi.fn(async (url: string, degrees: number) => `${url}___rotate(${degrees})`)

export default rotateImage
