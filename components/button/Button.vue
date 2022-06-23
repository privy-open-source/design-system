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

export type StyleVariant = 'solid' | 'outline' | 'ghost' | 'link'
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'gold'
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg'

export default defineComponent({
  props: {
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'solid',
    },
    color: {
      type   : String as PropType<ColorVariant>,
      default: 'primary',
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
        result.push(`btn--${props.variant}`)

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
* Last Update   : June 20, 2022
*/
.btn {
  @apply inline-flex font-medium disabled:opacity-50 disabled:pointer-events-none;

  > svg {
    @apply self-baseline;
  }

  /*
  * Button has 4 different sizing
  * eg: xs, sm, md, and lg
  */
  &--xs {
    @apply px-2 py-1 gap-1 text-sm rounded-xs;
  }

  &--sm {
    @apply px-4 py-2 gap-2 text-base rounded-sm;
  }

  &--md {
    @apply px-5 py-3 gap-3 text-base rounded;
  }

  &--lg {
    @apply px-8 py-5 gap-4 text-base rounded;
  }

  /*
  * Button solid is the
  * default style variant
  */
  &--solid {
    @apply border;

    &.btn {
      &--primary {
        @apply bg-primary-100 text-white hover:bg-primary-hovered focus:bg-primary-focused active:bg-primary-focused;
      }

      &--secondary {
        @apply bg-secondary-100 text-white hover:bg-secondary-hovered focus:bg-secondary-focused active:bg-secondary-focused;
      }

      &--success {
        @apply bg-success-100 text-white hover:bg-success-hovered focus:bg-success-focused active:bg-success-focused;
      }

      &--info {
        @apply bg-info-100 text-white hover:bg-info-hovered focus:bg-info-focused active:bg-info-focused;
      }

      &--warning {
        @apply bg-warning-100 text-white hover:bg-warning-hovered focus:bg-warning-focused active:bg-warning-focused;
      }

      &--danger {
        @apply bg-danger-100 text-white hover:bg-danger-hovered focus:border-danger-focused active:bg-danger-focused;
      }

      &--gold {
        @apply bg-gold-100 text-white hover:bg-gold-hovered focus:bg-gold-focused active:bg-gold-focused;
      }
    }
  }

  &--outline,
  &--ghost {
    @apply border text-body-75 hover:text-body-100 hover:shadow-lg focus:shadow-none active:shadow-none focus:text-body-100 active:text-body-100;
  }

  /**
  * Provide colors in
  * button outline variant
  * and border colors for
  * solid variant
  */
  &--solid,
  &--outline {
    &.btn {
      &--primary {
        @apply border-primary-100 hover:border-primary-hovered active:border-primary-focused focus:border-primary-focused;
      }

      &--secondary {
        @apply border-secondary-100 hover:border-secondary-hovered active:border-secondary-focused focus:border-secondary-focused;
      }

      &--success {
        @apply border-success-100 hover:border-success-hovered active:border-success-focused focus:border-success-focused;
      }

      &--info {
        @apply border-info-100 hover:border-info-hovered active:border-info-focused focus:border-info-focused;
      }

      &--warning {
        @apply border-warning-100 hover:border-warning-hovered active:border-warning-focused focus:border-warning-focused;
      }

      &--danger {
        @apply border-danger-100 hover:border-danger-hovered active:border-danger-focused focus:border-danger-focused;
      }

      &--gold {
        @apply border-gold-100 hover:border-gold-hovered active:border-gold-focused focus:border-gold-focused;
      }
    }
  }

  /**
  * Button ghost variant
  */
  &--ghost {
    @apply border-transparent bg-white bg-opacity-[0.0001] hover:border-black hover:border-opacity-5 hover:bg-black hover:bg-opacity-5 active:bg-black active:bg-opacity-5 active:border-black active:border-opacity-5 focus:bg-black focus:bg-opacity-5 focus:border-black focus:border-opacity-5;
  }

  /**
  * Provide text colors
  * in button link variant
  */
  &--link {
    @apply border border-transparent underline;

    &.btn {
      &--primary {
        @apply text-primary-100 hover:text-primary-hovered active:text-primary-focused focus:text-primary-focused;
      }

      &--secondary {
        @apply text-secondary-100 hover:text-secondary-hovered active:text-secondary-focused focus:text-secondary-focused;
      }

      &--success {
        @apply text-success-100 hover:text-success-hovered active:text-success-focused focus:text-success-focused;
      }

      &--info {
        @apply text-info-100 hover:text-info-hovered active:text-info-focused focus:text-info-focused;
      }

      &--warning {
        @apply text-warning-100 hover:text-warning-hovered active:text-warning-focused focus:text-warning-focused;
      }

      &--danger {
        @apply text-danger-100 hover:text-danger-hovered active:text-danger-focused focus:text-danger-focused;
      }

      &--gold {
        @apply text-gold-100 hover:text-gold-hovered active:text-gold-focused focus:text-gold-focused;
      }
    }
  }

  &--input {
    @apply border border-secondary-25 text-subtext-75 bg-white hover:bg-secondary-25 hover:text-body-75 active:border-secondary-75 active:ring active:ring-secondary-25 active:ring-opacity-30;
  }

  /**
  * Button icon variant
  */
  &--icon {
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

  &--pill {
    @apply rounded-full;
  }
}
</style>
