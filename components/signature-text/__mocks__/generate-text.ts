import { vi } from 'vitest'
import type { GenerateOptions } from '../utils/generate-text'

const generate = vi.fn(async (options: GenerateOptions) => {
  if (options.text === 'failed')
    throw new Error('Should throw error')

  return 'data:image/png;base64,dataSample123456789'
})

export default generate
