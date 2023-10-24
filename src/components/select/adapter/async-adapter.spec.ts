/* eslint-disable unicorn/no-useless-undefined */
import { onScrollBottom, triggerScroll } from '../__mocks__/use-on-scroll'
import { vi } from 'vitest'
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

  const adapter = defineAsyncAdapter(handler, [value], { perPage: 3, debounceTime: 3 })

  return {
    value,
    handler,
    adapter,
  }
}

it('should be call Async Handler', async () => {
  const { adapter, handler } = createMockAdapter()
  const items                = adapter.setup({
    props: {
      options   : [],
      modelValue: undefined,
      selected  : undefined,
    },
    isLoading: ref(false),
    menuEl   : ref(),
    keyword  : ref(''),
    isOpen   : ref(true),
  })

  await delay(2)

  expect(handler).toBeCalled()
  expect(handler).toBeCalledWith('', 1, 3, undefined)

  expect(items.value).toStrictEqual([
    {
      text : 'Apple 1',
      value: 1,
    },
    {
      text : 'Apple 2',
      value: 2,
    },
    {
      text : 'Apple 3',
      value: 3,
    },
  ])
})

it('should be show loading if request is not finish', async () => {
  const { adapter } = createMockAdapter()
  const isLoading   = ref(false)
  const items       = adapter.setup({
    props: {
      options   : [],
      modelValue: undefined,
      selected  : undefined,
    },
    isLoading: isLoading,
    menuEl   : ref(),
    keyword  : ref(''),
    isOpen   : ref(true),
  })

  expect(isLoading.value).toBe(true)

  await delay(2)

  expect(isLoading.value).toBe(false)
  expect(items.value).toHaveLength(3)
})

it('should be show loading user start typing', async () => {
  const { adapter, handler } = createMockAdapter()
  const isLoading            = ref(false)
  const keyword              = ref('')
  const items                = adapter.setup({
    props: {
      options   : [],
      modelValue: undefined,
      selected  : undefined,
    },
    isLoading: isLoading,
    keyword  : keyword,
    menuEl   : ref(),
    isOpen   : ref(true),
  })

  expect(isLoading.value).toBe(true)

  await delay(2)

  expect(isLoading.value).toBe(false)

  keyword.value = 'aa'

  await nextTick()

  expect(isLoading.value).toBe(true)
  expect(items.value).toHaveLength(0)
  expect(handler).toBeCalledTimes(1)
})

it('should be reload when user finish typing', async () => {
  const { adapter, handler } = createMockAdapter()
  const isLoading            = ref(false)
  const keyword              = ref('')
  const items                = adapter.setup({
    props: {
      options   : [],
      modelValue: undefined,
      selected  : undefined,
    },
    isLoading: isLoading,
    keyword  : keyword,
    menuEl   : ref(),
    isOpen   : ref(true),
  })

  expect(isLoading.value).toBe(true)

  await delay(2)

  expect(isLoading.value).toBe(false)

  keyword.value = 'nn'

  await nextTick()

  expect(handler).toBeCalledTimes(1)

  await delay(4)

  expect(handler).toBeCalledTimes(2)
  expect(handler).toBeCalledWith('nn', 1, 3, undefined)

  await delay(2)

  expect(items.value).toHaveLength(3)
})

it('should load next items if user scroll to bottom', async () => {
  const { adapter, handler } = createMockAdapter()
  const items                = adapter.setup({
    props: {
      options   : [],
      modelValue: undefined,
      selected  : undefined,
    },
    isLoading: ref(false),
    menuEl   : ref(),
    keyword  : ref(''),
    isOpen   : ref(true),
  })

  await delay(2)

  expect(handler).toBeCalled()
  expect(handler).toBeCalledWith('', 1, 3, undefined)

  expect(items.value).toStrictEqual([
    {
      text : 'Apple 1',
      value: 1,
    },
    {
      text : 'Apple 2',
      value: 2,
    },
    {
      text : 'Apple 3',
      value: 3,
    },
  ])

  expect(handler).toBeCalledTimes(1)

  triggerScroll()

  expect(handler).toBeCalledTimes(2)
  expect(handler).toBeCalledWith('', 2, 3, undefined)
})

it('should not load next items if all items already loaded (finished loaded)', async () => {
  const { adapter, handler } = createMockAdapter()
  const items                = adapter.setup({
    props: {
      options   : [],
      modelValue: undefined,
      selected  : undefined,
    },
    isLoading: ref(false),
    menuEl   : ref(),
    keyword  : ref(''),
    isOpen   : ref(true),
  })

  await delay(2)

  expect(items.value).toStrictEqual([
    {
      text : 'Apple 1',
      value: 1,
    },
    {
      text : 'Apple 2',
      value: 2,
    },
    {
      text : 'Apple 3',
      value: 3,
    },
  ])

  triggerScroll()

  expect(handler).toBeCalledTimes(2)
  expect(handler).toBeCalledWith('', 2, 3, undefined)

  triggerScroll()

  expect(handler).toBeCalledTimes(2)
})

it('should reload if handler have track deps, and the deps is changed', async () => {
  const { adapter, handler, value } = createMockAdapter()
  const items                       = adapter.setup({
    props: {
      options   : [],
      modelValue: undefined,
      selected  : undefined,
    },
    isLoading: ref(false),
    menuEl   : ref(),
    keyword  : ref(''),
    isOpen   : ref(true),
  })

  await delay(2)

  expect(items.value).toStrictEqual([
    {
      text : 'Apple 1',
      value: 1,
    },
    {
      text : 'Apple 2',
      value: 2,
    },
    {
      text : 'Apple 3',
      value: 3,
    },
  ])

  value.value = 'Grape'

  await nextTick()
  await delay(2)

  expect(handler).toBeCalledTimes(2)
  expect(items.value).toStrictEqual([
    {
      text : 'Grape 1',
      value: 1,
    },
    {
      text : 'Grape 2',
      value: 2,
    },
    {
      text : 'Grape 3',
      value: 3,
    },
  ])
})

it('should no nothing if handler throw an error', async () => {
  const { adapter, handler } = createMockAdapter()
  const isLoading            = ref(false)
  const keyword              = ref('')
  const items                = adapter.setup({
    props: {
      options   : [],
      modelValue: undefined,
      selected  : undefined,
    },
    isLoading: isLoading,
    keyword  : keyword,
    menuEl   : ref(),
    isOpen   : ref(true),
  })

  vi.spyOn(console, 'error').mockReturnThis()

  expect(isLoading.value).toBe(true)

  await delay(2)

  expect(isLoading.value).toBe(false)

  keyword.value = 'fail'

  await nextTick()

  expect(handler).toBeCalledTimes(1)

  await delay(4)

  expect(handler).toBeCalledTimes(2)
  expect(handler).toBeCalledWith('fail', 1, 3, undefined)

  await delay(2)

  expect(isLoading.value).toBe(false)
  expect(items.value).toHaveLength(0)
})
