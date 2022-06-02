<template>
  <div
    data-testid="label"
    :class="classNames">
    <Dot
      v-if="variant === 'dot'"
      data-testid="dot"
      :color="color" /> <slot />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, computed,
} from 'vue-demi'
import Dot from '../dot/Dot.vue'

type ColorVariant = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'gold'
type StyleVariant = 'default' | 'light' | 'dot'
type SizeVariant = 'large' | 'medium' | 'small' | 'tiny'

export default defineComponent({
  components: { Dot },
  props     : {
    color: {
      type   : String as PropType<ColorVariant>,
      default: 'primary',
    },
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'default',
    },
    size: {
      type   : String as PropType<SizeVariant>,
      default: 'medium',
    },
  },

  setup (props) {
    const classNames = computed(() => {
      const result: string[] = ['label']

      if (props.color)
        result.push(`label--${props.color}`)

      if (props.variant)
        result.push(`label--${props.variant}`)

      // eslint-disable-next-line unicorn/explicit-length-check
      if (props.size)
        result.push(`label--${props.size}`)

      return result
    })

    return { classNames }
  },

})
</script>

<style lang="postcss">
/**
* Component Name: Label
* Component URI : https://www.figma.com/file/JIYmbyRYZHc9bnVp6Npm9K/B-A-S-E-%2F-Components?node-id=308%3A15173
* Date Created  : June 2, 2022
* Last Update   : June 2, 2022
*/

.label {
  @apply inline-flex items-center border border-transparent;

  &--large {
    @apply text-base px-4 py-2 rounded;
  }

  &--medium {
    @apply text-sm px-3 py-1 rounded-sm;
  }

  &--small {
    @apply text-sm px-2 py-[0.125] rounded-xs;
  }

  &--tiny {
    @apply px-2 py-0 text-xs rounded-tn;
  }

  &--default {
    @apply text-white;

    &.label {
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

  &--light {
    &.label {
      &--primary {
        @apply bg-primary-5 text-primary-100;
      }

      &--secondary {
        @apply bg-secondary-5 text-secondary-100;
      }

      &--success {
        @apply bg-success-5 text-success-100;
      }

      &--info {
        @apply bg-info-5 text-info-100;
      }

      &--warning {
        @apply bg-warning-5 text-warning-100;
      }

      &--danger {
        @apply bg-danger-5 text-danger-100;
      }

      &--gold {
        @apply bg-gold-5 text-gold-100;
      }
    }
  }

  &--dot {
    @apply bg-white text-body-100 border-black border-opacity-10;

    &.label {
      &--large,
      &--medium {
        .dot {
          @apply mr-2;
        }
      }

      &--small {
        .dot {
          @apply mr-1.5;
        }
      }

      &--tiny {
        .dot {
          @apply mr-1;
        }
      }
    }
  }
}
</style>
