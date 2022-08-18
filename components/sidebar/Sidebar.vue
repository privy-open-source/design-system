<template>
  <aside
    data-testid="sidebar"
    :class="classNames">
    <slot />
  </aside>
</template>

<script lang="ts">
import {
  defineComponent, PropType, computed, provide, InjectionKey,
} from 'vue-demi'
import { StyleVariant, AlignVariant } from '../nav/Nav.vue'

type TypeVariant = 'wide' | 'narrow'

interface NavSettings {
  variant: string,
  align: string,
  type: string,
}

export const NAV_SETTINGS: InjectionKey<NavSettings> = Symbol('NavSettings')

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
    iconOnly: {
      type   : Boolean,
      default: false,
    },
  },
  setup (props) {
    provide(NAV_SETTINGS, {
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

      if (props.iconOnly)
        result.push('sidebar--icon-only')

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
.sidebar {
  @apply bg-white px-2 py-4;

  &:not(.sidebar--narrow) {
    @apply w-60;
  }

  &&--fixed {
    @apply fixed left-0 top-0 h-full;

    &.sidebar--right {
      @apply left-auto right-0;
    }
  }

  &&--narrow {
    @apply w-16;
  }

  &&--tabs {
    @apply pr-0 border-r border-r-secondary-25/50;
  }

  &&--lines {
    @apply px-0;
  }
}
</style>
