import { vi } from 'vitest'
import MockImage from '../__mocks__/image'
import loadImage from './load-image'

vi.stubGlobal('Image', MockImage)

it('should resolved if url is valid url', () => {
  const promise = loadImage('/imageA.jpg')

  expect(promise).resolves.toContain({ src: '/imageA.jpg' })
})

it('should rejected if url is broken link', () => {
  const promise = loadImage('/broken-link.jpg')

  expect(promise).rejects.toThrow()
})

it('should rejected if url not provided', () => {
  const promise = loadImage()

  expect(promise).rejects.toThrow()
})
