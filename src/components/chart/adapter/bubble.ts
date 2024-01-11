import type { ChartData } from 'chart.js/auto'
import type { Slots, VNode } from 'vue-demi'
import { findAllChildren } from '../../utils/vnode'
import { defineAdapter } from './adapter'
import defu from 'defu'
import { startCase } from 'lodash-es'
import { colorHash } from '../../avatar/utils/color-hash'

export default defineAdapter({
  getDatasets (vnodes: VNode[]): ChartData {
    return {
      datasets: findAllChildren(vnodes, 'ChartSet').map((set) => {
        const color = set.props.color ?? colorHash(set.props.name).at(1)
        const fill  = set.props.fill ?? color

        return defu(set.props.options, {
          label          : startCase(set.props.name),
          backgroundColor: fill,
          borderColor    : color,
          data           : findAllChildren((set.children as Slots).default(), 'ChartVal').map((value) => {
            return value.props.value
          }),
        })
      }),
    }
  },

  getStyle () {
    return {}
  },
})
