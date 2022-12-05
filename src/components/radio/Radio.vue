<template>
  <label
    data-testid="radio"
    class="radio"
    :class="classNames"
    @click.prevent="toggle">
    <input
      type="radio"
      :value="model"
      :name="name"
      :disabled="disabled || readonly">
    <span class="radio__icon">
      <IconCheck v-if="apperance === 'option'" />
      <svg
        v-else-if="apperance === 'checkbox'"
        width="10"
        height="10"
        viewBox="0 0 14 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.81581 8.48528L5.23002 9.8995L6.64423 8.48528L13.7153 1.41421L12.3011 0L5.23002 7.07107L1.69449 3.53553L0.280273 4.94975L3.81581 8.48528Z" />
      </svg>

      <svg
        v-else
        width="10"
        height="10"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="7"
          cy="7"
          r="6.25" />
      </svg>
    </span>
    <span class="radio__label">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
import { useVModel } from '.'
import IconCheck from '@carbon/icons-vue/lib/checkmark/16'
import {
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'

export interface ChangedInteface {
  value: any,
  state: boolean,
}

type ApperanceType = 'radio' | 'checkbox' | 'option'

export default defineComponent({
  components: { IconCheck },
  props     : {
    name: {
      type   : String,
      default: '',
    },
    modelValue: {
      type: [
        String,
        Number,
        Boolean,
        Array,
        Object,
        Date,
      ],
      default: false,
    },
    value: {
      type: [
        String,
        Number,
        Boolean,
        Array,
        Object,
        Date,
      ],
      default: true,
    },
    checked: {
      type   : Boolean,
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
    apperance: {
      type   : String as PropType<ApperanceType>,
      default: 'radio',
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue', 'change'],
  setup (props) {
    const model = useVModel(props)

    const classNames = computed(() => {
      const result: string[] = []

      if (model.value)
        result.push('radio--checked')

      if (props.readonly)
        result.push('radio--readonly')

      if (props.disabled)
        result.push('radio--disabled')

      if (props.apperance)
        result.push(`radio--${props.apperance}`)

      return result
    })

    function toggle () {
      if (!props.disabled && !props.readonly)
        model.value = true
    }

    return {
      model,
      classNames,
      toggle,
    }
  },
})
</script>

<style lang="postcss">
.radio {
  @apply inline-flex space-x-2 relative cursor-pointer select-none items-baseline;

  & > input[type="radio"] {
    @apply appearance-none w-0 h-0 opacity-0 absolute;
  }

  &__icon {
    @apply w-5 h-5 border rounded-full border-subtle inline-flex items-center justify-center bg-default;

    > svg {
      @apply w-3 fill-default;
    }
  }

  &__label {
    @apply text-default;
  }

  &&--disabled {
    @apply opacity-50;

    &:not(.radio--checked) {
      .radio__icon {
        @apply bg-inactive border-subtle;

        > svg {
          @apply fill-inactive;
        }
      }
    }
  }

  &&--checked {
    .radio__icon {
      @apply bg-accent-emphasis border-accent-emphasis;
    }

    &.radio--checkbox {
      .radio__icon {
        > svg {
          @apply fill-default;
        }
      }
    }
  }

  &&--checkbox {
    .radio__icon {
      @apply rounded-sm;
    }
  }

  &&--option {
    .radio__icon {
      @apply order-2 border-none invisible bg-transparent;

      & > svg {
        @apply w-4;
      }
    }

    .radio__label {
      @apply flex-grow;
    }

    &.radio--checked {
      .radio__icon {
        @apply text-accent visible;
      }
    }
  }

  .dropdown__menu & {
    @apply py-[2px] w-full select-none;

    &:hover,
    &:focus-visible {
      @apply bg-subtle;
    }
  }
}
</style>
