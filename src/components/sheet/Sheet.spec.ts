import { fireEvent, render } from '@testing-library/vue'
import { nextTick, ref } from 'vue-demi'
import pSheet from './Sheet.vue'

it('should render properly', () => {
  const screen = render({
    components: { pSheet },
    template  : `
      <p-sheet />
    `,
  })

  const sheet = screen.queryByTestId('sheet')

  expect(sheet).toBeInTheDocument()
  expect(sheet).toHaveClass('sheet--left')
})

it('should able position using prop `position`', () => {
  const screen = render({
    components: { pSheet },
    template  : `
      <p-sheet position="top" />
    `,
  })

  const sheet = screen.queryByTestId('sheet')

  expect(sheet).toBeInTheDocument()
  expect(sheet).toHaveClass('sheet--top')
  expect(sheet).not.toHaveClass('sheet--left')
})

it('should able to show hide using v-model', async () => {
  const model  = ref(false)
  const screen = render({
    components: { pSheet },
    template  : `
      <p-sheet v-model="model" />
    `,
    setup () {
      return { model }
    },
  })

  const sheet = screen.queryByTestId('sheet')

  expect(sheet).toBeInTheDocument()

  model.value = true
  await nextTick()

  const content  = screen.queryByTestId('sheet-content')
  const backdrop = screen.queryByTestId('sheet-backdrop')

  expect(content).toBeInTheDocument()
  expect(backdrop).toBeVisible()
})

it('should hide the sheet if backdrop clicked', async () => {
  const model  = ref(false)
  const screen = render({
    components: { pSheet },
    template  : `
      <p-sheet v-model="model" />
    `,
    setup () {
      return { model }
    },
  })

  const sheet = screen.queryByTestId('sheet')

  expect(sheet).toBeInTheDocument()

  model.value = true
  await nextTick()

  const content  = screen.queryByTestId('sheet-content')
  const backdrop = screen.queryByTestId('sheet-backdrop')

  expect(content).toBeInTheDocument()
  expect(backdrop).toBeVisible()

  await fireEvent.click(backdrop)

  expect(model.value).toBe(false)
  expect(content).not.toBeInTheDocument()
  expect(backdrop).not.toBeVisible()
})

it('should not hide the sheet when backdrop clicked if set `no-close-on-backdrop`', async () => {
  const model  = ref(false)
  const screen = render({
    components: { pSheet },
    template  : `
      <p-sheet v-model="model" no-close-on-backdrop />
    `,
    setup () {
      return { model }
    },
  })

  const sheet = screen.queryByTestId('sheet')

  expect(sheet).toBeInTheDocument()

  model.value = true
  await nextTick()

  const content  = screen.queryByTestId('sheet-content')
  const backdrop = screen.queryByTestId('sheet-backdrop')

  expect(content).toBeInTheDocument()
  expect(backdrop).toBeVisible()

  await fireEvent.click(backdrop)

  expect(model.value).toBe(true)
  expect(content).toBeInTheDocument()
  expect(backdrop).toBeVisible()
})
