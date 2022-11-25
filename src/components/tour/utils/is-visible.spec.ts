import { vi } from 'vitest'
import { focus as scrollIntoView } from './__mocks__/is-visible'
import { isVisible, focus } from './is-visible'

vi.mock('scroll-into-view', () => ({ default: scrollIntoView }))

describe('isVisible', () => {
  const elementFromPoint = vi.fn()

  beforeAll(() => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(700)
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(600)

    Object.defineProperty(document, 'elementFromPoint', {
      get () {
        return elementFromPoint
      },
    })
  })

  it('should return false if target is undefined', () => {
    const target = undefined

    expect(isVisible(target)).toBe(false)
  })

  it('should return false if target is display none', () => {
    const target = document.createElement('div')

    target.style.display = 'none'

    document.body.append(target)

    expect(isVisible(target)).toBe(false)
  })

  it('should return false if target is visibility hidden', () => {
    const target = document.createElement('div')

    target.style.visibility = 'hidden'

    document.body.append(target)

    expect(isVisible(target)).toBe(false)
  })

  it('should return false if target is opacity under 0.1', () => {
    const target = document.createElement('div')

    target.style.visibility = 'visible'
    target.style.opacity    = '0.05'

    document.body.append(target)

    expect(isVisible(target)).toBe(false)
  })

  it('should return false if target has no boundary size', () => {
    const target = document.createElement('div')

    target.style.visibility = 'visible'

    document.body.append(target)

    expect(isVisible(target)).toBe(false)
  })

  it('should return false if target has negative x or y', () => {
    const target = document.createElement('div')

    target.style.visibility = 'visible'

    document.body.append(target)

    vi.spyOn(target, 'getBoundingClientRect')
      .mockReturnValue({
        top   : -500,
        x     : -500,
        left  : -400,
        y     : -400,
        width : 300,
        height: 300,
        bottom: 0,
        right : 0,
        toJSON: vi.fn(),
      })

    expect(isVisible(target)).toBe(false)
  })

  it('should return false if target has outside screen', () => {
    const target = document.createElement('div')

    target.style.visibility = 'visible'

    document.body.append(target)

    vi.spyOn(target, 'getBoundingClientRect')
      .mockReturnValue({
        top   : 700,
        x     : 700,
        left  : 700,
        y     : 700,
        width : 300,
        height: 300,
        bottom: 0,
        right : 0,
        toJSON: vi.fn(),
      })

    expect(isVisible(target)).toBe(false)
  })

  it('should return false if target under other object', () => {
    const target  = document.createElement('div')
    const overlay = document.createElement('div')

    target.style.visibility = 'visible'

    document.body.append(target)
    document.body.append(overlay)

    vi.spyOn(target, 'getBoundingClientRect')
      .mockReturnValue({
        top   : 100,
        x     : 100,
        left  : 100,
        y     : 100,
        width : 300,
        height: 300,
        bottom: 0,
        right : 0,
        toJSON: vi.fn(),
      })

    elementFromPoint.mockReturnValueOnce(overlay)

    expect(isVisible(target)).toBe(false)
  })

  it('should return true if target visible', () => {
    const target = document.createElement('div')

    target.style.visibility = 'visible'

    document.body.append(target)

    vi.spyOn(target, 'getBoundingClientRect')
      .mockReturnValue({
        top   : 100,
        x     : 100,
        left  : 100,
        y     : 100,
        width : 300,
        height: 300,
        bottom: 0,
        right : 0,
        toJSON: vi.fn(),
      })

    elementFromPoint.mockReturnValueOnce(target)

    expect(isVisible(target)).toBe(true)
  })
})

describe('focus', () => {
  it('should call scroll-into-view', () => {
    const target = document.createElement('div')

    focus(target)

    expect(scrollIntoView).toBeCalled()
  })
})
