<template>
  <input
    v-model="value"
    :disabled="disabled"
    :readonly="readonly"
    data-testid="input"
    class="input">
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { useVModel } from './use-input'

export default defineComponent({
  props: {
    modelValue: {
      type   : [String, Number],
      default: '',
    },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue'],
  setup (props) {
    const value = useVModel(props)

    return { value }
  },
})
</script>

<style lang="postcss">
.input {
  @apply px-3 py-2 rounded-sm border border-secondary-25 placeholder:text-subtext-75 w-full outline-none bg-white;

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
}
</style>
