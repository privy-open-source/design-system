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
  @apply inline-block font-bold text-xs px-2 py-0.5 text-on-emphasis rounded-full;

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
        @apply bg-[color:var(--p-bg-variant-default)];
      }

      &--primary {
        @apply bg-brand-accent;
      }

      &--info {
        @apply bg-info-emphasis;
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

  /**
  * Set color of Badge
  * in light and inverse variant
  */
  &&--variant-light,
  &&--variant-inverse {
    &.badge {
      &--default {
        --p-color-variant-light: theme(textColor.subtle);
        @apply text-[color:var(--p-color-variant-light)];
      }

      &--primary {
        @apply text-brand-accent;
      }

      &--info {
        @apply text-info;
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

  /**
  * Set background
  * in light variant
  */
  &--variant-light {
    &.badge {
      &--default {
        --p-bg-variant-light: theme(backgroundColor.subtle.alpha);
        @apply bg-[color:var(--p-bg-variant-light)];
      }

      &--primary {
        @apply bg-[color:var(--p-color-primary-light)];
      }

      &--info {
        @apply bg-info;
      }

      &--success {
        @apply bg-success;
      }

      &--warning {
        @apply bg-warning;
      }

      &--danger {
        @apply bg-danger;
      }
    }
  }

  /**
  * Remove background
  * in inverse and dot variant
  */
  &:where(.badge--variant-inverse, .badge--dot) {
    @apply bg-default;
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
