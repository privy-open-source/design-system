<template>
  <input
    v-model="value"
    :disabled="disabled"
    :readonly="readonly"
    data-testid="input"
    class="input"
    :class="classNames">
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'
import { useVModel } from '.'
import { SizeVariant } from '../button'

export default defineComponent({
  props: {
    modelValue: {
      type   : [String, Number],
      default: '',
    },
    size: {
      type   : String as PropType<SizeVariant>,
      default: 'md',
    },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    error   : { type: Boolean },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue'],
  setup (props) {
    const value = useVModel(props)

    const classNames = computed(() => {
      const result: string[] = []

      // eslint-disable-next-line unicorn/explicit-length-check
      if (props.size)
        result.push(`input--${props.size}`)

      if (props.disabled)
        result.push('input--disabled')

      if (props.readonly)
        result.push('input--readonly')

      if (props.error)
        result.push('input--error', 'state--error')

      return result
    })

    return {
      classNames,
      value,
    }
  },
})
</script>

<style lang="postcss">
.input {
  @apply text-base rounded-sm border border-secondary-25 border-solid placeholder:text-subtext-75 w-full outline-none bg-white;

  &:disabled,
  &--disabled {
    @apply opacity-50 pointer-events-none;
  }

  &:focus {
    @apply border-secondary-75 ring ring-secondary-25 ring-opacity-30;
  }

  &[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      @apply appearance-none m-0;
    }
  }

  &--xs {
    @apply text-xs px-3 py-2;
  }

  &--sm {
    @apply px-3 py-2;
  }

  &--md {
    @apply px-3 py-3;
  }

  &--lg {
    @apply px-3 py-4;
  }

  &--error,
  &.state--error {
    @apply border-danger-100;

    &:focus {
      @apply ring-danger-25 border-danger-100;
    }
  }

  /* Custom Input Range */
  &[type="range"] {
    @apply p-0 appearance-none border-0 bg-white h-2 my-4;

    &:focus {
      @apply ring-0;
    }

    /* Chrome and Safari */
    &::-webkit-slider-thumb {
      @apply appearance-none w-4 h-4 rounded-full shadow cursor-pointer bg-white;

      &:hover {
        @apply bg-primary-100;
      }

      &:active {
        @apply ring ring-primary-25;
      }
    }

    &::-webkit-slider-runnable-track {
      @apply appearance-none bg-primary-100;
    }

    /* Firefox */
    &::-moz-range-thumb {
      @apply appearance-none w-4 h-4 rounded-full shadow cursor-pointer bg-white border-0;

      &:hover {
        @apply bg-primary-100;
      }

      &:active {
        @apply ring ring-primary-25 h-2;
      }
    }

    /* IE */
    &::-ms-thumb {
      @apply appearance-none w-4 h-4 rounded-full shadow cursor-pointer bg-white;

      &:hover {
        @apply bg-primary-100;
      }

      &:active {
        @apply ring ring-primary-25;
      }
    }
  }
}
</style>
