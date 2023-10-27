import type { VNode, FunctionalComponent } from 'vue-demi'
import pChartVal from '../ChartVal.vue'
import pChartSet from '../ChartSet.vue'
import { render } from '@testing-library/vue'

export function renderVnode (template: string): VNode[] {
  let vnodes: VNode[]

  const renderless: FunctionalComponent = (props: unknown, { slots }) => {
    vnodes = slots.default()

    return () => slots.default()
  }

  render({
    components: {
      renderless,
      pChartSet,
      pChartVal,
    },
    template: template,
  })

  return vnodes
}
