import type * as VueUse from '@vueuse/core'
import { fireEvent, render } from '@testing-library/vue'
import { vi } from 'vitest'
import {
  resetHook,
  triggerDrag,
  useDrag,
} from './__mocks__/use-drag'
import { useElementBounding } from './__mocks__/use-element-bounding'
import InputRange from './InputRange.vue'
import { ref } from 'vue-demi'
import { delay } from 'nanodelay'

class FakeMouseEvent extends MouseEvent {
  pageX: number

  constructor (type: string, pageX: number) {
    super(type)

    this.pageX = pageX
  }
}

vi.mock('./utils/use-drag.ts', () => ({ default: useDrag }))

vi.mock('@vueuse/core', async () => {
  const vueuse = await vi.importActual('@vueuse/core')

  return {
    ...vueuse as typeof VueUse,
    useElementBounding,
  }
})

beforeEach(() => {
  resetHook()
})

it('should render properly without any prop', () => {
  const screen = render({
    components: { InputRange },
    template  : '<input-range />',
  })

  const input = screen.queryByTestId('input-range')

  expect(input).toBeInTheDocument()
  expect(input).toHaveClass('input-range')
})

it('should have double thumb if multiple prop is provided', () => {
  const screen = render({
    components: { InputRange },
    template  : '<input-range multiple />',
  })

  const start = screen.queryByTestId('thumb-start')

  expect(start).toBeInTheDocument()
  expect(start).toBeVisible()
})

it('should have disabled state if prop disabled was provided', () => {
  const screen = render({
    components: { InputRange },
    template  : '<input-range disabled />',
  })

  const input = screen.queryByTestId('input-range')

  expect(input).toBeInTheDocument()
  expect(input).toHaveClass('input-range', 'input-range--disabled')
})

it('should have readonly state if prop readonly was provided', () => {
  const screen = render({
    components: { InputRange },
    template  : '<input-range readonly />',
  })

  const input = screen.queryByTestId('input-range')

  expect(input).toBeInTheDocument()
  expect(input).toHaveClass('input-range', 'input-range--readonly')
})

it('should have error state if prop error was provided', () => {
  const screen = render({
    components: { InputRange },
    template  : '<input-range error />',
  })

  const input = screen.queryByTestId('input-range')

  expect(input).toBeInTheDocument()
  expect(input).toHaveClass('input-range', 'input-range--error', 'state--error')
})

it('should able to change value inside v-model', async () => {
  const model = ref(100)

  const screen = render({
    components: { InputRange },
    template  : '<input-range v-model="model" />',
    setup () {
      return { model }
    },
  })

  await delay(0)

  const thumbEnd = screen.queryByTestId('thumb-end')

  await triggerDrag(thumbEnd, 70)

  expect(model.value).toBe(70)
})

it('should able to change value inside v-model (multiple)', async () => {
  const model = ref([0, 100])

  const screen = render({
    components: { InputRange },
    template  : '<input-range v-model="model" multiple />',
    setup () {
      return { model }
    },
  })

  await delay(0)

  const thumbStart = screen.queryByTestId('thumb-start')
  const thumbEnd   = screen.queryByTestId('thumb-end')

  await triggerDrag(thumbStart, 30)
  await triggerDrag(thumbEnd, 70)

  expect(model.value).toStrictEqual([30, 70])
})

it('also able to change value inside v-model:start and v-model:end', async () => {
  const start = ref(0)
  const end   = ref(100)

  const screen = render({
    components: { InputRange },
    template  : `
      <input-range
        v-model:start="start"
        v-model:end="end"
        multiple
      />
    `,
    setup () {
      return {
        start,
        end,
      }
    },
  })

  await delay(0)

  const thumbStart = screen.queryByTestId('thumb-start')
  const thumbEnd   = screen.queryByTestId('thumb-end')

  await triggerDrag(thumbStart, 30)
  await triggerDrag(thumbEnd, 70)

  expect(start.value).toStrictEqual(30)
  expect(end.value).toStrictEqual(70)
})

it('should have value between min and max value', async () => {
  const model = ref(100)

  const screen = render({
    components: { InputRange },
    template  : '<input-range v-model="model" min="100" max="500" />',
    setup () {
      return { model }
    },
  })

  await delay(0)

  const thumbEnd = screen.queryByTestId('thumb-end')

  await triggerDrag(thumbEnd, 70)

  expect(model.value).toBe(0.7 * (500 - 100) + 100)
})

it('should able to set value using click on trackbar', async () => {
  const model = ref([40, 60])

  const screen = render({
    components: { InputRange },
    template  : '<input-range v-model="model" multiple />',
    setup () {
      return { model }
    },
  })

  await delay(0)

  const lowerTrack  = screen.queryByTestId('track-lower')
  const activeTrack = screen.queryByTestId('track-active')
  const upperTrack  = screen.queryByTestId('track-upper')

  await fireEvent(lowerTrack, new FakeMouseEvent('click', 20))

  expect(model.value).toStrictEqual([20, 60])

  await fireEvent(upperTrack, new FakeMouseEvent('click', 90))

  expect(model.value).toStrictEqual([20, 90])

  await fireEvent(activeTrack, new FakeMouseEvent('click', 40))
  await fireEvent(activeTrack, new FakeMouseEvent('click', 80))

  expect(model.value).toStrictEqual([40, 80])
})
