<template>
  <button
    data-testid="btn"
    :class="classNames">
    <slot />
  </button>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'

export type StyleVariant = 'solid' | 'outline' | 'ghost' | 'link' | 'input'
export type ColorVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger'
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg'

export default defineComponent({
  props: {
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'solid',
    },
    color: {
      type   : String as PropType<ColorVariant>,
      default: 'default',
    },
    size: {
      type   : String as PropType<SizeVariant>,
      default: 'md',
    },
    icon: {
      type   : Boolean,
      default: false,
    },
    pill: {
      type   : Boolean,
      default: false,
    },
  },
  setup (props) {
    const classNames = computed(() => {
      const result: string[] = ['btn']

      if (props.color)
        result.push(`btn--${props.color}`)

      if (props.variant)
        result.push(`btn--variant-${props.variant}`)

      // eslint-disable-next-line unicorn/explicit-length-check
      if (props.size)
        result.push(`btn--${props.size}`)

      if (props.icon)
        result.push('btn--icon')

      if (props.pill)
        result.push('btn--pill')

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
/**
* Component Name: Button
* Component URI : https://www.figma.com/file/JIYmbyRYZHc9bnVp6Npm9K/B-A-S-E-%2F-Components?node-id=291%3A3945
* Date Created  : Feb 01, 2022
* Last Update   : Nov 21, 2022
*/
.btn {
  @apply inline-flex font-medium disabled:opacity-50 disabled:pointer-events-none transition-all ease-in-out duration-200;

  > svg {
    @apply self-baseline;
  }

  /*
  * Button has 4 different sizing
  * eg: xs, sm, md, and lg
  */
  &&--xs {
    @apply px-2 py-[2px] gap-1 text-sm rounded-xs;
  }

  &&--sm {
    @apply px-4 py-1 gap-2 text-base rounded-[7px];
  }

  &&--md {
    @apply px-5 py-[10px] gap-3 text-base rounded;
  }

  &&--lg {
    @apply px-8 py-4 gap-4 text-base rounded;
  }

  /*
  * Button solid is the
  * default style variant
  */
  &&--variant-solid {
    @apply border border-solid hover:shadow-lg focus:shadow-none active:shadow-none text-onemphasis hover:brightness-[.85] focus:brightness-75 active:brightness-75;

    &.btn {
      &--default {
        @apply bg-default-alpha hover:bg-subtle-alpha focus:bg-subtle-alpha active:bg-subtle-alpha text-subtle hover:text-default focus:text-default;
      }

      &--primary {
        @apply bg-accent-emphasis;
      }

      &--success {
        @apply bg-success-emphasis;
      }

      &--warning {
        @apply bg-warning-emphasis;
      }

      &--danger {
        @apply bg-danger-emphasis;
      }
    }
  }

  &&--variant-outline,
  &&--variant-ghost {
    @apply border border-solid text-subtle hover:text-default hover:shadow-lg focus:shadow-none active:shadow-none focus:text-default active:text-default;
  }

  /**
  * Provide colors in
  * button outline variant
  * and border colors for
  * solid variant
  */
  &&--variant-solid,
  &&--variant-outline {
    @apply hover:brightness-[.85] focus:brightness-75 active:brightness-75;

    &.btn {
      &--default {
        @apply border-default-alpha hover:border-subtle-alpha active:border-subtle-alpha focus:border-subtle-alpha;
      }

      &--primary {
        @apply border-accent-emphasis;
      }

      &--success {
        @apply border-success-emphasis;
      }

      &--warning {
        @apply border-warning-emphasis;
      }

      &--danger {
        @apply border-danger-emphasis;
      }
    }
  }

  /**
  * Button ghost variant
  */
  &&--variant-ghost {
    @apply border-transparent bg-transparent hover:border-default-alpha hover:bg-default-alpha active:bg-default-alpha focus:bg-default-alpha active:border-default-alpha focus:border-default-alpha;
  }

  /**
  * Provide text colors
  * in button link variant
  */
  &&--variant-link {
    @apply border border-transparent underline font-normal hover:underline hover:brightness-[.85] focus:brightness-75;

    &.btn {
      &--default {
        @apply text-subtle;
      }

      &--primary {
        @apply text-accent;
      }

      &--success {
        @apply text-success;
      }

      &--warning {
        @apply text-warning;
      }

      &--danger {
        @apply text-danger;
      }
    }
  }

  &&--variant-input {
    @apply border border-solid border-muted text-default bg-default hover:border-subtle focus:border-subtle active:outline-default;
  }

  /**
  * Button icon variant
  */
  &&--icon {
    &.btn--xs {
      @apply p-1;
    }

    &.btn--sm {
      @apply p-2;
    }

    &.btn--md {
      @apply p-3;
    }

    &.btn--lg {
      @apply p-4;
    }
  }

  &&--pill {
    @apply rounded-full;
  }
}
</style>
