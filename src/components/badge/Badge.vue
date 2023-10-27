<template>
  <span
    data-testid="badge"
    :class="classNames">
    <slot />
  </span>
</template>

<script lang="ts">
import type { PropType } from 'vue-demi'
import {
  defineComponent,
  computed,
} from 'vue-demi'
import type { StyleVariant } from '.'
import type { ColorVariant } from '../button'

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
  --p-color-dark-primary-light: darken(theme(colors.dark.brand.accent), 40%);

  @apply inline-block font-bold text-xs px-2 py-0.5 rounded-full space-x-1 align-middle;

  > .persona-icon,
  > svg {
    @apply inline-block;
  }

  &:not(&--variant-default&--default) {
    @apply text-state-emphasis;
    @apply dark:text-dark-state-emphasis
  }

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
        --p-bg-dark-variant-default: theme(backgroundColor.dark.inverse);

        &:not([class^='bg-'], [class*='bg-']) {
          @apply bg-[color:var(--p-bg-variant-default)];
          @apply dark:bg-[color:var(--p-bg-dark-variant-default)];
        }

        &:not([class^='text-'], [class*='text-']) {
          @apply text-state-emphasis;
          @apply dark:text-dark-state-emphasis dark:text-dark-on-emphasis;
        }
      }

      &--primary {
        @apply bg-brand-accent;
        @apply dark:bg-dark-brand-accent;
      }

      &--info {
        @apply bg-info-emphasis;
        @apply dark:bg-dark-info-emphasis;
      }

      &--success {
        @apply bg-success-emphasis;
        @apply dark:bg-dark-success-emphasis;
      }

      &--warning {
        @apply bg-warning-emphasis;
        @apply dark:bg-dark-warning-emphasis;
      }

      &--danger {
        @apply bg-danger-emphasis;
        @apply dark:bg-dark-danger-emphasis;
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
        --p-color-dark-variant-inverse: theme(textColor.dark.subtle);
        @apply text-[color:var(--p-color-variant-inverse)];
        @apply dark:text-[color:var(--p-color-dark-variant-inverse)];
      }

      &--primary {
        @apply text-brand-accent;
        @apply dark:text-dark-brand-accent;
      }

      &--info {
        @apply text-info;
        @apply dark:text-dark-info;
      }

      &--success {
        @apply text-success;
        @apply dark:text-dark-success;
      }

      &--warning {
        @apply text-warning;
        @apply dark:text-dark-warning;
      }

      &--danger {
        @apply text-danger;
        @apply dark:text-dark-danger;
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
        --p-bg-dark-variant-light: theme(backgroundColor.dark.subtle.alpha);
        @apply bg-[color:var(--p-bg-variant-light)];
        @apply dark:bg-[color:var(--p-bg-dark-variant-light)];
      }

      &--primary {
        @apply bg-[color:var(--p-color-primary-light)];
        @apply dark:bg-[color:var(--p-color-dark-primary-light)];
      }

      &--info {
        @apply bg-info;
        @apply dark:bg-dark-info;
      }

      &--success {
        @apply bg-success;
        @apply dark:bg-dark-success;
      }

      &--warning {
        @apply bg-warning;
        @apply dark:bg-dark-warning;
      }

      &--danger {
        @apply bg-danger;
        @apply dark:bg-dark-danger;
      }
    }
  }

  /**
  * Remove background
  * in inverse and dot variant
  */
  &:where(.badge--variant-inverse, .badge--dot) {
    @apply bg-default;
    @apply dark:bg-dark-default;
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
