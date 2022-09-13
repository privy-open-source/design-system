<template>
  <div
    v-show="model"
    data-testid="collapse"
    class="collapse"
    :class="classNames">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, nextTick, watch,
} from 'vue-demi'
import { useVModel } from '../input/use-input'

export default defineComponent({
  props: {
    modelValue: {
      type   : Boolean,
      default: false,
    },
  },

  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },

  emits: ['update:modelValue'],

  setup (props) {
    const model = useVModel(props)

    const classNames = computed(() => {
      const result: string[] = ['']

      if (model.value)
        result.push('collapse--show')

      return result
    })

    watch(model, (value) => {
      if (value === false) {
        nextTick(() => {
          setTimeout(() => {
            model.value = false
          }, 100)
        })
      }
    })

    return {
      model,
      classNames,
    }
  },

})
</script>

<style lang="postcss">
.collapse {
  &&--show {
    @apply min-h-[0.5rem] relative overflow-hidden h-auto opacity-100 transition-all duration-1000 ease-in-out;
  }

  &:not(.collapse--show) {
    @apply h-0 opacity-0 transition-all duration-1000 ease-in-out;
  }
}
</style>
