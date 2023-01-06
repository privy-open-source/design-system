<template>
  <div
    class="input-group"
    data-testid="input-group"
    :class="classNames">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'
import { SizeVariant } from '../button'

export default defineComponent({
  props: {
    size: {
      type   : String as PropType<SizeVariant>,
      default: 'md',
    },
    disabled: {
      type   : Boolean,
      default: false,
    },
    readonly: {
      type   : Boolean,
      default: false,
    },
    error: {
      type   : Boolean,
      default: false,
    },
  },
  setup (props) {
    const classNames = computed(() => {
      const result: string[] = []

      // eslint-disable-next-line unicorn/explicit-length-check
      if (props.size)
        result.push(`input-group--${props.size}`)

      if (props.disabled)
        result.push('input-group--disabled', 'state--disabled')

      if (props.readonly)
        result.push('input-group--readonly')

      if (props.error)
        result.push('input-group--error', 'state--error')

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
.input-group {
  @apply flex w-full;

  &:has(:first-child:is(.input-group__addon):nth-last-child(2)) {
    @apply rounded bg-default focus-within:ring-4 focus-within:ring-subtle/10 border border-solid border-muted hover:border-subtle focus-within:border-subtle;

    .input {
      @apply bg-transparent;
    }

    .input > .input__form,
    .input-group__addon {
      @apply border-0;
    }

    .input > .input__form {
      @apply focus:ring-0;
    }
  }

  & > .input-group__addon:not(:first-child),
  & > .input:not(:first-child) > .input__form,
  & > .select:not(:first-child) > .input > .input__form {
    @apply rounded-l-none border-l-transparent;
  }

  & > .input-group__addon:not(:last-child),
  & > .input:not(:last-child) > .input__form {
    @apply rounded-r-none border-r-transparent;
  }

  & > .select:not(:last-child) > .input > .input__form {
    @apply rounded-r-none;
  }

  & > .input-group__addon,
  & > .input,
  & > .select,
  & > .divider {
    &:not(:first-child) {
      @apply -ml-[1px];
    }
  }

  .input,
  .select > .input {
    > .input__form {
      &:hover,
      &:focus {
        @apply z-[2] border-l-subtle border-r-subtle;
      }
    }
  }

  & > .btn {
    @apply z-[1];

    &:not(:first-child) {
      @apply rounded-l-none -ml-[1px];
    }

    &:not(:last-child) {
      @apply rounded-r-none;
    }
  }

  &:is(&--xs, &--sm, &--md, &--lg) > &__addon {
    @apply flex-shrink-0;

    + .input {
      > .input__form {
        @apply pl-0;
      }
    }
  }

  &&--xs {
    .input > .input__form {
      @apply text-xs px-3 py-2;
    }

    .btn {
      @apply px-2 py-1 gap-1 text-sm;
    }
  }

  &&--sm {
    .input > .input__form {
      @apply px-3 py-2;
    }

    .btn {
      @apply px-4 py-2 gap-2 text-base;
    }
  }

  &&--md {
    .input > .input__form {
      @apply px-3 py-3;
    }

    .btn {
      @apply px-5 py-3 gap-3 text-base;
    }
  }

  &&--lg {
    .input > .input__form {
      @apply px-3 py-4;
    }

    .btn {
      @apply px-8 py-4 gap-4 text-base;
    }
  }
}
</style>
