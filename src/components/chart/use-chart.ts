import type {
  ChartData,
  ChartType,
  ChartOptions,
  Chart,
} from 'chart.js/auto'

export async function createChart (target: HTMLCanvasElement, type: ChartType, data: ChartData, options: ChartOptions): Promise<Chart> {
  const { default: Chart } = await import('chart.js/auto')
  const instance           = new Chart(target, {
    type,
    data,
    options,
  })

  return instance
}
