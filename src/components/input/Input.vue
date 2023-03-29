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

    function clear () {
      if (!props.disabled && !props.readonly)
        model.value = ''

      emit('clear')
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

  &__form {
    @apply py-[10px] px-3 text-base relative rounded border border-solid border-muted hover:border-subtle placeholder:text-muted w-full outline-none;

    &:disabled,
    &--disabled,
    .state--disabled & {
      @apply bg-subtle border-subtle pointer-events-none text-muted;
    }

    &:focus {
      @apply border-subtle ring-4 ring-subtle/10 z-[1];
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
  }

  .input__clear {
    @apply text-default/30 cursor-pointer hover:text-danger z-1;
  }

  &--clearable {
    @apply pr-9;

    + .input__clear {
      @apply absolute right-3 top-1/2 -translate-y-1/2;
    }
  }
}
</style>
