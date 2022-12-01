<template>
  <div class="w-full px-2">
    <div
      ref="target"
      class="input-range">
      <div
        class="input-range__track input-range__track-lower"
        :style="{ width: `calc(${persentage * 100}% + .25rem)` }" />
      <div class="input-range__track input-range__track-upper" />
      <div
        ref="thumb"
        :style="thumbStyle"
        class="input-range__thumb" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  templateRef,
  useElementBounding,
  useToNumber,
} from '@vueuse/core'
import { clamp } from 'lodash'
import {
  computed,
  defineComponent,
  StyleValue,
  toRef,
} from 'vue-demi'
import { useVModel } from '../input'
import useDraw from '../signature-draw/utils/use-draw'

export default defineComponent({
  props: {
    modelValue: {
      type   : Number,
      default: 30,
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
  },
  setup (props) {
    const model     = useVModel(props)
    const target    = templateRef<HTMLDivElement>('target')
    const { width } = useElementBounding(target)

    const min  = useToNumber(toRef(props, 'min'))
    const max  = useToNumber(toRef(props, 'max'))
    const step = useToNumber(toRef(props, 'step'))

    const persentage = computed(() => {
      return clamp((model.value - min.value) / (max.value - min.value), 0, 1)
    })

    const thumbStyle = computed<StyleValue>(() => {
      return { transform: `translate(${persentage.value * width.value}px, -50%)` }
    })

    function jumpToValue (event) {
      const percent = (event.clientX / width.value)
      const value   = percent * (max.value - min.value) + min.value
      const nearest = Math.round(value / step.value) * step.value

      model.value = clamp(nearest, min.value, max.value)
    }

    useDraw(target, {
      onstart: jumpToValue,
      onmove : jumpToValue,
    })

    return {
      model,
      thumbStyle,
      persentage,
      jumpToValue,
    }
  },
})
</script>

<style lang="postcss">
.input-range {
  @apply py-2 w-full flex items-center cursor-pointer relative;

  &__track {
    @apply h-2 rounded bg-gray-0;

    &-lower {
      @apply bg-primary-100 rounded-r-none flex-shrink-0;
    }

    &-upper {
      @apply rounded-l-none bg-white flex-grow;
    }
  }

  &__thumb {
    @apply w-4 h-4 rounded-full bg-white shadow-sm absolute -left-2 top-1/2 bottom-0 -translate-y-1/2 border;
  }
}
</style>
