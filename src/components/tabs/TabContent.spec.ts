import { KeepAlive } from '../steps/__mocks__/keep-alive'
import { render } from '@testing-library/vue'
import TabContent from './TabContent.vue'
import Tab from './Tab.vue'
import {
  nextTick,
  ref,
} from 'vue-demi'
import { vi } from 'vitest'
import type * as VueDemi from 'vue-demi'

vi.mock('vue-demi', async () => {
  const vueDemi = await vi.importActual('vue-demi')

  return {
    ...vueDemi as typeof VueDemi,
    KeepAlive,
  }
})

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

  let tab = screen.queryByTestId('tab-panel')

  expect(tab).toHaveTextContent('2')

  active.value = 0
  await nextTick()

  tab = screen.queryByTestId('tab-panel')

  expect(tab).toHaveTextContent('1')
})

it('should keeping alive component if prop keep-alive is provided', async () => {
  render({
    components: { TabContent, Tab },
    template  : `
      <TabContent :active="0" keep-alive>
        <Tab>1</Tab>
        <Tab>2</Tab>
      </TabContent>
    `,
    setup () {
      return {}
    },
  })

  expect(KeepAlive).toBeCalled()
})
