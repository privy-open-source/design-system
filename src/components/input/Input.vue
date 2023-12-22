<template>
  <div
    class="input"
    :class="containerClass"
    data-testid="input-container">
    <span
      v-if="$slots.prepend"
      class="input__prepend">
      <slot name="prepend" />
    </span>
    <input
      ref="input"
      v-model="model"
      class="input__form"
      data-testid="input"
      :disabled="disabled"
      :readonly="readonly"
      :class="classNames"
      v-bind="$attrs"
      @beforeinput="checkOnInput(accept, $event)">
    <IconClear
      v-show="(clearable && model)"
      class="input__clear"
      data-testid="input-clear"
      @click="clear" />
    <span
      v-if="$slots.append"
      class="input__append">
      <slot name="append" />
    </span>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue-demi'
import {
  computed,
  defineComponent,
  inject,
  ref,
} from 'vue-demi'
import { useVModel } from '.'
import type { SizeVariant } from '../button'
import IconClear from '@privyid/persona-icon/vue/close-circle-solid/20.vue'
import { INPUTGROUP_SETTING } from '../input-group'
import type { AcceptVariant } from './utils/accept'
import {
  checkOnInput,
} from './utils/accept'

export default defineComponent({
  components  : { IconClear },
  inheritAttrs: false,
  props       : {
    modelValue: {
      type   : [String, Number],
      default: undefined,
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
    containerClass: {
      type: [
        String,
        Array,
        Object,
      ],
      default: undefined,
    },
    accept: {
      type   : String as PropType<AcceptVariant>,
      default: undefined,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue', 'clear'],
  setup (props, { emit, slots }) {
    const input   = ref<HTMLInputElement>()
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

      if (slots.prepend)
        result.push('input--has-prepend')

      if (slots.append)
        result.push('input--has-append')

      return result
    })

    function clear (event: MouseEvent) {
      emit('clear', event)

      if (!props.disabled && !props.readonly && !event.defaultPrevented)
        model.value = ''
    }

    return {
      input,
      classNames,
      model,
      clear,
      checkOnInput,
    }
  },
})
</script>

<style lang="postcss">
.input {
  @apply w-full relative bg-default rounded;
  @apply dark:bg-dark-default;

  &__form {
    @apply py-[10px] px-3 text-base relative rounded border border-solid border-muted hover:border-subtle text-default w-full outline-none bg-transparent;
    @apply dark:border-dark-muted hover:dark:border-dark-subtle dark:text-dark-default dark:bg-transparent;

    &::placeholder,
    &__placeholder {
      @apply text-muted;
      @apply dark:text-dark-muted;
    }

    &:disabled,
    &--disabled,
    &[disabled="true"],
    .state--disabled & {
      @apply bg-subtle border-subtle pointer-events-none text-muted;
      @apply dark:bg-dark-subtle dark:border-dark-subtle  dark:text-dark-muted;
    }

    &:focus {
      @apply border-subtle ring-4 ring-subtle/10 z-1;
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
  .state--error & > &__form:not(.no--error),
  &--error,
  &-group--error.input-group .input > .input__form:not(.no--error) {
    @apply border-danger-emphasis hover:border-danger-emphasis focus:ring-danger focus:border-danger-emphasis;
    @apply dark:border-dark-danger-emphasis hover:dark:border-dark-danger-emphasis focus:dark:ring-dark-danger focus:dark:border-dark-danger-emphasis;
  }

  .input__clear {
    @apply text-default/30 cursor-pointer hover:text-danger z-[2];
    @apply dark:text-dark-default/30 hover:dark:text-dark-danger;
  }

  &__prepend,
  &__append {
    @apply absolute top-0 h-full flex items-center z-[2];
  }

  &__prepend {
    @apply left-3;
  }

  &__append {
    @apply right-3;
  }

  &--has {
    &-prepend {
      @apply pl-9;
    }

    &-append {
      @apply pr-9;
    }
  }

  &--clearable {
    @apply pr-9;

    + .input__clear {
      @apply absolute right-3 top-1/2 -translate-y-1/2;
    }

    &:where(.input--has-append) {
      @apply pr-[4.15rem];
      + .input__clear {
        @apply right-[2.45rem];
      }
    }
  }
}
</style>
