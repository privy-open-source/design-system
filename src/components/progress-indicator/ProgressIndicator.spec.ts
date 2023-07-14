import { fireEvent, render } from '@testing-library/vue'
import pProgressIndicator from './ProgressIndicator.vue'
import { nextTick, ref } from 'vue-demi'

it('should mounted properly', () => {
  const screen = render({
    components: { pProgressIndicator },
    template  : `
      <p-progress-indicator />
    `,
  })

  const indicator = screen.queryByTestId('progress-indicator')

  expect(indicator).toBeInTheDocument()
  expect(indicator).toHaveClass('progress-indicator', 'progress-indicator--horizontal')
})

it('should have vertical style if prop direction set to vertical', () => {
  const screen = render({
    components: { pProgressIndicator },
    template  : `
      <p-progress-indicator direction="vertical" />
    `,
  })

  const indicator = screen.queryByTestId('progress-indicator')

  expect(indicator).toBeInTheDocument()
  expect(indicator).toHaveClass('progress-indicator', 'progress-indicator--vertical')
  expect(indicator).not.toHaveClass('progress-indicator--horizontal')
})

it('should move the active pointer if item clicked', async () => {
  const screen = render({
    components: { pProgressIndicator },
    template  : `
      <p-progress-indicator />
    `,
  })

  const items  = screen.queryAllByTestId('progress-indicator-item')
  const active = screen.queryByTestId('progress-indicator-item-active')

  expect(active).toHaveStyle({ transform: 'translateX(calc((100% + .25rem) * 0))' })

  await fireEvent.click(items.at(2))

  expect(active).toHaveStyle({ transform: 'translateX(calc((100% + .25rem) * 2))' })
})

it('should able to use v-model', async () => {
  const model  = ref(1)
  const screen = render({
    components: { pProgressIndicator },
    template  : `
      <p-progress-indicator v-model="model" />
    `,
    setup () {
      return { model }
    },
  })

  const items  = screen.queryAllByTestId('progress-indicator-item')
  const active = screen.queryByTestId('progress-indicator-item-active')

  expect(active).toHaveStyle({ transform: 'translateX(calc((100% + .25rem) * 0))' })

  await fireEvent.click(items.at(2))

  expect(active).toHaveStyle({ transform: 'translateX(calc((100% + .25rem) * 2))' })
  expect(model.value).toBe(3)

  model.value = 4
  await nextTick()

  expect(active).toHaveStyle({ transform: 'translateX(calc((100% + .25rem) * 3))' })
})
