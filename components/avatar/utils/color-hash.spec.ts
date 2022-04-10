
import { vi } from "vitest"
import { colorHash, colorRandom } from "./color-hash"

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
