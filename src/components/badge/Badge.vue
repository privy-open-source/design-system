<template>
  <span
    data-testid="badge"
    :class="classNames">
    <slot />
  </span>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
} from 'vue-demi'
import { StyleVariant } from '.'
import { ColorVariant } from '../button'

export default defineComponent({
  props: {
    color: {
      type   : String as PropType<ColorVariant>,
      default: 'default',
    },
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'default',
    },
  },

  setup (props) {
    const classNames = computed(() => {
      const result: string[] = ['badge']

      if (props.color)
        result.push(`badge--${props.color}`)

      if (props.variant)
        result.push(`badge--variant-${props.variant}`)

      return result
    })

    return { classNames }
  },

})
</script>

<style lang="postcss">
/**
* Component Name: Badge
* Component URI : https://www.figma.com/file/JIYmbyRYZHc9bnVp6Npm9K/B-A-S-E-%2F-Components?node-id=278%3A3456
* Date Created  : May 30, 2022
* Last Update   : May 31, 2022
*/
.badge {
  /**
  * Set global style
  * of badge
  */
  --p-color-primary-light: lighten(theme(colors.brand.accent), 40%);
  --p-color-primary-dark: lighten(theme(colors.dark.brand.accent), 40%)

  @apply inline-block font-bold text-xs px-2 py-0.5 text-on-emphasis dark:text-dark-on-emphasis rounded-full;

  /**
  * Provide colors variant
  * 4 colors variant available
  * primary, success, warning
  * & danger
  */
  &&--variant-default {
    &.badge {
      &--default {
        --p-bg-variant-default: theme(backgroundColor.inverse);
        --p-bg-variant-default-dark: theme(backgroundColor.dark.inverse);
        @apply bg-[color:var(--p-bg-variant-default)] dark:bg-[color:var(--p-bg-variant-default-dark))];
      }

      &--primary {
        @apply bg-brand-accent dark:bg-dark-brand-accent;
      }

      &--info {
        @apply bg-info-emphasis dark:bg-dark-info-emphasis;
      }

      &--success {
        @apply bg-success-emphasis dark:bg-dark-success-emphasis;
      }

      &--warning {
        @apply bg-warning-emphasis dark:bg-dark-warning-emphasis;
      }

      &--danger {
        @apply bg-danger-emphasis dark:bg-dark-danger-emphasis;
      }
    }
  }

  /**
  * Set color of Badge
  * in light and inverse variant
  */
  &&--variant-light,
  &&--variant-inverse {
    &.badge {
      &--default {
        --p-color-variant-inverse: theme(textColor.subtle);
        --p-color-variant-inverse-dark: theme(textColor.dark.subtle)
        @apply text-[color:var(--p-color-variant-inverse)] dark:text-[color:var(var(--p-color-variant-inverse-dark))];
      }

      &--primary {
        @apply text-brand-accent dark:text-dark-brand-accent;
      }

      &--info {
        @apply text-info dark:text-dark-info;
      }

      &--success {
        @apply text-success dark:text-dark-success;
      }

      &--warning {
        @apply text-warning dark:text-dark-warning;
      }

      &--danger {
        @apply text-danger dark:text-dark-danger;
      }
    }
  }

  /**
  * Set background
  * in light variant
  */
  &--variant-light {
    &.badge {
      &--default {
        --p-bg-variant-light: theme(backgroundColor.subtle.alpha);
        --p-bg-variant-dark: theme(backgroundColor.dark.subtle.alpha);
        @apply bg-[color:var(--p-bg-variant-light)] dark:bg-[color:var(--p-bg-variant-dark)];
      }

      &--primary {
        @apply bg-[color:var(--p-color-primary-light)] dark:bg-[color:var(--p-color-primary-dark)];
      }

      &--info {
        @apply bg-info dark:bg-dark-info;
      }

      &--success {
        @apply bg-success dark:bg-dark-success;
      }

      &--warning {
        @apply bg-warning dark:bg-dark-warning;
      }

      &--danger {
        @apply bg-danger dark:bg-dark-danger;
      }
    }
  }

  /**
  * Remove background
  * in inverse and dot variant
  */
  &:where(.badge--variant-inverse, .badge--dot) {
    @apply bg-default dark:bg-dark-default;
  }

  /**
  * Reset box-model of
  * dot variant
  */
  &&--dot {
    @apply p-0 m-0 tracking-[0];

    .dot {
      @apply align-middle;
    }
  }
}
</style>
