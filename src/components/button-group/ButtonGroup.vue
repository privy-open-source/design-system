<template>
  <div
    data-testid="btn-group"
    :class="classNames">
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

      // eslint-disable-next-line unicorn/explicit-length-check
      if (props.size)
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
  @apply inline-flex items-center;

  &--xs {
    .btn {
      &:not(.btn--icon),
      .dropdown > & {
        @apply px-2 py-1 gap-1 text-sm;
      }

      &:first-child,
      .dropdown:first-child {
        @apply rounded-l-xs;
      }

      &:last-child {
        @apply rounded-r-xs;
      }
    }
  }

  &--sm {
    .btn {
      &:not(.btn--icon),
      .dropdown .btn {
        @apply px-4 py-2 gap-2 text-base;

        &:first-child {
          @apply rounded-l-sm;
        }

        &:last-child {
          @apply rounded-r-sm;
        }
      }
    }
  }

  &--md {
    .btn {
      &:not(.btn--icon),
      .dropdown > .btn {
        @apply px-5 py-3 gap-3 text-base;
      }
    }
  }

  &--lg {
    .btn {
      &:not(.btn--icon),
      .dropdown .btn {
        @apply px-8 py-5 gap-4 text-base;
      }
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

    .dropdown {
      &:first-child > .btn {
        @apply rounded-l;
      }

      &:last-child > .btn {
        @apply rounded-r;
      }
    }
  }

  &--pill {
    .btn,
    .dropdown .btn {
      &:first-child {
        @apply rounded-l-full;
      }

      &:last-child {
        @apply rounded-r-full;
      }
    }
  }

  .btn {
    @apply rounded-none;

    &--solid,
    &--ghost {
      &:not(:last-child) {
        &.btn--primary,
        &.btn--secondary,
        &.btn--success,
        &.btn--warning,
        &.btn--info,
        &.btn--danger,
        &.btn--gold {
          @apply border-r-black border-opacity-10;
        }
      }
    }

    &--outline,
    &--ghost {
      @apply ml-[-1px];
    }
  }

  .dropdown > .btn {
    @apply rounded-none;
  }

}
</style>
