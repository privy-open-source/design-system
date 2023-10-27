import type { ChartAdapter } from './adapter'
import Line from './line'
import Pie from './pie'

export type ChartType = 'line' | 'bar' | 'pie'

const CHART_ADAPTER_MAP: Record<ChartType, ChartAdapter> = {
  line: Line,
  bar : Line,
  pie : Pie,
}

export default function getAdapter (type: ChartType): ChartAdapter {
  return CHART_ADAPTER_MAP[type]
}
