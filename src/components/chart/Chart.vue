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

<script lang="ts" setup>
import type {
  Chart,
  ChartData,
  ChartType,
  ChartOptions,
} from 'chart.js/auto'
import { watchPausable } from '@vueuse/core'
import type { PropType, VNode } from 'vue-demi'
import {
  onMounted,
  watch,
  shallowRef,
  onBeforeUnmount,
  toRef,
  computed,
  nextTick,
  ref,
} from 'vue-demi'
import type { LegendPosition } from '.'
import { defuFn } from 'defu'
import getAdapter from './adapter/index'
import { createChart } from './utils/use-chart'
import { vPAspectRatio } from '../aspect-ratio'

const props = defineProps({
  variant: {
    type   : String as PropType<ChartType>,
    default: 'line',
  },
  legend: {
    type   : String as PropType<LegendPosition>,
    default: 'bottom',
  },
  data: {
    type   : Object as PropType<ChartData>,
    default: undefined,
  },
  options: {
    type   : Object as PropType<ChartOptions>,
    default: undefined,
  },
})

const slots = defineSlots<{
  'default'(): VNode[],
}>()

const instance = shallowRef<Chart>()
const canvas   = ref<HTMLCanvasElement>()
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
  return defuFn(
    props.data,
    getAdapter(variant.value)?.getDatasets(slots?.default?.() ?? []),
  )
})

const options = computed<ChartOptions>(() => {
  return defuFn(
    props.options,
    {
      plugins: {
        legend: {
          display : legend.value !== 'none',
          position: legend.value === 'none' ? undefined : legend.value,
          labels  : {
            color: '#9CA3AF',
            font : {
              family: 'DM Sans',
              size  : 12,
              weight: 600,
            },
          },
        },
      },
    },
    getAdapter(variant.value)?.getStyle(),
  )
})

async function initChart () {
  if (instance.value)
    instance.value.destroy()

  instance.value = await createChart(
    canvas.value,
    variant.value,
    data.value,
    options.value,
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

</script>

<style lang="postcss">
.chart {
  --p-chart-padding-x: theme(spacing.4);
  --p-chart-padding-y: theme(spacing.4);

  @apply w-full bg-default px-[var(--p-chart-padding-x)] py-[var(--p-chart-padding-y)];
  @apply dark:bg-dark-default;
}
</style>
