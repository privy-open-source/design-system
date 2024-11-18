<template>
  <label
    data-testid="checkbox"
    class="checkbox"
    :class="classNames"
    @click.prevent="toggle">
    <span class="checkbox__icon">
      <!-- checked icon -->
      <icon-inderteminate v-if="indeterminate" />
      <icon-checkbox v-else />
    </span>
    <span class="checkbox__label">
      <slot :is-checked="model" />
    </span>
    <input
      type="checkbox"
      :checked="model"
      :name="name"
      :disabled="disabled || readonly"
      :value="value">
  </label>
</template>

<script lang="ts" setup>
import { useVModel } from '.'
import type { PropType, VNode } from 'vue-demi'
import { computed } from 'vue-demi'
import IconCheckbox from './icon/IconCheckbox.vue'
import IconInderteminate from './icon/IconInderteminate.vue'

defineOptions({
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
})

const props = defineProps({
  name: {
    type   : String,
    default: undefined,
  },
  modelValue: {
    type   : undefined as PropType<any>,
    default: false,
  },
  value: {
    type   : undefined as PropType<any>,
    default: true,
  },
  uncheckedValue: {
    type   : undefined as PropType<any>,
    default: false,
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
  indeterminate: {
    type   : Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'change': [boolean],
  'update:modelValue': [unknown],
}>()

const model = useVModel(props)

const classNames = computed(() => {
  const result: string[] = []

  if (model.value)
    result.push('checkbox--checked')

  if (props.indeterminate)
    result.push('checkbox--indeterminate')

  if (props.disabled)
    result.push('checkbox--disabled')

  if (props.readonly)
    result.push('checkbox--readonly')

  return result
})

function toggle () {
  if (!props.readonly && !props.disabled) {
    const value = !model.value

    model.value = value
    emit('change', value)
  }
}

defineSlots<{
  'default'(props: { isChecked: boolean }): VNode[],
}>()
</script>

<style lang="postcss">
.checkbox {
  @apply inline-flex space-x-2 relative cursor-pointer select-none items-baseline;

  /**
  * hide default appearance
  * checkbox
  */
  > input[type="checkbox"] {
    @apply appearance-none w-0 h-0 opacity-0 absolute;
  }

  /**
  * replace default appearance
  * with custom icon
  */
  &__icon {
    @apply w-4 h-4 inline-flex shrink-0 border rounded-tn border-subtle items-center justify-center bg-default;
    @apply dark:border-dark-subtle dark:bg-dark-default;

    > svg {
      @apply w-3 fill-default;
      @apply dark:fill-dark-default;
    }
  }

  /**
  * active checkbox with
  * wtf-you-want custom appearance
  */
  &[appearance="none"] {
    &.checkbox {
      &--checked {
        .card {
          @apply border-brand-accent;
          @apply dark:border-dark-brand-accent;
        }
      }
    }

    > .checkbox__icon {
      @apply hidden;
    }

    > .checkbox__label {
      @apply ml-0;
    }
  }

  /**
  * give color of
  * checkbox label
  */
  &__label {
    @apply text-default;
    @apply dark:text-dark-default;
  }

  /**
  * checkbox checked
  */
  &--checked,
  &--indeterminate {
    .checkbox__icon {
      @apply bg-brand-accent border-brand-accent;
      @apply dark:bg-dark-brand-accent dark:border-dark-brand-accent;

      > svg {
        @apply fill-default;
        @apply dark:fill-dark-inverse;
      }
    }
  }

  /**
  * disable checkbox
  */
  &--disabled {
    @apply opacity-50;

    &:not(.checkbox--checked, .checkbox--indeterminate) {
      .checkbox__icon {
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

    .checkbox__label {
      @apply ml-4;
    }

    &:hover,
    &:focus-visible {
      @apply bg-default-alpha;
      @apply dark:bg-dark-default-alpha;
    }
  }
}
</style>
