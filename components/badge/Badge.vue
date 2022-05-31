<template>
  <div
    data-testid="badge"
    :class="classNames">
    <Dot
      v-if="variant === 'dot'"
      :color="color" />
    <slot v-else />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, computed,
} from 'vue-demi'
import Dot from '../dot/Dot.vue'

type ColorVariant = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'gold'
type StyleVariant = 'light' | 'inverse' | 'dot'

export default defineComponent({
  components: { Dot },
  props     : {
    color: {
      type   : String as PropType<ColorVariant>,
      default: 'primary',
    },
    variant: {
      type   : String as PropType<StyleVariant>,
      default: undefined,
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

  /**
  * Set color of Badge
  * in light and inverse variant
  */
  &&--light,
  &&--inverse {
    &.badge--primary {
      @apply text-primary-100;
    }

    &.badge--secondary {
      @apply text-secondary-100;
    }

    &.badge--success {
      @apply text-success-100;
    }

    &.badge--info {
      @apply text-info-100;
    }

    &.badge--warning {
      @apply text-warning-100;
    }

    &.badge--danger {
      @apply text-danger-100;
    }

    &.badge--gold {
      @apply text-gold-100;
    }
  }

  /**
  * Set background
  * in light variant
  */
  &&--light {
    &.badge--primary {
      @apply bg-primary-5;
    }

    &.badge--secondary {
      @apply bg-secondary-5;
    }

    &.badge--success {
      @apply bg-success-5;
    }

    &.badge--info {
      @apply bg-info-5;
    }

    &.badge--warning {
      @apply bg-warning-5;
    }

    &.badge--danger {
      @apply bg-danger-5;
    }

    &.badge--gold {
      @apply bg-gold-5;
    }
  }

  /**
  * Remove background
  * in inverse and dot variant
  */
  &&--inverse,
  &&--dot {
    @apply bg-transparent;
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
