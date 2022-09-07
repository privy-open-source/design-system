import { render } from '@testing-library/vue'

import TabContent from './TabContent.vue'
import Tab from './Tab.vue'
import { nextTick, ref } from 'vue-demi'

it('should showing active content only', async () => {
  const active = ref(1)
  const screen = render({
    components: { TabContent, Tab },
    template  : `
      <TabContent :active="active">
        <Tab>1</Tab>
        <Tab>2</Tab>
      </TabContent>
    `,
    setup () {
      return { active }
    },
  })

  const tabs = screen.queryAllByTestId('tab-panel')

  expect(tabs.at(0)).not.toBeVisible()
  expect(tabs.at(1)).toBeVisible()

  active.value = 0
  await nextTick()

  expect(tabs.at(0)).toBeVisible()
  expect(tabs.at(1)).not.toBeVisible()
})

it('should not showing if content is disabled', async () => {
  const active = ref(1)
  const screen = render({
    components: { TabContent, Tab },
    template  : `
      <TabContent :active="active">
        <Tab>1</Tab>
        <Tab disabled>2</Tab>
      </TabContent>
    `,
    setup () {
      return { active }
    },
  })

  const tabs = screen.queryAllByTestId('tab-panel')

  expect(tabs.at(0)).not.toBeVisible()
  expect(tabs.at(1)).not.toBeVisible()

  active.value = 0
  await nextTick()

  expect(tabs.at(0)).toBeVisible()
  expect(tabs.at(1)).not.toBeVisible()
})
