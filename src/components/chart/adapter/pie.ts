import type { ChartData, ChartDataset } from 'chart.js/auto'
import { startCase } from 'lodash-es'
import type { Slots, VNode } from 'vue-demi'
import { colorHash } from '../../avatar/utils/color-hash'
import { findAllChildren } from '../../utils/vnode'
import { defineAdapter } from './adapter'
import defu from 'defu'

export default defineAdapter({
  getDatasets (vnodes: VNode[]): ChartData {
    const sets     = findAllChildren(vnodes, 'ChartSet')
    const datasets = new Map<string, ChartDataset>()
    const labels   = [] as string[]

    for (const set of sets) {
      const values = findAllChildren((set.children as Slots).default(), 'ChartVal')

      for (const value of values) {
        const item = datasets.get(set.props.name)
        const fill = value.props.fill ?? value.props.color ?? colorHash(value.props.name).at(1)

        if (item) {
          item.data.push(value.props.value);
          (item.backgroundColor as string[]).push(fill)
        } else {
          datasets.set(set.props.name, defu(set.props.options, {
            label          : startCase(set.props.name),
            data           : [value.props.value],
            backgroundColor: [fill],
          }))
        }

        labels.push(startCase(value.props.name))
      }
    }

    return { labels, datasets: [...datasets.values()] }
  },

  getStyle () {
    return {}
  },
})
