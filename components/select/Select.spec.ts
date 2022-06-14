import { onStartTyping, triggerTyping } from './__mocks__/on-start-typing'
import { fireEvent, render } from '@testing-library/vue'
import { vi } from 'vitest'
import { ref, nextTick } from 'vue-demi'
import Select from './Select.vue'
import type * as VueUser from '@vueuse/core'
import defineAsyncAdapter from './adapter/async-adapter'
import { delay } from 'nanodelay'

vi.mock('@vueuse/core', async () => {
  const core = await vi.importActual('@vueuse/core')

  return {
    ...core as typeof VueUser,
    onStartTyping,
  }
})

it('should render properly without any prop', () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select />
    `,
  })

  const select = screen.getByTestId('select')

  expect(select).toBeInTheDocument()
  expect(select).toHaveClass('select')
})

it('should open if input is focused', async () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select />
    `,
  })

  const select = screen.getByTestId('select')
  const input  = screen.getByTestId('select-search')

  expect(select).toBeInTheDocument()
  expect(select).toHaveClass('select')
  expect(select).not.toHaveClass('select--open')

  await fireEvent.focus(input)

  expect(select).toHaveClass('select--open')
})

it('should be able to set input placeholder with prop `placeholder`', () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select placeholder="CobaLagi" />
    `,
  })

  const input = screen.getByTestId('select-search')

  expect(input).toHaveAttribute('placeholder', 'CobaLagi')
})

it('should be able to change empty text via `empty-text` prop', () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select empty-text="kosong" />
    `,
  })

  const emptyText = screen.queryByText('kosong')

  expect(emptyText).toBeInTheDocument()
})

it('should be able to change loading text via `loading-text` prop', async () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select
        :adapter="adapter"
        loading-text="Menunggu..." />
    `,
    setup () {
      const adapter = defineAsyncAdapter(async () => {
        await delay(100)

        return []
      })

      return { adapter }
    },
  })

  const select = screen.queryByTestId('select')

  await fireEvent.click(select)

  const loadingText = screen.queryByText('Menunggu...')

  expect(loadingText).toBeInTheDocument()
})

it('should have style readonly if props disabled is provided', () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select disabled />
    `,
  })

  const select = screen.queryByTestId('select')

  expect(select).toHaveClass('select', 'select--disabled')
})

it('should have not able to open if select is disabled', async () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select disabled />
    `,
  })

  const select = screen.queryByTestId('select')
  const input  = screen.queryByTestId('select-search')

  await fireEvent.focus(input)

  expect(select).toHaveClass('select--disabled')
  expect(select).not.toHaveClass('select--open')
})

it('should have not able to open if select is readonly', async () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select readonly />
    `,
  })

  const select = screen.queryByTestId('select')
  const input  = screen.queryByTestId('select-search')

  await fireEvent.focus(input)

  expect(select).toHaveClass('select--readonly')
  expect(select).not.toHaveClass('select--open')
})

it('should modify state in v-model', async () => {
  const model  = ref()
  const screen = render({
    components: { Select },
    template  : `
      <Select
        v-model="model"
        :options="['apple', 'grape', 'orange']"
      />
    `,
    setup () {
      return { model }
    },
  })

  const items = screen.queryAllByTestId('select-item')

  await fireEvent.click(items.at(1))

  expect(model.value).toBe('grape')
})

it('should modify state in v-model:selected', async () => {
  const model  = ref()
  const screen = render({
    components: { Select },
    template  : `
      <Select
        v-model:selected="model"
        :options="['apple', 'grape', 'orange']"
      />
    `,
    setup () {
      return { model }
    },
  })

  const items = screen.queryAllByTestId('select-item')

  await fireEvent.click(items.at(1))

  expect(model.value).toStrictEqual({ text: 'grape', value: 'grape' })
})

it('should trigger event `user-input` when real user selecting the item', async () => {
  const spy    = vi.fn()
  const screen = render({
    components: { Select },
    template  : `
      <Select
        @user-input="onInput"
        :options="['apple', 'grape', 'orange']"
      />
    `,
    setup () {
      return { onInput: spy }
    },
  })

  const input = screen.queryByTestId('select-search')

  await fireEvent.focus(input)

  const items = screen.queryAllByTestId('select-item')

  await fireEvent.click(items.at(1))

  expect(spy).toBeCalled()
})

it('should re-focus to search input if user start typing while focus on items', async () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select
        :options="['apple', 'grape', 'orange']"
      />
    `,
  })

  const input = screen.queryByTestId('select-search')
  const items = screen.queryAllByTestId('select-item')

  input.focus()
  items.at(1).focus()

  expect(items.at(1)).toHaveFocus()

  triggerTyping()
  await nextTick()

  expect(input).toHaveFocus()
})
