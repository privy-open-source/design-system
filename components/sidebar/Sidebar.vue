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

interface NavSetup {
  variant: string,
  align: string,
  type: string,
}

export const NAV_SETUP: InjectionKey<NavSetup> = Symbol('NavSetup')

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
    provide(NAV_SETUP, {
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
  @apply bg-white;

  &&--fixed {
    @apply fixed left-0 top-0 h-full;

    &.sidebar--right {
      @apply left-auto right-0;
    }
  }

  &&--narrow {
    .nav__link {
      @apply flex-col justify-center;

      &__label {
        @apply ml-0 mt-3 justify-center;
      }
    }
  }
}
</style>
