import { render } from '@testing-library/vue'
import Breadcrumb from './Breadcrumb.vue'
import { defineNavigation } from '.'

const items = defineNavigation([
  {
    text: 'Dashboard',
    href: '#',
  },
  {
    text   : 'Setting',
    href   : '#',
    subitem: [
      {
        text: 'User',
        href: '#',
      },
    ],
  },
])

it('should render properly without any props', () => {
  const screen = render({
    components: { Breadcrumb },
    template  : `
      <Breadcrumb />
    `,
  })

  const breadcrumbs = screen.queryByTestId('breadcrumbs')

  expect(breadcrumbs).toBeInTheDocument()
  expect(breadcrumbs).toHaveClass('breadcrumbs')
})

it('should be able to render navigation', () => {
  const screen = render({
    components: { Breadcrumb },
    template  : `
      <Breadcrumb :items="items" />
    `,
    setup () {
      return { items }
    },
  })

  const breadcrumbs = screen.queryByTestId('breadcrumbs')
  const text        = screen.getAllByText('Dashboard')
  const dropdown    = screen.getByTestId('breadcrumbs-dropdown')

  expect(breadcrumbs).toBeInTheDocument()
  expect(breadcrumbs).toContainElement(dropdown)
  expect(text).toHaveLength(1)
})

it('should be able to custom divider via slot `divider`', () => {
  const screen = render({
    components: { Breadcrumb },
    template  : `
    <Breadcrumb :items="items">
      <template #divider>Custom divider</template>
    </Breadcrumb>
    `,
    setup () {
      return { items }
    },
  })

  const breadcrumbs = screen.queryByTestId('breadcrumbs')

  const dividers = screen.queryAllByTestId('breadcrumbs-divider')

  expect(breadcrumbs).toBeInTheDocument()
  expect(dividers.length).toBe(2)
  expect(dividers.at(0).textContent).toEqual('Custom divider')
})
