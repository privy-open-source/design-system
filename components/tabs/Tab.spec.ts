import { render } from '@testing-library/vue'
import Tabs from './Tabs.vue'
import Tab from './Tab.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Tabs, Tab },
    template  : `
      <Tabs>
        <Tab title="To Sign">To Sign Content</Tab>
      </Tabs>
    `,
  })

  const tabPanel = screen.queryByTestId('tab-panel')
  const text     = screen.queryByText('To Sign Content')

  expect(tabPanel).toBeInTheDocument()
  expect(tabPanel).toHaveClass('tab__panel')
  expect(text).toBeInTheDocument()
})

it('should be `disabled` by setting the `disabled` prop', () => {
  const screen = render({
    components: { Tabs, Tab },
    template  : `
      <Tabs>
        <Tab title="To Sign" disabled>To Sign Content</Tab>
      </Tabs>
    `,
  })

  const tabContent = screen.queryByTestId('tab-content')

  expect(tabContent).not.toBeVisible()
})
