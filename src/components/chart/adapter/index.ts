import type { ChartAdapter } from './adapter'
import type { ChartType } from 'chart.js/auto'
import Line from './line'
import Pie from './pie'
import Bubble from './bubble'

const CHART_ADAPTER_MAP: Record<ChartType, ChartAdapter> = {
  line     : Line,
  bar      : Line,
  radar    : Line,
  pie      : Pie,
  doughnut : Pie,
  polarArea: Pie,
  scatter  : Bubble,
  bubble   : Bubble,
}

export default function getAdapter (type: ChartType): ChartAdapter {
  return CHART_ADAPTER_MAP[type]
}
