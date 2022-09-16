<template>
  <transition
    name="fade"
    mode="out-in">
    <div
      v-show="model"
      data-testid="collapse"
      class="collapse"
      :class="classNames">
      <slot />
    </div>
  </transition>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
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
    @apply block;
  }

  &:not(.collapse--show) {
    @apply hidden;
  }
}
</style>
