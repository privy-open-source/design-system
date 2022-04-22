<template>
  <label
    data-testid="radio"
    class="radio"
    :class="classNames">
    <input
      v-model="value"
      type="radio"
      :name="name"
      :disabled="disabled || readonly"
      @change="$emit('change', $event)">
    <span class="radio__icon">
      <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7" cy="7" r="6.25" fill="white"/>
      </svg>
    </span>
    <span class="radio__label">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
import { useVModel } from "./use-radio"
import { computed, defineComponent, ref } from "vue-demi"

export interface ChangedInteface {
  value: any,
  state: boolean,
}

export default defineComponent({
  props: {
    name: {
      type: String,
    },
    modelValue: {
      default: false,
    },
    checked: {
      type   : Boolean,
      default: false,
    },
    value: {
      default: true,
    },
    readonly: {
      type   : Boolean,
      default: false,
    },
    disabled: {
      type   : Boolean,
      default: false,
    },
    indeterminate: {
      type   : Boolean,
      default: false,
    },
  },
  emits: [
    'change',
    'update:modelValue',
  ],
  setup (props) {
    const value = useVModel(props)

    const classNames = computed(() => {
      const result: string[] = []

      if (value.value)
        result.push('radio--checked')

      if (props.indeterminate)
        result.push('radio--indeterminate')

      if (props.disabled)
        result.push('radio--disabled')

      return result
    })

    return {
      value,
      classNames,
    }
  },
})
</script>

<style lang="postcss">
.radio {
  @apply inline-flex gap-2 relative cursor-pointer select-none items-baseline;

  & > input[type="radio"] {
    @apply appearance-none w-0 h-0 opacity-0 absolute;
  }

  &__icon {
    @apply w-5 h-5 border rounded-full border-secondary-25 inline-flex items-center justify-center bg-white;

    & > svg {
      @apply w-3;
    }
  }

  &--disabled {
    @apply opacity-50;
  }

  &--checked {
    .radio__icon {
      @apply bg-primary-100;
    }
  }
}
</style>
