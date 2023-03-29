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
        @click="onClickLowerTrack" />
      <!-- Active Track -->
      <div
        ref="track-active"
        data-testid="track-active"
        class="input-range__track input-range__track-active"
        :style="upperStyle"
        @click="onClickActiveTrack">
        <div
          v-show="multiple"
          ref="thumb-start"
          data-testid="thumb-start"
          class="input-range__thumb input-range__thumb-start" />
        <div
          ref="thumb-end"
          data-testid="thumb-end"
          class="input-range__thumb input-range__thumb-end" />
      </div>
      <!-- Upper Track -->
      <div
        data-testid="track-upper"
        class="input-range__track input-range__track-upper"
        @click="onClickUpperTrack" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  syncRef,
  templateRef,
  useElementBounding,
  useToNumber,
} from '@vueuse/core'
import { useClamp } from '@vueuse/math'
import {
  computed,
  defineComponent,
  PropType,
  ref,
  StyleValue,
  toRef,
  watch,
} from 'vue-demi'
import useDrag from './utils/use-drag'

export default defineComponent({
  props: {
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
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: [
    'change',
    'update:modelValue',
    'update:end',
    'update:start',
  ],
  setup (props, { emit }) {
    const track      = templateRef<HTMLDivElement>('track')
    const thumbStart = templateRef<HTMLDivElement>('thumb-start')
    const thumbEnd   = templateRef<HTMLDivElement>('thumb-end')

    const min  = useToNumber(toRef(props, 'min'))
    const max  = useToNumber(toRef(props, 'max'))
    const step = useToNumber(toRef(props, 'step'))

    // Initial value
    const localStart = ref(Array.isArray(props.modelValue) ? props.modelValue[0] : (props.start ?? min.value))
    const localEnd   = ref(Array.isArray(props.modelValue) ? props.modelValue[1] : (props.end ?? props.modelValue ?? max.value))

    const minDrag = computed(() => props.multiple ? localStart.value + step.value : min.value)
    const maxDrag = computed(() => props.multiple ? localEnd.value - step.value : max.value)

    const start = useClamp(localStart.value, min, maxDrag)
    const end   = useClamp(localEnd.value, minDrag, max)

    const { width, left } = useElementBounding(track)

    const startValue = computed({
      get () {
        if (Array.isArray(props.modelValue))
          return props.modelValue[0]

        return props.start ?? min.value
      },
      set (value: number) {
        emit('update:start', value)
      },
    })

    const endValue = computed({
      get () {
        if (Array.isArray(props.modelValue))
          return props.modelValue[1]

        if (Number.isFinite(props.modelValue))
          return props.modelValue

        return props.end ?? max.value
      },
      set (value: number) {
        emit('update:end', value)
      },
    })

    const startPercentage = computed(() => {
      return (start.value - min.value) / (max.value - min.value) * 100
    })

    const endPercentage = computed(() => {
      return (end.value - min.value) / (max.value - min.value) * 100
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
      const value   = percent * (max.value - min.value) + min.value
      const nearest = Math.round(value / step.value) * step.value

      return nearest
    }

    function onClickLowerTrack (event: MouseEvent) {
      if (!props.disabled && !props.readonly)
        start.value = getValue(event)
    }

    function onClickActiveTrack (event: MouseEvent) {
      if (!props.disabled && !props.readonly) {
        const value = getValue(event)

        if (props.multiple) {
          const ds = Math.abs(value - start.value)
          const de = Math.abs(value - end.value)

          /**
           * if clicked near thumbStart, it changed the start value
           * If not, change the end value
           */
          if (ds < de) {
            start.value = value

            return
          }
        }

        end.value = value
      }
    }

    function onClickUpperTrack (event: MouseEvent) {
      if (!props.disabled && !props.readonly)
        end.value = getValue(event)
    }

    useDrag(thumbStart, (event) => {
      if (!props.disabled && !props.readonly)
        start.value = getValue(event)
    })

    useDrag(thumbEnd, (event) => {
      if (!props.disabled && !props.readonly)
        end.value = getValue(event)
    })

    syncRef(start, startValue)
    syncRef(end, endValue)

    watch([start, end], ([startVal, endVal]) => {
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

    return {
      classNames,
      lowerStyle,
      upperStyle,
      onClickLowerTrack,
      onClickActiveTrack,
      onClickUpperTrack,
    }
  },
})
</script>

<style lang="postcss">
.input-range {
  @apply py-2 w-full;

  &__tracks {
    @apply relative flex w-full bg-base cursor-pointer overflow-visible rounded;
  }

  &__track {
    @apply h-2 rounded;

    &-active {
      @apply bg-info-emphasis relative text-center;
    }

    &-upper {
      @apply flex-grow;
    }
  }

  &__thumb {
    @apply w-4 h-4 rounded-full bg-default shadow-sm absolute top-1/2 bottom-0 -translate-y-1/2 border border-muted;
    @apply touch-none select-none;

    &:hover,
    &:active {
      @apply ring ring-info border-info-emphasis;
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
