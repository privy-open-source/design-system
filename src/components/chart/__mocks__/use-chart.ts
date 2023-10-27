import { vi } from 'vitest'
import type {
  ChartData,
  ChartOptions,
  ChartType,
} from 'chart.js/auto'

export const updateChart = vi.fn()

export const updateDestroy = vi.fn()

export const createChart = vi.fn(async (target: HTMLCanvasElement, type: ChartType, data: ChartData, options: ChartOptions) => {
  return {
    target : target,
    type   : type,
    data   : data,
    options: options,
    update : function () { updateChart(this.data) },
    destroy: function () { updateDestroy() },
  }
})
