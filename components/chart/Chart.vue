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
  onBeforeUpdate,
  onBeforeUnmount,
  toRef,
} from 'vue-demi'
import loadData from './adapter/index'

export type TypeVariant = 'bar' | 'line' | 'pie'

export type LegendPosition = 'none' | LayoutPosition

export default defineComponent({
  props: {
    variant: {
      type   : String as PropType<TypeVariant>,
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

    function createChart () {
      if (instance.value)
        instance.value.destroy()

      instance.value = new Chart(canvas.value, {
        type   : variant.value,
        data   : loadData(variant.value, slots.default()),
        options: {
          plugins: {
            legend: {
              display : legend.value !== 'none',
              position: legend.value !== 'none' ? legend.value : undefined,
            },
          },
        },
      })
    }

    watch([variant, legend], () => {
      createChart()
    })

    onMounted(() => {
      createChart()
    })

    onBeforeUpdate(() => {
      if (instance.value) {
        instance.value.data = loadData(variant.value, slots.default())
        instance.value.update()
      }
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
