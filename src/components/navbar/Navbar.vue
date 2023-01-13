<template>
  <nav
    ref="navbar"
    data-testid="navbar"
    class="navbar"
    :class="[{ 'navbar--shadow' : (y > height)}, classNames]">
    <slot />
  </nav>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  provide,
  toRef,
  watchEffect,
} from 'vue-demi'
import { StyleVariant } from '../nav'
import {
  templateRef,
  useElementBounding,
  useWindowScroll,
} from '@vueuse/core'
import {
  ToggleableVariant,
  NAVBAR_SETTINGS,
} from '.'

export default defineComponent({
  props: {
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'pills',
    },
    toggleable: {
      type   : String as PropType<ToggleableVariant | undefined>,
      default: undefined,
    },
    fixed: {
      type   : Boolean,
      default: false,
    },
    condensed: {
      type   : Boolean,
      default: false,
    },
  },

  setup (props) {
    const { y }      = useWindowScroll()
    const navbar     = templateRef<HTMLElement>('navbar')
    const { height } = useElementBounding(navbar)

    provide(NAVBAR_SETTINGS, {
      variant   : toRef(props, 'variant'),
      toggleable: toRef(props, 'toggleable'),
      condensed : toRef(props, 'condensed'),
    })

    const classNames = computed(() => {
      const result: string[] = ['']

      if (props.fixed)
        result.push('navbar--fixed')

      if (props.variant)
        result.push(`navbar--${props.variant}`)

      if (props.toggleable)
        result.push(`navbar--expand-${props.toggleable}`)

      return result
    })

    watchEffect((onCleanup) => {
      if (typeof document !== 'undefined' && document.body && props.fixed) {
        document.body.style.setProperty('padding-top', `${height.value}px`)

        onCleanup(() => {
          document.body.style.removeProperty('padding-top')
        })
      }
    })

    return {
      classNames,
      y,
      height,
    }
  },
})
</script>

<style lang="postcss">
.navbar {
  @apply bg-default dark:bg-emphasis-subtle relative p-3 flex items-center flex-wrap transition-shadow duration-150 ease-in-out;

  &&--fixed {
    @apply fixed left-0 top-0 w-full z-[1030];
  }

  &&--shadow {
    @apply shadow-sm transition-shadow duration-150 ease-in-out;
  }

  &&--expand {
    :is(&-all, &-lg, &-md, &-sm) {
      @apply justify-between;

      .navbar__nav {
        @apply flex-col;
      }
    }

    &-all {
      & > .collapse {
        @apply visible;
      }
    }

    &-lg {
      .navbar__nav {
        @apply lg:flex-row;
      }

      & > .collapse {
        @apply lg:visible;
      }

      .navbar--collapse {
        @apply lg:flex lg:basis-auto;
      }
    }

    &-md {
      .navbar__nav {
        @apply md:flex-row;
      }

      & > .collapse {
        @apply md:visible;
      }

      .navbar--collapse {
        @apply md:flex md:basis-auto;
      }
    }

    &-sm {
      .navbar__nav {
        @apply sm:flex-row;
      }

      & > .collapse {
        @apply sm:visible;
      }

      .navbar--collapse {
        @apply sm:flex sm:basis-auto;
      }
    }
  }
}
</style>
