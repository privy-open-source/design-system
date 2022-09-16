import { render } from '@testing-library/vue'
import { nextTick, ref } from 'vue-demi'
import pCollapse from './Collapse.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { pCollapse },
    template  : `
      <p-collapse>
        Hey there!
      </p-collapse>
    `,
  })

  const collapse = screen.queryByTestId('collapse')
  const text     = screen.queryByText('Hey there!')

  expect(collapse).toBeInTheDocument()
  expect(collapse).toHaveClass('collapse')
  expect(text).toBeInTheDocument()
})

it('should rendered properly without any props', async () => {
  const model  = ref(false)
  const screen = render({
    components: { pCollapse },
    template  : `
      <p-collapse v-model="model">
      </p-collapse>
    `,
    setup () {
      return { model }
    },
  })

  let collapse = screen.queryByTestId('collapse')

  expect(collapse).toBeInTheDocument()
  expect(collapse).not.toBeVisible()

  model.value = true

  await nextTick()

  collapse = screen.queryByTestId('collapse')
  expect(collapse).toBeVisible()
  expect(collapse).toHaveClass('collapse--show')

  model.value = false

  await nextTick()

  collapse = screen.queryByTestId('collapse')
  expect(collapse).not.toBeVisible()
})
