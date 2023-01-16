<template>
  <aside
    data-testid="sidebar"
    :class="classNames">
    <slot />
  </aside>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  provide,
} from 'vue-demi'
import { SIDEBAR_SETTINGS, TypeVariant } from '.'
import { StyleVariant, AlignVariant } from '../nav'

export default defineComponent({
  props: {
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'pills',
    },
    align: {
      type   : String as PropType<AlignVariant>,
      default: 'left',
    },
    type: {
      type   : String as PropType<TypeVariant>,
      default: 'wide',
    },
    fixed: {
      type   : Boolean,
      default: false,
    },
  },
  setup (props) {
    provide(SIDEBAR_SETTINGS, {
      variant: props.variant,
      align  : props.align,
      type   : props.type,
    })

    const classNames = computed(() => {
      const result: string[] = ['sidebar']

      if (props.type)
        result.push(`sidebar--${props.type}`)

      if (props.align)
        result.push(`sidebar--${props.align}`)

      if (props.variant)
        result.push(`sidebar--${props.variant}`)

      if (props.fixed)
        result.push('sidebar--fixed')

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
.sidebar {
  @apply bg-default px-2 py-4;

  &:not(.sidebar--narrow) {
    @apply w-[230px];
  }

  &:not(.sidebar--fixed) {
    &.sidebar--right {
      @apply ml-auto;
    }
  }

  &&--fixed {
    @apply fixed left-0 top-0 h-full;

    &.sidebar--right {
      @apply left-auto right-0;
    }
  }

  &&--narrow {
    @apply w-[60px];
  }

  &&--tabs,
  &&--lines {
    @apply pr-0 py-2 border-r border-r-default;
  }

  &&--lines {
    @apply px-0;
  }
}
</style>
