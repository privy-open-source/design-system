import { onScrollBottom, triggerScroll } from '../__mocks__/use-on-scroll'
import { fireEvent, render } from '@testing-library/vue'
import { vi } from 'vitest'
import Select from '../Select.vue'
import defineAsyncAdapter, { LoadFn } from './async-adapter'
import { nextTick, ref } from 'vue-demi'
import { delay } from 'nanodelay'

vi.mock('../utils/use-on-scroll', () => {
  return { onScrollBottom: onScrollBottom }
})

function createMockAdapter () {
  const value           = ref('Apple')
  const handler: LoadFn = vi.fn(async (keyword, page, perPage) => {
    await delay(1)

    if (keyword === 'fail')
      throw new Error('Mock Error')

    if (page >= 2)
      return []

    const result = []
    const start  = (page - 1) * perPage
    const until  = start + perPage

    for (let i = start + 1; i <= until; ++i) {
      result.push({
        text : `${value.value} ${i}`,
        value: i,
      })
    }

    return result
  })

  const adapter = defineAsyncAdapter(handler, [value])

  return {
    value,
    handler,
    adapter,
  }
}

it('should be call Async Handler', async () => {
  const { adapter, handler } = createMockAdapter()
  const screen               = render({
    components: { Select },
    template  : `
      <Select
        :adapter="adapter" />
    `,
    setup () {
      return { adapter }
    },
  })

  const select = screen.queryByTestId('select')

  expect(select).toBeInTheDocument()
  expect(handler).toBeCalled()
  expect(handler).toBeCalledWith('', 1, 20)
})

it('should be show loading if request is not finish', async () => {
  const { adapter, handler } = createMockAdapter()
  const screen               = render({
    components: { Select },
    template  : `
      <Select
        :adapter="adapter" />
    `,
    setup () {
      return { adapter }
    },
  })

  const select = screen.queryByTestId('select')

  await fireEvent.click(select)

  const loading = screen.queryByTestId('select-loading')

  expect(handler).toBeCalledTimes(1)
  expect(select).toBeInTheDocument()
  expect(loading).toBeInTheDocument()

  await delay(2)

  expect(handler).toBeCalledTimes(1)
  expect(loading).not.toBeInTheDocument()
})

it('should be show loading user start typing', async () => {
  const { adapter, handler } = createMockAdapter()
  const screen               = render({
    components: { Select },
    template  : `
      <Select
        :adapter="adapter" />
    `,
    setup () {
      return { adapter }
    },
  })

  const select = screen.queryByTestId('select')
  const search = screen.queryByTestId('select-search')

  await delay(2)
  await fireEvent.click(select)

  expect(handler).toBeCalledTimes(1)
  expect(select).toBeInTheDocument()

  await fireEvent.focus(search)
  await fireEvent.update(search, 'nn')

  const loading = screen.queryByTestId('select-loading')

  expect(loading).toBeInTheDocument()
})

it('should be reload when user finish typing', async () => {
  const { adapter, handler } = createMockAdapter()
  const screen               = render({
    components: { Select },
    template  : `
      <Select
        :adapter="adapter" />
    `,
    setup () {
      return { adapter }
    },
  })

  const select = screen.queryByTestId('select')
  const search = screen.queryByTestId('select-search')

  await delay(2)
  await fireEvent.click(select)

  expect(handler).toBeCalledTimes(1)
  expect(select).toBeInTheDocument()

  vi.useFakeTimers()

  await fireEvent.focus(search)
  await fireEvent.update(search, 'nn')

  vi.advanceTimersByTime(501)

  expect(handler).toBeCalledTimes(2)
  expect(handler).toBeCalledWith('nn', 1, 20)

  vi.useRealTimers()
})

it('should load next items if user scroll to bottom', async () => {
  const { adapter, handler } = createMockAdapter()
  const screen               = render({
    components: { Select },
    template  : `
      <Select
        :adapter="adapter" />
    `,
    setup () {
      return { adapter }
    },
  })

  const select = screen.queryByTestId('select')

  await delay(2)
  await fireEvent.click(select)

  expect(handler).toBeCalledTimes(1)
  expect(select).toBeInTheDocument()

  triggerScroll()

  expect(handler).toBeCalledTimes(2)
  expect(handler).toBeCalledWith('', 2, 20)
})

it('should not load next items if all items already loaded (finished loaded)', async () => {
  const { adapter, handler } = createMockAdapter()
  const screen               = render({
    components: { Select },
    template  : `
      <Select
        :adapter="adapter" />
    `,
    setup () {
      return { adapter }
    },
  })

  const select = screen.queryByTestId('select')

  await delay(2)
  await fireEvent.click(select)

  expect(handler).toBeCalledTimes(1)
  expect(select).toBeInTheDocument()

  triggerScroll()

  expect(handler).toBeCalledTimes(2)
  expect(handler).toBeCalledWith('', 2, 20)

  triggerScroll()

  expect(handler).toBeCalledTimes(2)
})

it('should reload if handler have track deps, and the deps is changed', async () => {
  const { adapter, handler, value } = createMockAdapter()
  const screen                      = render({
    components: { Select },
    template  : `
      <Select
        :adapter="adapter" />
    `,
    setup () {
      return { adapter }
    },
  })

  const select = screen.queryByTestId('select')

  await delay(2)
  await fireEvent.click(select)

  expect(handler).toBeCalledTimes(1)
  expect(select).toBeInTheDocument()

  value.value = 'Grape'
  await nextTick()

  expect(handler).toBeCalledTimes(2)
  expect(handler).toBeCalledWith('', 1, 20)
})

it('should no nothing if handler throw an error', async () => {
  const { adapter, handler } = createMockAdapter()
  const screen               = render({
    components: { Select },
    template  : `
      <Select
        :adapter="adapter" />
    `,
    setup () {
      return { adapter }
    },
  })

  const select = screen.queryByTestId('select')
  const search = screen.queryByTestId('select-search')

  await delay(2)
  await fireEvent.click(select)

  expect(handler).toBeCalledTimes(1)
  expect(select).toBeInTheDocument()

  vi.useFakeTimers()
  vi.spyOn(console, 'error').mockReturnThis()

  await fireEvent.focus(search)
  await fireEvent.update(search, 'fail')

  vi.advanceTimersByTime(501)

  const loading = screen.queryByTestId('select-loading')

  vi.advanceTimersByTime(2)
  await nextTick()

  expect(loading).not.toBeInTheDocument()

  vi.useRealTimers()
})
