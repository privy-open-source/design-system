<template>
  <span
    data-testid="badge"
    :class="classNames">
    <slot />
  </span>
</template>

<script lang="ts">
import {
  defineComponent, PropType, computed,
} from 'vue-demi'

type ColorVariant = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'gold'
type StyleVariant = 'default' | 'light' | 'inverse'

export default defineComponent({
  props: {
    color: {
      type   : String as PropType<ColorVariant>,
      default: 'primary',
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
        result.push(`badge--${props.variant}`)

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
  @apply inline-block font-bold text-xs px-2 py-0.5 text-white rounded-full;

  /**
  * Provide colors variant
  * 7 colors variant available
  * primary, secondary, success
  * info, warning, danger, & gold
  */
  &--default {
    &.badge {
      &--primary {
        @apply bg-primary-100;
      }

      &--secondary {
        @apply bg-secondary-100;
      }

      &--success {
        @apply bg-success-100;
      }

      &--info {
        @apply bg-info-100;
      }

      &--warning {
        @apply bg-warning-100;
      }

      &--danger {
        @apply bg-danger-100;
      }

      &--gold {
        @apply bg-gold-100;
      }
    }
  }

  /**
  * Set color of Badge
  * in light and inverse variant
  */
  &--light,
  &--inverse {
    &.badge {
      &--primary {
        @apply text-primary-100;
      }

      &--secondary {
        @apply text-body-75;
      }

      &--success {
        @apply text-success-100;
      }

      &--info {
        @apply text-info-100;
      }

      &--warning {
        @apply text-warning-100;
      }

      &--danger {
        @apply text-danger-100;
      }

      &--gold {
        @apply text-gold-100;
      }
    }
  }

  /**
  * Set background
  * in light variant
  */
  &--light {
    &.badge {
      &--primary {
        @apply bg-primary-5;
      }

      &--secondary {
        @apply bg-secondary-5;
      }

      &--success {
        @apply bg-success-5;
      }

      &--info {
        @apply bg-info-5;
      }

      &--warning {
        @apply bg-warning-5;
      }

      &--danger {
        @apply bg-danger-5;
      }

      &--gold {
        @apply bg-gold-5;
      }
    }
  }

  /**
  * Remove background
  * in inverse and dot variant
  */
  &--inverse,
  &--dot {
    @apply bg-transparent;
  }

  /**
  * Reset box-model of
  * dot variant
  */
  &--dot {
    @apply p-0 m-0 tracking-[0];

    .dot {
      @apply align-middle;
    }
  }
}
</style>
