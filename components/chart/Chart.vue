<template>
  <div class="chart">
    <slot />
    <canvas
      ref="canvas"
      class="chart__canvas" />
  </div>
</template>

<script lang="ts">
import { templateRef } from '@vueuse/core'
import Chart, { LayoutPosition } from 'chart.js/auto'
import {
  defineComponent,
  onMounted,
  watch,
  PropType,
  shallowRef,
  onBeforeUnmount,
  toRef,
  computed,
} from 'vue-demi'
import getAdapter, { ChartType } from './adapter/index'

export type LegendPosition = 'none' | LayoutPosition

export default defineComponent({
  props: {
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

    const data = computed(() => {
      return getAdapter(variant.value).getDatasets(slots.default())
    })

    function createChart () {
      if (instance.value)
        instance.value.destroy()

      instance.value = new Chart(canvas.value, {
        type   : variant.value,
        data   : data.value,
        options: {
          plugins: {
            legend: {
              display : legend.value !== 'none',
              position: legend.value !== 'none' ? legend.value : undefined,
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
      })
    }

    watch(data, (newData) => {
      if (instance.value) {
        instance.value.data = newData
        instance.value.update()
      }
    })

    watch([variant, legend], () => {
      createChart()
    })

    onMounted(() => {
      createChart()
    })

    onBeforeUnmount(() => {
      if (instance.value)
        instance.value.destroy()
    })

    return { canvas }
  },
})
</script>

<style lang="postcss">
.chart {
  @apply w-full aspect-video bg-white;
}
</style>
