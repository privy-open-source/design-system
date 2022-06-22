<template>
  <div :class="classNames">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, computed,
} from 'vue-demi'
import type { SizeVariant } from '../button/Button.vue'

export default defineComponent({
  props: {
    size: {
      type   : String as PropType<SizeVariant>,
      default: 'md',
    },
    pill: {
      type   : Boolean,
      default: false,
    },
  },

  setup (props) {
    const classNames = computed(() => {
      const result: string[] = ['btn-group']

      if (props.size > 0)
        result.push(`btn-group--${props.size}`)

      if (props.pill)
        result.push('btn-group--pill')

      return result
    })

    return { classNames }
  },
})

</script>

<style lang="postcss">
.btn-group {
  &--xs {
    .btn {
      @apply px-2 py-1 gap-1 text-sm;

      &:first-child {
        @apply rounded-l-xs;
      }

      &:last-child {
        @apply rounded-r-xs;
      }
    }
  }

  &--sm {
    .btn {
      @apply px-4 py-2 gap-2 text-base;

      &:first-child {
        @apply rounded-l-sm;
      }

      &:last-child {
        @apply rounded-r-sm;
      }
    }
  }

  &--md {
    .btn {
      @apply px-5 py-3 gap-3 text-base;
    }
  }

  &--lg {
    .btn {
      @apply px-8 py-5 gap-4 text-base;
    }
  }

  &--md,
  &--lg {
    .btn {
      &:first-child {
        @apply rounded-l;
      }

      &:last-child {
        @apply rounded-r;
      }
    }
  }

  .btn {
    @apply rounded-none border-r-black;
  }

  &--pill {
    .btn {
      &:first-child {
        @apply rounded-l-full;
      }

      &:last-child {
        @apply rounded-r-full;
      }
    }
  }

}
</style>
