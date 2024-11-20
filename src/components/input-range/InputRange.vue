<template>
  <div
    data-testid="input-range"
    class="input-range"
    :class="classNames">
    <div
      ref="track"
      class="input-range__tracks">
      <!-- Lower Track -->
      <div
        v-show="multiple"
        data-testid="track-lower"
        class="input-range__track input-range__track-lower"
        :style="lowerStyle"
        @click.capture="onClickLowerTrack" />
      <!-- Active Track -->
      <div
        data-testid="track-active"
        class="input-range__track input-range__track-active"
        :style="upperStyle"
        @click.capture="onClickActiveTrack">
        <div
          v-show="multiple"
          ref="thumbStart"
          data-testid="thumb-start"
          class="input-range__thumb input-range__thumb-start" />
        <div
          ref="thumbEnd"
          data-testid="thumb-end"
          class="input-range__thumb input-range__thumb-end" />
      </div>
      <!-- Upper Track -->
      <div
        data-testid="track-upper"
        class="input-range__track input-range__track-upper"
        @click.capture="onClickUpperTrack" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  syncRef,
  useElementBounding,
  useToNumber,
} from '@vueuse/core'
import { useClamp } from '@vueuse/math'
import type {
  PropType,
  StyleValue,
} from 'vue-demi'
import {
  computed,
  ref,
  toRef,
  watch,
} from 'vue-demi'
import useDrag from './utils/use-drag'

const props = defineProps({
  modelValue: {
    type   : [Number, Array] as PropType<number | [number, number]>,
    default: undefined,
  },
  start: {
    type   : Number,
    default: undefined,
  },
  end: {
    type   : Number,
    default: undefined,
  },
  step: {
    type   : [String, Number],
    default: 1,
  },
  min: {
    type   : [String, Number],
    default: 0,
  },
  max: {
    type   : [String, Number],
    default: 100,
  },
  multiple: {
    type   : Boolean,
    default: false,
  },
  disabled: {
    type   : Boolean,
    default: false,
  },
  readonly: {
    type   : Boolean,
    default: false,
  },
  error: {
    type   : Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'change': [unknown],
  'update:modelValue': [unknown],
  'update:end': [number],
  'update:start': [number],
}>()

const track      = ref<HTMLDivElement>()
const thumbStart = ref<HTMLDivElement>()
const thumbEnd   = ref<HTMLDivElement>()

const minimum = useToNumber(toRef(props, 'min'))
const maximum = useToNumber(toRef(props, 'max'))
const perStep = useToNumber(toRef(props, 'step'))

// Initial value
const localStart = ref(Array.isArray(props.modelValue) ? props.modelValue[0] : (props.start ?? minimum.value))
const localEnd   = ref(Array.isArray(props.modelValue) ? props.modelValue[1] : (props.end ?? props.modelValue ?? maximum.value))

const minDrag = computed(() => props.multiple ? localStart.value + perStep.value : minimum.value)
const maxDrag = computed(() => props.multiple ? localEnd.value - perStep.value : maximum.value)

const startValue = useClamp(localStart.value, minimum, maxDrag)
const endValue   = useClamp(localEnd.value, minDrag, maximum)

const { width, left } = useElementBounding(track)

const vStart = computed({
  get () {
    if (Array.isArray(props.modelValue))
      return props.modelValue[0]

    return props.start ?? minimum.value
  },
  set (value: number) {
    emit('update:start', value)
  },
})

const vEnd = computed({
  get () {
    if (Array.isArray(props.modelValue))
      return props.modelValue[1]

    if (Number.isFinite(props.modelValue))
      return props.modelValue

    return props.end ?? maximum.value
  },
  set (value: number) {
    emit('update:end', value)
  },
})

const startPercentage = computed(() => {
  return (startValue.value - minimum.value) / (maximum.value - minimum.value) * 100
})

const endPercentage = computed(() => {
  return (endValue.value - minimum.value) / (maximum.value - minimum.value) * 100
})

const classNames = computed(() => {
  const result: string[] = []

  if (props.disabled)
    result.push('input-range--disabled')

  if (props.readonly)
    result.push('input-range--readonly')

  if (props.error)
    result.push('input-range--error', 'state--error')

  return result
})

const lowerStyle = computed<StyleValue>(() => {
  return { width: `${startPercentage.value}%` }
})

const upperStyle = computed<StyleValue>(() => {
  return { width: `${(endPercentage.value - startPercentage.value)}%` }
})

function getValue (event: { pageX: number }): number {
  const offset  = event.pageX - left.value
  const percent = offset / width.value
  const value   = percent * (maximum.value - minimum.value) + minimum.value
  const nearest = Math.round(value / perStep.value) * perStep.value

  return nearest
}

function onClickLowerTrack (event: MouseEvent) {
  if (!props.disabled && !props.readonly)
    startValue.value = getValue(event)
}

function onClickActiveTrack (event: MouseEvent) {
  if (!props.disabled && !props.readonly) {
    const value = getValue(event)

    if (props.multiple) {
      const ds = Math.abs(value - startValue.value)
      const de = Math.abs(value - endValue.value)

      /**
       * if clicked near thumbStart, it changed the start value
       * If not, change the end value
       */
      if (ds < de) {
        startValue.value = value

        return
      }
    }

    endValue.value = value
  }
}

function onClickUpperTrack (event: MouseEvent) {
  if (!props.disabled && !props.readonly)
    endValue.value = getValue(event)
}

useDrag(thumbStart, (event) => {
  if (!props.disabled && !props.readonly)
    startValue.value = getValue(event)
})

useDrag(thumbEnd, (event) => {
  if (!props.disabled && !props.readonly)
    endValue.value = getValue(event)
})

syncRef(startValue, vStart, { immediate: false })
syncRef(endValue, vEnd, { immediate: false })

watch([startValue, endValue], ([startVal, endVal]) => {
  localStart.value = startVal
  localEnd.value   = endVal

  if (props.multiple) {
    emit('update:modelValue', [startVal, endVal])
    emit('change', [startVal, endVal])
  } else {
    emit('update:modelValue', endVal)
    emit('change', endVal)
  }
})
</script>

<style lang="postcss">
.input-range {
  @apply py-2 w-full;

  &__tracks {
    @apply relative flex w-full bg-ground cursor-pointer overflow-visible rounded;
    @apply dark:bg-dark-ground;
  }

  &__track {
    @apply h-2 rounded;

    &-active {
      @apply bg-brand-accent relative text-center;
      @apply dark:bg-dark-brand-accent;
    }

    &-upper {
      @apply grow;
    }
  }

  &__thumb {
    @apply w-4 h-4 rounded-full bg-default shadow-sm absolute top-1/2 bottom-0 -translate-y-1/2 border border-subtlest touch-none select-none;
    @apply dark:bg-dark-layer-2 dark:border-dark-subtlest;

    &:hover,
    &:active {
      @apply ring ring-info border-brand-accent;
      @apply dark:ring-dark-info dark:border-dark-brand-accent;
    }

    &-start {
      @apply -left-2;
    }

    &-end {
      @apply -right-2;
    }
  }

  &:disabled,
  &--disabled {
    @apply opacity-50 pointer-events-none;
  }
}
</style>
