<template>
  <label
    data-testid="checkbox"
    class="checkbox"
    :class="classNames">
    <input
      v-model="value"
      type="checkbox"
      :name="name"
      :disabled="disabled || readonly"
      @change="$emit('change', $event)">
    <span class="checkbox__icon">
      <!-- checked icon -->
      <template v-if="indeterminate">
        <svg width="10" height="10" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="14" height="2" fill="white"/>
        </svg>
      </template>
      <template v-else>
        <svg width="10" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.81581 8.48528L5.23002 9.8995L6.64423 8.48528L13.7153 1.41421L12.3011 0L5.23002 7.07107L1.69449 3.53553L0.280273 4.94975L3.81581 8.48528Z" fill="white"/>
        </svg>
      </template>
    </span>
    <span class="checkbox__label">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
import { useVModel } from "./use-checkbox"
import { computed, defineComponent } from "vue-demi"

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
    uncheckedValue: {
      default: false,
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
        result.push('checkbox--checked')

      if (props.indeterminate)
        result.push('checkbox--indeterminate')

      if (props.disabled)
        result.push('checkbox--disabled')

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
.checkbox {
  @apply inline-flex gap-2 relative cursor-pointer select-none items-baseline;

  & > input[type="checkbox"] {
    @apply appearance-none w-0 h-0 opacity-0 absolute;
  }

  &__icon {
    @apply w-5 h-5 border rounded-tn border-secondary-25 inline-flex items-center justify-center bg-white;

    & > svg {
      @apply w-3;
    }
  }

  &--checked {
    .checkbox__icon {
      @apply bg-primary-100;
    }
  }
}
</style>
