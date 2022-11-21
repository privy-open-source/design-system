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

type ColorVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger'
type StyleVariant = 'default' | 'light' | 'inverse'

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
  @apply inline-block font-bold text-xs px-2 py-0.5 text-onemphasis rounded-full;

  /**
  * Provide colors variant
  * 4 colors variant available
  * primary, success, warning
  * & danger
  */
  &&--variant-default {
    &.badge {
      &--default {
        @apply bg-emphasis-subtle;
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

  /**
  * Set color of Badge
  * in light and inverse variant
  */
  &&--variant-light,
  &&--variant-inverse {
    &.badge {
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

  /**
  * Set background
  * in light variant
  */
  &--variant-light {
    &.badge {
      &--primary {
        @apply bg-accent;
      }

      &--default {
        @apply bg-base-black/5;
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
