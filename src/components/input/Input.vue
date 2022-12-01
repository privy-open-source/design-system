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
  @apply py-[10px] px-3 text-base relative rounded border border-solid border-muted placeholder:text-muted w-full outline-none bg-default;

  &:disabled,
  &--disabled {
    @apply opacity-50 pointer-events-none;
  }

  &:focus {
    @apply border-subtle ring-4 ring-subtle/10 z-[1];
  }

  &[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      @apply appearance-none m-0;
    }
  }
}
</style>
