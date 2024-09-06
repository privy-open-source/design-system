<template>
  <div
    class="carousel"
    :class="classNames">
    <div
      ref="container"
      class="carousel__container splide">
      <CarouselBody>
        <slot />
      </CarouselBody>
    </div>

    <div
      v-if="!noProgress"
      class="carousel__progress">
      <ProgressIndicator
        v-model="model"
        :length="length"
        :direction="direction" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  watch,
} from 'vue-demi'
import CarouselBody from './CarouselBody.vue'
import ProgressIndicator from '../progress-indicator/ProgressIndicator.vue'
import type { DirectionVariant } from '../steps'
import '@splidejs/splide/css/core'
import { defu } from 'defu'
import type { AlignmentVariant } from '.'
import { CAROUSEL_INSTANCE } from '.'
import type { Options, Splide } from '@splidejs/splide'
import { useVModel } from '../input'

const props = defineProps({
  modelValue: {
    type   : Number,
    default: 1,
  },
  direction: {
    type   : String as PropType<DirectionVariant>,
    default: 'horizontal',
  },
  align: {
    type   : String as PropType<AlignmentVariant>,
    default: 'end',
  },
  width: {
    type   : [String, Number],
    default: '100%',
  },
  height: {
    type   : [String, Number],
    default: 'auto',
  },
  loop: {
    type   : Boolean,
    default: false,
  },
  autoplay: {
    type   : Boolean,
    default: false,
  },
  autoplayInterval: {
    type   : [Number, String],
    default: 5000,
  },
  splideOptions: {
    type   : Object as PropType<Options>,
    default: () => ({}),
  },
  noProgress: {
    type   : Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'update:modelValue': [number],
  'change': [number],
}>()

const model     = useVModel(props)
const container = ref<HTMLDivElement>()
const slider    = ref<Splide>()
const length    = ref(1)

const classNames = computed(() => {
  const result: string[] = []

  if (props.direction)
    result.push(`carousel--${props.direction}`)

  if (props.align)
    result.push(`carousel--${props.align}`)

  return result
})

const options = computed<Options>(() => {
  return defu<Options, [Options]>(props.splideOptions, {
    type      : props.loop ? 'loop' : 'slide',
    direction : props.direction === 'vertical' ? 'ttb' : 'ltr',
    width     : props.width,
    height    : props.height,
    focus     : 'center',
    arrows    : false,
    pagination: false,
    autoplay  : props.autoplay,
    interval  : Number.parseInt(`${props.autoplayInterval}`),
    start     : props.modelValue - 1,
  })
})

watch(model, (value) => {
  if (slider.value)
    slider.value.go(value - 1)
})

watch(options, (value) => {
  if (slider.value)
    slider.value.options = value
}, { deep: true })

function onMove (index: number) {
  model.value = index + 1

  emit('change', index + 1)
}

function onLoaded () {
  if (slider.value) {
    nextTick(() => {
      length.value = slider.value.length
      model.value  = slider.value.index + 1
    })
  }
}

onMounted(async () => {
  if (container.value) {
    const { Splide } = await import('@splidejs/splide')

    slider.value = new Splide(container.value, options.value)

    slider.value.on('mounted refresh', onLoaded)
    slider.value.on('move', onMove)
    slider.value.mount()
  }
})

onBeforeUnmount(() => {
  if (slider.value)
    slider.value.destroy()
})

provide(CAROUSEL_INSTANCE, slider)
</script>

<style lang="postcss">
.carousel {
  @apply flex items-center justify-center w-full;

  &__progress {
    @apply shrink-0;
  }

  &--horizontal {
    @apply space-y-2;

    &.carousel--end {
      @apply flex-col;
    }

    &.carousel--start {
      @apply flex-col-reverse space-y-reverse;
    }
  }

  &--vertical {
    @apply space-x-2 items-stretch;

    &.carousel--end {
      @apply flex-row;
    }

    &.carousel--start {
      @apply flex-row-reverse space-x-reverse;
    }
  }
}
</style>
