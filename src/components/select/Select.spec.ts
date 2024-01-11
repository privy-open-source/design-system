import { onStartTyping, triggerTyping } from './__mocks__/on-start-typing'
import { fireEvent, render } from '@testing-library/vue'
import { vi } from 'vitest'
import {
  ref,
  nextTick,
} from 'vue-demi'
import Select from './Select.vue'
import type * as VueUse from '@vueuse/core'
import defineAsyncAdapter from './adapter/async-adapter'
import { delay } from 'nanodelay'

vi.mock('@vueuse/core', async () => {
  const core = await vi.importActual('@vueuse/core')

  return {
    ...core as typeof VueUse,
    onStartTyping,
  }
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('should render properly without any prop', () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select />
    `,
  })

  const select = screen.queryByTestId('select')

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

  const select = screen.queryByTestId('select')
  const input  = screen.queryByTestId('select-activator')

  expect(select).toBeInTheDocument()
  expect(select).toHaveClass('select')
  expect(select).not.toHaveClass('select--open')

  input.focus()
  await nextTick()

  expect(select).toHaveClass('select--open')
})

it('should focus on search input when opened', async () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select no-animation />
    `,
  }, { global: { stubs: { transition: false } } })

  const select = screen.queryByTestId('select')
  const input  = screen.queryByTestId('select-activator')

  expect(select).toBeInTheDocument()
  expect(select).toHaveClass('select')
  expect(select).not.toHaveClass('select--open')

  input.focus()
  await nextTick()

  expect(select).toHaveClass('select--open')

  await nextTick()

  expect(screen.queryByTestId('select-search')).toHaveFocus()

  await fireEvent.click(window)
  await delay(0)

  expect(select).not.toHaveClass('select--open')
})

it('should reset search keyword when closed', async () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select no-animation />
    `,
  }, { global: { stubs: { transition: false } } })

  const select = screen.queryByTestId('select')
  const caret  = screen.queryByTestId('select-caret-icon')

  await fireEvent.click(caret)

  expect(select).toHaveClass('select--open')

  await fireEvent.update(screen.queryByTestId('select-search'), 'Hello World')

  expect(screen.queryByTestId('select-search')).toHaveValue('Hello World')

  await fireEvent.click(caret)

  expect(screen.queryByTestId('select-search')).toHaveValue('')
})

it('should be able to set input placeholder with prop `placeholder`', () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select placeholder="CobaLagi" />
    `,
  })

  const placeholder = screen.queryByTestId('select-placeholder')

  expect(placeholder).toBeInTheDocument()
  expect(placeholder).toHaveTextContent('CobaLagi')
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

  input.focus()
  await nextTick()

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

  input.focus()
  await nextTick()

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

  const input = screen.queryByTestId('select-search')

  input.focus()
  await nextTick()

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

  const input = screen.queryByTestId('select-search')

  input.focus()
  await nextTick()

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

  const input = screen.queryByTestId('select-activator')

  input.focus()
  await nextTick()

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

  const input = screen.queryByTestId('select-activator')

  input.focus()
  await nextTick()

  screen.queryAllByTestId('select-item').at(1).focus()
  await nextTick()

  expect(screen.queryAllByTestId('select-item').at(1)).toHaveFocus()

  triggerTyping()
  await nextTick()

  expect(screen.queryByTestId('select-search')).toHaveFocus()
})

it('should have style error if `error` prop was provided', () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select error />
    `,
  })

  const select = screen.queryByTestId('select-activator')

  expect(select).toHaveClass('state--error')
})

it('should able to add section label via `section-label` prop', () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select
        :options="['apple', 'grape', 'orange']"
        section-label="title"
      />
    `,
  })

  const label = screen.queryByTestId('select-label')

  expect(label).toBeInTheDocument()
  expect(label).toHaveTextContent('title')
})

it('should be toggle dropdown if caret icon is clicked', async () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select />
    `,
  })

  const select = screen.queryByTestId('select')

  expect(select).toBeInTheDocument()
  expect(select).not.toHaveClass('select--open')

  const caretIcon = screen.queryByTestId('select-caret-icon')

  await fireEvent.click(caretIcon)
  await nextTick()

  expect(select).toHaveClass('select--open')

  await fireEvent.click(caretIcon)
  await nextTick()

  expect(select).not.toHaveClass('select--open')
})

it('should be toggle dropdown via `caret` slot-scope function', async () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select>
        <template #caret="{ toggle }">
          <div @click="toggle">Toggle</div>
        </template>
      </Select>
    `,
  })

  const select = screen.queryByTestId('select')

  expect(select).toBeInTheDocument()
  expect(select).not.toHaveClass('select--open')

  const toggle = screen.queryByText('Toggle')

  await fireEvent.click(toggle)
  await nextTick()

  expect(select).toHaveClass('select--open')

  await fireEvent.click(toggle)
  await nextTick()

  expect(select).not.toHaveClass('select--open')
})

it('should hide caret icon if props `no-caret` is provided', () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select no-caret />
    `,
  })

  const caret = screen.queryByTestId('select-caret-icon')

  expect(caret).not.toBeInTheDocument()
})

it('should have not able to open if `caret` icon is clicked and select is disabled', async () => {
  const screen = render({
    components: { Select },
    template  : `
      <Select disabled />
    `,
  })

  const select = screen.queryByTestId('select')

  expect(select).toBeInTheDocument()
  expect(select).not.toHaveClass('select--open')

  const caretIcon = screen.queryByTestId('select-caret-icon')

  await fireEvent.click(caretIcon)
  await nextTick()

  expect(select).toHaveClass('select--disabled')
  expect(select).not.toHaveClass('select--open')
})

it('should have clear button if prop `clearable` was provided', async () => {
  const model  = ref()
  const screen = render({
    components: { Select },
    template  : `
      <Select
        v-model:selected="model"
        :options="['apple', 'grape', 'orange']"
        clearable
      />
    `,
    setup () {
      return { model }
    },
  })

  const input = screen.queryByTestId('select-activator')

  await fireEvent.focus(input)

  const items = screen.queryAllByTestId('select-item')

  await fireEvent.click(items.at(1))

  expect(model.value).toStrictEqual({ text: 'grape', value: 'grape' })

  const clear = screen.queryByTestId('select-clear')

  expect(clear).toBeInTheDocument()

  await fireEvent.click(clear)

  expect(model.value).toBeUndefined()
})

it('should clear search keyword if click clear button when select was opened', async () => {
  const model  = ref()
  const screen = render({
    components: { Select },
    template  : `
      <Select
        v-model="model"
        :options="['apple', 'grape', 'orange']"
        clearable
      />
    `,
    setup () {
      return { model }
    },
  })

  await fireEvent.update(screen.queryByTestId('select-search'), 'Hello World')

  expect(screen.queryByTestId('select-search')).toHaveValue('Hello World')

  await fireEvent.click(screen.queryByTestId('input-clear'))

  expect(screen.queryByTestId('select-search')).toHaveValue('')
})

it('should able to select multiple value if prop `multiple` was provided', async () => {
  const model  = ref()
  const screen = render({
    components: { Select },
    template  : `
      <Select
        v-model="model"
        :options="['apple', 'grape', 'orange']"
        clearable
        multiple
      />
    `,
    setup () {
      return { model }
    },
  })

  await fireEvent.click(screen.queryAllByTestId('select-item').at(0))
  await fireEvent.click(screen.queryAllByTestId('select-item').at(1))
  await fireEvent.click(screen.queryAllByTestId('select-item').at(2))

  expect(model.value).toHaveLength(3)
  expect(model.value).toStrictEqual([
    'apple',
    'grape',
    'orange',
  ])

  await fireEvent.click(screen.queryAllByTestId('select-item').at(1))

  expect(model.value).toHaveLength(2)
  expect(model.value).toStrictEqual(['apple', 'orange'])

  await fireEvent.click(screen.queryByTestId('select-clear'))

  expect(model.value).toHaveLength(0)
  expect(model.value).toStrictEqual([])
})

it('should sync with v-model value (multiple)', async () => {
  const model  = ref()
  const screen = render({
    components: { Select },
    template  : `
      <Select
        v-model="model"
        :options="['apple', 'grape', 'orange']"
        clearable
        multiple
      />
    `,
    setup () {
      return { model }
    },
  })

  model.value = ['apple', 'orange']

  await nextTick()

  const tags = screen.queryAllByTestId('select-tag')

  expect(tags[0]).toHaveTextContent('apple')
  expect(tags[1]).toHaveTextContent('orange')
})

it('should show selected items when options updated', async () => {
  const options = ref<string[]>([])
  const model   = ref('orange')
  const screen  = render({
    components: { Select },
    template  : `
      <Select
        v-model="model"
        :options="options"
      />
    `,
    setup () {
      return { model, options }
    },
  })

  const activator = screen.queryByTestId('select-activator')

  expect(activator).toHaveTextContent('')

  options.value.push('apple', 'grape', 'orange')
  await nextTick()

  expect(activator).toHaveTextContent('orange')
})
