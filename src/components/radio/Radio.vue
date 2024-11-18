<template>
  <label
    data-testid="radio"
    class="radio"
    :class="classNames"
    @click.prevent="toggle">
    <span class="radio__icon">
      <IconCheck v-if="appearance === 'option'" />
      <svg
        v-else-if="appearance === 'checkbox'"
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
          r="6" />
      </svg>
    </span>
    <span class="radio__label">
      <slot :is-checked="model" />
    </span>
    <input
      type="radio"
      :value="model"
      :name="name"
      :disabled="disabled || readonly">
  </label>
</template>

<script lang="ts" setup>
import { useVModel } from '.'
import IconCheck from '@privyid/persona-icon/vue/checkmark/20.vue'
import type { PropType, VNode } from 'vue-demi'
import { computed } from 'vue-demi'

type AppearanceType = 'radio' | 'checkbox' | 'option' | 'none'

const props = defineProps({
  name: {
    type   : String,
    default: '',
  },
  modelValue: {
    type   : undefined as PropType<any>,
    default: false,
  },
  value: {
    type   : undefined as PropType<any>,
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
  appearance: {
    type   : String as PropType<AppearanceType>,
    default: 'radio',
  },
})

defineEmits<{
  'update:modelValue': [boolean],
  'change': [boolean],
}>()

const model = useVModel(props)

const classNames = computed(() => {
  const result: string[] = []

  if (model.value)
    result.push('radio--checked')

  if (props.readonly)
    result.push('radio--readonly')

  if (props.disabled)
    result.push('radio--disabled')

  if (props.appearance)
    result.push(`radio--${props.appearance}`)

  return result
})

function toggle () {
  if (!props.disabled && !props.readonly)
    model.value = true
}

defineSlots<{
  'default'(props: { isChecked: boolean }): VNode[],
}>()
</script>

<style lang="postcss">
.radio {
  @apply inline-flex space-x-2 relative cursor-pointer select-none items-baseline;

  /**
  * hide default appearance
  * radio
  */
  & > input[type="radio"] {
    @apply appearance-none w-0 h-0 opacity-0 absolute;
  }

  /**
  * replace default appearance
  * with custom icon
  */
  &__icon {
    @apply w-4 h-4 border shrink-0 rounded-full border-subtle inline-flex items-center justify-center bg-default;
    @apply dark:border-dark-subtle dark:bg-dark-default;

    > svg {
      @apply w-3 fill-default;
      @apply dark:fill-dark-default;
    }
  }

  /**
  * give color of
  * checkbox label
  */
  &__label {
    @apply text-default grow;
    @apply dark:text-dark-default;
  }

  /**
  * disable radio
  */
  &&--disabled {
    @apply opacity-50;

    &:not(.radio--checked) {
      .radio__icon {
        @apply bg-base border-subtle;
        @apply dark:bg-dark-base dark:border-dark-subtle;

        > svg {
          @apply fill-subtle;
          @apply dark:fill-dark-subtle;
        }
      }
    }
  }

  /**
  * checked radio
  */
  &&--checked {
    &:not(.radio--checkbox, .radio--option) {
      .radio__icon {
        @apply bg-default;
        @apply dark:bg-dark-inverse;
      }
    }

    .radio__icon {
      @apply border-brand-accent;
      @apply dark:border-dark-brand-accent;

      > svg {
        @apply fill-brand-accent;
        @apply dark:fill-dark-brand-accent;
      }
    }

    &.radio--checkbox {
      .radio__icon {
        @apply bg-brand-accent;
        @apply dark:bg-dark-brand-accent;

        > svg {
          @apply fill-default;
          @apply dark:fill-dark-inverse;
        }
      }
    }
  }

  /**
  * radio with checkbox
  * appearance
  */
  &&--checkbox {
    .radio__icon {
      @apply rounded-tn;
    }
  }

  /**
  * radio with option
  * appearance
  */
  &&--option {
    .radio__icon {
      @apply order-2 border-none invisible bg-transparent;

      > svg {
        @apply w-4;
      }
    }

    .radio__label {
      @apply grow;
    }

    .dropdown__menu > .dropdown__subitem > & {
      .radio__label {
        @apply ml-0;
      }
    }

    &.radio--checked {
      .radio__icon {
        @apply text-info visible;
        @apply dark:text-dark-info;

        > svg {
          @apply fill-brand-accent;
          @apply dark:fill-dark-brand-accent;
        }
      }
    }
  }

  /**
  * radio with
  * appearance none
  */
  &&--none {
    .radio__icon {
      @apply hidden;

      + .radio__label {
        @apply ml-0;
      }
    }

    &.radio--disabled {
      .card {
        @apply bg-base hover:shadow-none hover:cursor-default;
        @apply dark:bg-dark-base;
      }
    }
  }

  /**
  * checkbox in
  * dropdown menu
  */
  .dropdown__menu > .dropdown__subitem > .dropdown__item > &,
  .dropdown__menu > .dropdown__subitem > & {
    @apply w-full select-none;
  }

  .dropdown__menu > .dropdown__subitem > .dropdown__item > & {
    @apply py-[2px];
  }

  .dropdown__menu > .dropdown__subitem > & {
    @apply px-4 py-[10px];

    &:not(.radio--option) {
      .radio__label {
        @apply ml-4;
      }
    }

    &:hover,
    &:focus-visible {
      @apply bg-default-alpha;
      @apply dark:bg-dark-default-alpha;
    }
  }
}
</style>
