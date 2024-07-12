import { vi } from 'vitest'
import { fireEvent } from '@testing-library/dom'
import { addHoverListener } from './on-hover'
import { delay } from 'nanodelay'

it('should fix fast mouseenter - mouseleave', async () => {
  const target     = document.createElement('span')
  const onHoverIn  = vi.fn()
  const onHoverOut = vi.fn()

  document.body.append(target)

  addHoverListener(target, { onHoverIn, onHoverOut })

  fireEvent.mouseEnter(target)
  fireEvent.mouseLeave(target)
  fireEvent.mouseEnter(target)
  fireEvent.mouseLeave(target)
  fireEvent.mouseEnter(target)

  await delay(0)

  expect(onHoverIn).toBeCalledTimes(1)
  expect(onHoverOut).toBeCalledTimes(0)
})

it('should trigger hover out after some periodic', async () => {
  const target     = document.createElement('span')
  const onHoverIn  = vi.fn()
  const onHoverOut = vi.fn()

  document.body.append(target)

  addHoverListener(target, {
    onHoverIn,
    onHoverOut,
    debounced: 2,
  })

  fireEvent.mouseEnter(target)
  fireEvent.mouseLeave(target)
  fireEvent.mouseEnter(target)
  fireEvent.mouseLeave(target)
  fireEvent.mouseEnter(target)

  await delay(0)

  expect(onHoverIn).toBeCalledTimes(1)
  expect(onHoverOut).toBeCalledTimes(0)

  fireEvent.mouseLeave(target)
  fireEvent.mouseEnter(target)
  fireEvent.mouseLeave(target)

  await delay(3)

  expect(onHoverIn).toBeCalledTimes(1)
  expect(onHoverOut).toBeCalledTimes(1)
})

it('should trigger hover in if delay provided', async () => {
  const target     = document.createElement('span')
  const onHoverIn  = vi.fn()
  const onHoverOut = vi.fn()

  document.body.append(target)

  addHoverListener(target, {
    onHoverIn,
    onHoverOut,
    delay: 2,
  })

  fireEvent.mouseEnter(target)
  fireEvent.mouseLeave(target)
  fireEvent.mouseEnter(target)
  fireEvent.mouseLeave(target)
  fireEvent.mouseEnter(target)

  await delay(0)

  expect(onHoverIn).toBeCalledTimes(0)
  expect(onHoverOut).toBeCalledTimes(0)

  await delay(3)

  expect(onHoverIn).toBeCalledTimes(1)
  expect(onHoverOut).toBeCalledTimes(0)
})

it('should not trigger hover in if mouseleave before delay', async () => {
  const target     = document.createElement('span')
  const onHoverIn  = vi.fn()
  const onHoverOut = vi.fn()

  document.body.append(target)

  addHoverListener(target, {
    onHoverIn,
    onHoverOut,
    delay: 2,
  })

  fireEvent.mouseEnter(target)
  fireEvent.mouseLeave(target)
  fireEvent.mouseEnter(target)
  fireEvent.mouseLeave(target)
  fireEvent.mouseEnter(target)

  await delay(0)

  expect(onHoverIn).toBeCalledTimes(0)
  expect(onHoverOut).toBeCalledTimes(0)

  fireEvent.mouseLeave(target)

  await delay(3)

  expect(onHoverIn).toBeCalledTimes(0)
  expect(onHoverOut).toBeCalledTimes(0)
})
