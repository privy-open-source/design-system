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
  provide,
  toRef,
} from 'vue-demi'
import { SizeVariant } from '../button'
import { INPUTGROUP_SETTING } from '.'

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
    provide(INPUTGROUP_SETTING, { size: toRef(props, 'size') })

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
    @apply dark:bg-dark-default focus-within:dark:ring-dark-subtle/10 dark:border-dark-muted hover:dark:border-dark-subtle focus-within:dark:border-dark-subtle;

    .input {
      @apply bg-transparent;
      @apply dark:bg-transparent;
    }

    .input > .input__form,
    .input-group__addon {
      @apply border-0;
    }

    .input > .input__form {
      @apply focus:ring-0;
    }

    &.input-group--disabled {
      @apply border-subtle;
      @apply dark:border-dark-subtle;
    }

    &.state--error,
    &.input-group--error {
      @apply border-danger-emphasis hover:border-danger-emphasis focus-within:ring-danger focus-within:border-danger-emphasis;
      @apply dark:border-dark-danger-emphasis hover:dark:border-dark-danger-emphasis focus-within:dark:ring-dark-danger focus-within:dark:border-dark-danger-emphasis;
    }
  }

  & > .input-group__addon:not(:first-child),
  & > .input:not(:first-child) > .input__form,
  & > .select:not(:first-child) > .input > .input__form {
    @apply rounded-l-none border-l-transparent;
    @apply dark:border-l-transparent;
  }

  & > .input-group__addon:not(:last-child),
  & > .input:not(:last-child) > .input__form {
    @apply rounded-r-none border-r-transparent;
    @apply dark:border-r-transparent;
  }

  & > .select:not(:last-child) > .input > .input__form {
    @apply rounded-r-none z-1;
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
    @apply rounded-none;

    &:first-child {
      @apply rounded-l;
    }

    &:last-child {
      @apply rounded-r;
    }

    > .input__form {
      &:hover,
      &:focus {
        @apply z-[2] border-l-subtle border-r-subtle;
        @apply dark:border-l-dark-subtle dark:border-r-dark-subtle;
      }
    }
  }

  & > .btn {
    @apply z-1;

    &:not(:first-child) {
      @apply rounded-l-none -ml-[1px];
    }

    &:not(:last-child) {
      @apply rounded-r-none;
    }
  }

  &&--disabled {
    @apply border-subtle border-solid border rounded;
    @apply dark:border-dark-subtle;

    > .input > .input__form,
    > .input-group__addon,
    > .btn.btn--variant-input {
      @apply border-transparent;
      @apply dark:border-transparent;
    }

    > .input:first-child .input__form,
    > .input-group__addon:first-child,
    > .btn:first-child {
      @apply rounded-l-sm;
    }

    > .input:last-child .input__form,
    > .input-group__addon:last-child,
    > .btn:last-child {
      @apply rounded-r-sm;
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
}
</style>
