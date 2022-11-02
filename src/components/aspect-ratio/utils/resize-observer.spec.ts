import { getObserver } from './resize-observer'

it('should return resize observer instance', async () => {
  const instance = await getObserver()

  expect(instance).toBeInstanceOf(ResizeObserver)
})

it('should return singleton instance', async () => {
  const a = await getObserver()
  const b = await getObserver()

  expect(a).toBe(b)
})

it('should use polyfill if browser not support ResizeObserver', async () => {
  window.ResizeObserver = undefined

  const instance = await getObserver()

  expect(instance).not.toBeUndefined()
  expect(instance.observe).toBeFunction()
  expect(instance.unobserve).toBeFunction()
  expect(instance.disconnect).toBeFunction()
})
