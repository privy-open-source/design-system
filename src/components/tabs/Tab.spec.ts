import { render } from '@testing-library/vue'
import pTabs from './Tabs.vue'
import pTab from './Tab.vue'
import { delay } from 'nanodelay'
import IconEdit from '@privyid/persona-icon/vue/edit/20.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { pTabs, pTab },
    template  : `
      <p-tabs>
        <p-tab title="To Sign">To Sign Content</p-tab>
      </p-tabs>
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
    components: { pTabs, pTab },
    template  : `
      <p-tabs>
        <p-tab title="To Sign" disabled>To Sign Content</p-tab>
      </p-tabs>
    `,
  })

  const tabContent = screen.queryByTestId('tab-content')

  expect(tabContent).not.toBeVisible()
})

it('should have style no-label when Tab navigation is just an icon', async () => {
  const screen = render({
    components: {
      pTabs, pTab, IconEdit,
    },
    template: `
      <p-tabs>
        <p-tab>
          <template #icon>
            <IconEdit />
          </template>
        </p-tab>
      </p-tabs>
    `,
  })

  await delay(2)

  const tab = screen.queryByTestId('tab')

  expect(tab).toBeInTheDocument()
  expect(tab).toHaveClass('nav__item--no-label')
})
