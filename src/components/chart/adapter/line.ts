import type { ChartDataset, ChartData } from 'chart.js'
import { startCase } from 'lodash-es'
import { Slots, VNode } from 'vue-demi'
import { defineAdapter } from './adapter'
import { colorHash } from '../../avatar/utils/color-hash'
import { findAllChildren } from '../../utils/vnode'

export default defineAdapter({
  getDatasets (vnodes: VNode[]): ChartData {
    const sets     = findAllChildren(vnodes, 'ChartSet')
    const datasets = new Map<string, ChartDataset>()
    const labels   = [] as string[]

    for (const set of sets) {
      const values = findAllChildren((set.children as Slots).default(), 'ChartVal')

      for (const value of values) {
        const item  = datasets.get(value.props.name)
        const color = value.props.color ?? colorHash(value.props.name).at(1)

        if (item) {
          item.data.push(value.props.value);
          (item.borderColor as string[]).push(color);
          (item.backgroundColor as string[]).push(color)
        } else {
          datasets.set(value.props.name, {
            label          : startCase(value.props.name),
            data           : [value.props.value],
            borderColor    : [color],
            backgroundColor: [color],
          })
        }
      }

      labels.push(startCase(set.props.name))
    }

    return { labels, datasets: [...datasets.values()] }
  },

  getStyle () {
    return {
      scales: {
        x: {
          ticks: {
            color: '#9CA3AF',
            font : {
              family: 'DM Sans',
              size  : 12,
              weight: '600',
            },
          },
          grid: { borderColor: '#BFBFBF' },
        },
        y: {
          ticks: {
            color: '#9CA3AF',
            font : {
              family: 'DM Sans',
              size  : 12,
              weight: '600',
            },
          },
          grid: {
            borderColor: '#BFBFBF',
            borderDash : [4],
          },
        },
      },
    }
  },
})
