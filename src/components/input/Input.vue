<template>
  <div
    class="input"
    data-testid="input-container">
    <slot name="prepend" />
    <input
      v-model="model"
      class="input__form"
      data-testid="input"
      :disabled="disabled"
      :readonly="readonly"
      :class="classNames"
      v-bind="$attrs">
    <IconClear
      v-show="(clearable && model)"
      class="input__clear"
      data-testid="input-clear"
      @click="clear" />
    <slot name="append" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  PropType,
} from 'vue-demi'
import { useVModel } from '.'
import { SizeVariant } from '../button'
import IconClear from '@carbon/icons-vue/lib/close--filled/16'
import { INPUTGROUP_SETTING } from '../input-group'

export default defineComponent({
  components  : { IconClear },
  inheritAttrs: false,
  props       : {
    modelValue: {
      type   : [String, Number],
      default: '',
    },
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
    clearable: {
      type   : Boolean,
      default: false,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue', 'clear'],
  setup (props, { emit }) {
    const model   = useVModel(props)
    const setting = inject(INPUTGROUP_SETTING, undefined, false)

    const classNames = computed(() => {
      const result: string[] = []

      // eslint-disable-next-line unicorn/explicit-length-check
      if (setting?.size.value)
        result.push(`input--${setting?.size.value}`)
      // eslint-disable-next-line unicorn/explicit-length-check
      else if (props.size)
        result.push(`input--${props.size}`)

      if (props.disabled)
        result.push('input--disabled')

      if (props.readonly)
        result.push('input--readonly')

      if (props.error)
        result.push('input--error', 'state--error')

      if (props.clearable)
        result.push('input--clearable')

      return result
    })

    function clear (event: MouseEvent) {
      emit('clear', event)

      if (!props.disabled && !props.readonly && !event.defaultPrevented)
        model.value = ''
    }

    return {
      classNames,
      model,
      clear,
    }
  },
})
</script>

<style lang="postcss">
.input {
  @apply w-full relative bg-default rounded;
  @apply dark:bg-dark-default;

  &__form {
    @apply py-[10px] px-3 text-base relative rounded border border-solid border-muted hover:border-subtle text-default placeholder:text-muted w-full outline-none;
    @apply dark:border-dark-muted hover:dark:border-dark-subtle dark:text-dark-default placeholder:dark:text-dark-muted;

    &:disabled,
    &--disabled,
    .state--disabled & {
      @apply bg-subtle border-subtle pointer-events-none text-muted;
      @apply dark:bg-dark-subtle dark:border-dark-subtle  dark:text-dark-muted;
    }

    &:focus {
      @apply border-subtle ring-4 ring-subtle/10 z-[1];
      @apply dark:border-dark-subtle dark:ring-dark-subtle/10;
    }
  }

  &--xs {
    @apply text-sm py-[2px] rounded-xs;
  }

  &--sm {
    @apply py-[4px] rounded-sm;
  }

  &--md {
    @apply py-[10px];
  }

  &--lg {
    @apply py-4;
  }

  .state--error,
  &--error,
  &-group--error.input-group .input > .input__form {
    @apply border-danger-emphasis hover:border-danger-emphasis focus:ring-danger focus:border-danger-emphasis;
    @apply dark:border-dark-danger-emphasis hover:dark:border-dark-danger-emphasis focus:dark:ring-dark-danger focus:dark:border-dark-danger-emphasis;
  }

  .input__clear {
    @apply text-default/30 cursor-pointer hover:text-danger z-1;
    @apply dark:text-dark-default/30 hover:dark:text-dark-danger;
  }

  &--clearable {
    @apply pr-9;

    + .input__clear {
      @apply absolute right-3 top-1/2 -translate-y-1/2;
    }
  }
}
</style>
