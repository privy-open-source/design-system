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
  onMounted,
  PropType,
  provide,
  toRef,
} from 'vue-demi'
import { StyleVariant } from '../nav/Nav.vue'
import {
  templateRef,
  useElementBounding,
  useWindowScroll,
} from '@vueuse/core'
import {
  ToggleableVariant,
  ColorVariant,
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
    color: {
      type   : String as PropType<ColorVariant>,
      default: 'light',
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

      if (props.color)
        result.push(`navbar--${props.color}`)

      if (props.fixed)
        result.push('navbar--fixed')

      if (props.variant)
        result.push(`navbar--${props.variant}`)

      if (props.toggleable)
        result.push(`navbar--expand-${props.toggleable}`)

      return result
    })

    onMounted(() => {
      document.body?.style.setProperty('padding-top', `${height?.value}px`)
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
  @apply relative p-5 flex items-center flex-wrap transition-shadow duration-150 ease-in-out;

  &&--fixed {
    @apply fixed left-0 top-0 w-full z-[1030];
  }

  &&--light {
    @apply bg-white;
  }

  &&--dark {
    @apply bg-black;
  }

  &&--shadow {
    @apply shadow-sm transition-shadow duration-150 ease-in-out;
  }

  &&--expand {
    :is(&-lg, &-md, &-sm) {
      @apply justify-between;

      .navbar__nav {
        @apply flex-col;
      }
    }

    &-lg {
      .navbar__nav {
        @apply lg:flex-row lg:items-center;
      }

      .navbar--collapse {
        @apply lg:flex lg:basis-auto;
      }
    }

    &-md {
      .navbar__nav {
        @apply md:flex-row md:items-center;
      }

      .navbar--collapse {
        @apply md:flex md:basis-auto;
      }
    }

    &-sm {
      .navbar__nav {
        @apply sm:flex-row sm:items-center;
      }

      .navbar--collapse {
        @apply sm:flex sm:basis-auto;
      }
    }
  }
}
</style>
