<template>
  <div class="input">
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
      @click="clear" />
    <slot name="append" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'
import { useVModel } from '.'
import { SizeVariant } from '../button'
import IconClear from '@carbon/icons-vue/lib/close--filled/16'

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
    const model = useVModel(props)

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

      if (props.clearable)
        result.push('input--clearable')

      return result
    })

    function clear () {
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
  @apply w-full relative bg-default;

  &__form {
    @apply py-[10px] px-3 text-base relative rounded border border-solid border-muted hover:border-subtle placeholder:text-muted w-full outline-none ;

    &:disabled,
    &--disabled {
      @apply bg-muted border-muted pointer-events-none text-muted;
    }

    &:focus {
      @apply border-subtle ring-4 ring-subtle/10 z-[1];
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

  &--error {
    @apply border-danger-emphasis hover:border-danger-emphasis;

    &:focus {
      @apply ring-danger border-danger-emphasis;
    }
  }

  .input__clear {
    @apply cursor-pointer hover:text-danger z-1;
  }

  &--clearable {
    @apply pr-9;

    + .input__clear {
      @apply absolute right-3 top-1/2 -translate-y-1/2;
    }
  }
}
</style>
