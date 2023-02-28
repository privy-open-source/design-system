import { render } from '@testing-library/vue'
import Page from './Page.vue'
import { ref, nextTick } from 'vue-demi'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Page },
    template  : `
      <Page />`,
  })

  const page = screen.queryByTestId('page')

  expect(page).toBeInTheDocument()
  expect(page).toHaveClass('page')
})

it('should be able to expand automatically via props `expand`', () => {
  const screen = render({
    components: { Page },
    template  : `
      <Page expand="md" />
    `,
  })

  const page = screen.queryByTestId('page')

  expect(page).toBeInTheDocument()
  expect(page).toHaveClass('page--expand', 'page--expand-md')
})

it('should be able to change type via props `type`', () => {
  const screen = render({
    components: { Page },
    template  : `
      <Page type="wide" />
    `,
  })

  const page = screen.queryByTestId('page')

  expect(page).toBeInTheDocument()
  expect(page).toHaveClass('page--type-wide')
  expect(page).not.toHaveClass('page--type-narrow')
})

it('sidebar able to toggle via v-model', async () => {
  const model  = ref(true)
  const screen = render({
    components: { Page },
    template  : `
      <Page
        v-model="model"
        expand="md">
        Page Content
      </Page>
    `,
    setup () {
      return { model }
    },
  })

  let page = screen.queryByTestId('page')

  expect(page).toBeInTheDocument()
  expect(page).toHaveClass('page--expanded')

  model.value = false
  await nextTick()

  page = screen.queryByTestId('page')
  expect(page).not.toHaveClass('page--expanded')
})
