import { vi } from 'vitest'
import { focus as scrollIntoView } from './__mocks__/is-visible'
import { focus } from './focus'

vi.mock('scroll-into-view', () => ({ default: scrollIntoView }))

describe('focus', () => {
  it('should call scroll-into-view', () => {
    const target = document.createElement('div')

    focus(target)

    expect(scrollIntoView).toBeCalled()
  })
})
