<template>
  <div
    class="input-range"
    :class="classNames">
    <div
      ref="track"
      class="input-range__tracks">
      <!-- Lower Track -->
      <div
        v-show="multiple"
        class="input-range__track input-range__track-lower"
        :style="lowerStyle"
        @click="onClickLowerTrack" />
      <!-- Active Track -->
      <div
        class="input-range__track input-range__track-active"
        :style="upperStyle"
        @click="onClickActiveTrack">
        <div
          v-show="multiple"
          ref="thumb-start"
          class="input-range__thumb input-range__thumb-start" />
        <div
          ref="thumb-end"
          class="input-range__thumb input-range__thumb-end" />
      </div>
      <!-- Upper Track -->
      <div
        class="input-range__track input-range__track-upper"
        @click="onClickUpperTrack" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  templateRef,
  useElementBounding,
} from '@vueuse/core'
import {
  computed,
  defineComponent,
  PropType,
  StyleValue,
} from 'vue-demi'
import { useVModel } from '.'
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
      default: 1,
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
    'update:modelValue',
    'update:end',
    'update:start',
  ],
  setup (props) {
    const track      = templateRef<HTMLDivElement>('track')
    const thumbStart = templateRef<HTMLDivElement>('thumb-start')
    const thumbEnd   = templateRef<HTMLDivElement>('thumb-end')

    const {
      min,
      max,
      start,
      end,
      step,
      startPercentage,
      endPercentage,
    } = useVModel(props)

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

    const { width, left } = useElementBounding(track)

    const lowerStyle = computed<StyleValue>(() => {
      return { width: `${startPercentage.value * 100}%` }
    })

    const upperStyle = computed<StyleValue>(() => {
      return { width: `${(endPercentage.value - startPercentage.value) * 100}%` }
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

          if (ds < de)
            start.value = value
          else
            end.value = value
        } else
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
  @apply p-2 w-full;

  &__tracks {
    @apply relative flex w-full bg-gray-15 cursor-pointer overflow-visible rounded;
  }

  &__track {
    @apply h-2 rounded;

    &-active {
      @apply bg-primary-100 relative text-center;
    }

    &-upper {
      @apply flex-grow;
    }
  }

  &__thumb {
    @apply w-4 h-4 rounded-full bg-white shadow absolute top-1/2 bottom-0 -translate-y-1/2 border border-gray-25;
    @apply touch-none select-none;

    &:hover,
    &:active {
      @apply ring ring-primary-25 bg-primary-100;
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
