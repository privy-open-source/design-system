import type { ChartData, ChartOptions } from 'chart.js/auto'
import { VNode } from 'vue-demi'

export interface ChartAdapter {
  getStyle: () => ChartOptions,
  getDatasets: (vnodes: VNode[]) => ChartData,
}

export function defineAdapter (adapter: ChartAdapter): ChartAdapter {
  return adapter
}
