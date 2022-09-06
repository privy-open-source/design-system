import { ChartData } from 'chart.js/auto'
import { VNode } from 'vue-demi'
import Line from './line'
import Pie from './pie'

export type ChartType = 'line' | 'bar' | 'pie'

const CHART_ADAPTER_MAP: Record<ChartType, (vnode: VNode[]) => ChartData> = {
  line: Line,
  bar : Line,
  pie : Pie,
}

export default function getDatasets (type: ChartType, vnodes: VNode[]): ChartData {
  return CHART_ADAPTER_MAP[type](vnodes)
}
