<template>
  <transition
    name="fade"
    mode="out-in">
    <div
      v-show="model || isToggleable"
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
  inject,
} from 'vue-demi'
import { useVModel } from '../input'
import { NAVBAR_SETTINGS } from '../navbar'
import { useMediaQuery } from '@vueuse/core'

export default defineComponent({
  props: {
    modelValue: {
      type   : Boolean,
      default: false,
    },
    isNav: {
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
    const model   = useVModel(props)
    const context = inject(NAVBAR_SETTINGS, undefined, true)
    const lg      = useMediaQuery('(min-width: 1024px)')
    const md      = useMediaQuery('(min-width: 768px)')
    const sm      = useMediaQuery('(min-width: 640px)')

    const isToggleable = computed(() => {
      if (context?.toggleable?.value === 'lg')
        return lg.value

      if (context?.toggleable?.value === 'md')
        return md.value

      if (context?.toggleable?.value === 'sm')
        return sm.value

      return model.value
    })

    const classNames = computed(() => {
      const result: string[] = ['']

      if (model.value)
        result.push('collapse--show')

      if (props.isNav)
        result.push('navbar--collapse')

      return result
    })

    return {
      model,
      classNames,
      isToggleable,
    }
  },

})
</script>

<style lang="postcss">
.collapse {
  &&--show {
    @apply block visible text-default;
    @apply dark:text-dark-default;
  }

  &:not(&--show) {
    @apply hidden;
  }
}

.navbar {
  &--collapse {
    @apply basis-full flex-grow items-center;

    &.collapse--show {
      @apply pt-3;
    }
  }
}
</style>
