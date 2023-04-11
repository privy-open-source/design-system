<template>
  <div
    v-p-aspect-ratio="16/9"
    class="chart"
    data-testid="chart"
    :class="classNames">
    <slot />
    <canvas
      ref="canvas"
      data-testid="chart-canvas"
      class="chart__canvas" />
  </div>
</template>

<script lang="ts">
import type { Chart } from 'chart.js/auto'
import { templateRef, watchPausable } from '@vueuse/core'
import {
  defineComponent,
  onMounted,
  watch,
  PropType,
  shallowRef,
  onBeforeUnmount,
  toRef,
  computed,
  nextTick,
} from 'vue-demi'
import getAdapter, { ChartType } from './adapter/index'
import { createChart } from './utils/use-chart'
import { LegendPosition } from '.'
import { pAspectRatio } from '../aspect-ratio'

export default defineComponent({
  directives: { pAspectRatio },
  props     : {
    variant: {
      type   : String as PropType<ChartType>,
      default: 'line',
    },
    legend: {
      type   : String as PropType<LegendPosition>,
      default: 'bottom',
    },
  },
  setup (props, { slots }) {
    const instance = shallowRef<Chart>()
    const canvas   = templateRef<HTMLCanvasElement>('canvas')
    const variant  = toRef(props, 'variant')
    const legend   = toRef(props, 'legend')

    const classNames = computed(() => {
      const result: string[] = []

      if (props.variant)
        result.push(`chart--${props.variant}`)

      if (props.legend)
        result.push(`chart--${props.legend}`)

      return result
    })

    const data = computed(() => {
      return getAdapter(variant.value).getDatasets(slots.default())
    })

    async function initChart () {
      if (instance.value)
        instance.value.destroy()

      instance.value = await createChart(canvas.value, variant.value, data.value, {
        plugins: {
          legend: {
            display : legend.value !== 'none',
            position: legend.value === 'none' ? undefined : legend.value,
            labels  : {
              color: '#9CA3AF',
              font : {
                family: 'DM Sans',
                size  : 12,
                weight: '600',
              },
            },
          },
        },
        ...getAdapter(variant.value).getStyle(),
      },
      )
    }

    const dataWatcher = watchPausable(data, (newData) => {
      if (instance.value) {
        instance.value.data = newData
        instance.value.update()
      }
    })

    watch([variant, legend], async () => {
      dataWatcher.pause()

      await initChart()
      await nextTick()

      dataWatcher.resume()
    }, { flush: 'pre' })

    onMounted(() => {
      initChart()
    })

    onBeforeUnmount(() => {
      if (instance.value)
        instance.value.destroy()
    })

    return { canvas, classNames }
  },
})
</script>

<style lang="postcss">
.chart {
  @apply w-full bg-default p-4;
  @apply dark:bg-dark-default;
}
</style>
