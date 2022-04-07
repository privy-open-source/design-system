
import { vi } from "vitest"
import { colorHash, colorRandom } from "./color-hash"
import { loadImage } from "./utils"
import MockImage from "./__mocks__/image"

describe('colorHash', () => {
  it('should pick one of color, random by hashing some text', () => {
    const a = colorHash('Tarjono')
    const b = colorHash('Waluyo')
    const c = colorHash('Susilo Ahmad dimejo')

    expect(a).not.toEqual(b)
    expect(a).not.toEqual(c)
    expect(b).not.toEqual(c)
  })

  it('should pick same color if text is same', () => {
    const a = colorHash('Tarjono')
    const b = colorHash('Tarjono')

    expect(a).toEqual(b)
  })
})

describe('colorRandom', () => {
  it('should randomly pick one of color', () => {
    const mock = vi.spyOn(Math, 'random')

    mock
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.6)

    const a = colorRandom()
    const b = colorRandom()
    const c = colorRandom()

    expect(a).not.toEqual(b)
    expect(a).not.toEqual(c)
    expect(b).not.toEqual(c)
  })
})

describe('loadImage', () => {
  beforeAll(() => {
    vi.stubGlobal('Image', MockImage)
  })

  it('should resolved if url is valid url', () => {
    const promise = loadImage('/imageA.jpg')

    expect(promise).resolves.toBe('/imageA.jpg')
  })

  it('should rejected if url is broken link', () => {
    const promise = loadImage('/broken-link.jpg')

    expect(promise).rejects.toThrow()
  })

  it('should rejected if url not provided', () => {
    const promise = loadImage()

    expect(promise).rejects.toThrow()
  })
})
