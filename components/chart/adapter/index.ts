import { ChartData, ChartOptions } from 'chart.js/auto'
import { VNode } from 'vue-demi'
import Line from './line'
import Pie from './pie'

export type ChartType = 'line' | 'bar' | 'pie'

export interface ChartAdapter {
  getStyle: () => ChartOptions,
  getDatasets: (vnodes: VNode[]) => ChartData,
}

const CHART_ADAPTER_MAP: Record<ChartType, ChartAdapter> = {
  line: Line,
  bar : Line,
  pie : Pie,
}

export function defineAdapter (adapter: ChartAdapter): ChartAdapter {
  return adapter
}

export default function getAdapter (type: ChartType): ChartAdapter {
  return CHART_ADAPTER_MAP[type]
}
