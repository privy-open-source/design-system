<template>
  <div
    class="input-color"
    :class="[containerClass, inputClass]"
    data-testid="input-color"
    :style="`--p-input-color-bg:${model}`">
    <span class="input-color__body">
      <span class="input-color__face">
        <IconAddPlus24
          v-if="!model"
          data-testid="input-color-add"
          class="input-color__icon" />
        <template v-else>
          <IconCheckmarkCircleSolid20
            v-if="variant === 'circle'"
            data-testid="input-color-check-circle"
            class="input-color__icon" />
          <IconCheckmarkCircleSolid24
            v-else
            class="input-color__icon"
            data-testid="input-color-check" />
        </template>
      </span>
      <input
        v-model="model"
        :disabled="disabled"
        type="color"
        data-testid="input-color-form"
        :class="[classNames, 'input-color__form']">
    </span>
    <slot
      name="clearable"
      :clear="clear">
      <IconClear
        v-if="model && clearable"
        data-testid="input-color-clear"
        class="input-color__clear"
        @click="clear" />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import type { PropType, VNode } from 'vue-demi'
import { computed } from 'vue-demi'
import { useVModel } from '../input'
import IconCheckmarkCircleSolid20 from '@privyid/persona-icon/vue/checkmark-circle-solid/20.vue'
import IconCheckmarkCircleSolid24 from '@privyid/persona-icon/vue/checkmark-circle-solid/24.vue'
import IconAddPlus24 from '@privyid/persona-icon/vue/add-plus/24.vue'
import IconClear from '@privyid/persona-icon/vue/close-circle-solid/20.vue'
import type { StyleVariant } from '.'

const props = defineProps({
  modelValue: {
    type   : String,
    default: '',
  },
  variant: {
    type   : String as PropType<StyleVariant>,
    default: 'default',
  },
  clearable: {
    type   : Boolean,
    default: false,
  },
  disabled: {
    type   : Boolean,
    default: false,
  },
  error: {
    type   : Boolean,
    default: false,
  },
  containerClass: {
    type   : [String, Object],
    default: undefined,
  },
})

const emit  = defineEmits(['update:modelValue', 'clear'])
const model = useVModel(props)

const classNames = computed(() => {
  const result: string[] = ['']

  if (props.clearable)
    result.push('input-color__form--clearable')

  if (props.error)
    result.push('input-color__form--error', 'state--error')

  return result
})

const inputClass = computed(() => {
  const result: string[] = ['']

  if (props.variant)
    result.push(`input-color--${props.variant}`)

  if (props.disabled)
    result.push('input-color--disabled')

  if (model.value)
    result.push('input-color--selected')

  if (props.error)
    result.push('input-color--error')

  return result
})

function clear () {
  emit('clear')

  model.value = ''
}

defineSlots<{
  'clearable'(props: { clear: () => void }): VNode[],
}>()
</script>

<style lang="postcss">
.input-color {
  /**
  * define color-bg variable
  * for change
  */
  --p-input-color-bg: theme(backgroundColor.base.DEFAULT);

  @apply flex items-center space-x-3 relative;

  /**
  * default variant's
  * size and shape
  */
  &--default {
    .input-color__body {
      @apply w-14 h-14 rounded;
    }
  }

  /**
  * set sizing of
  * circle variant
  */
  &--circle {
    .input-color__body {
      @apply rounded-full w-10 h-10;
    }
  }

  /**
  * make icon in white
  * when color is selected
  */
  &:where(&--selected) {
    .input-color__icon {
      @apply text-state-emphasis;
      @apply dark:text-dark-state-emphasis;
    }
  }

  /**
  * selected state
  */
  &--selected {
    /**
    * coloring body of
    * input-color via
    * color-bg variable
    * */
    .input-color__body {
      @apply border-[color:var(--p-input-color-bg)] bg-[color:var(--p-input-color-bg)];
      @apply dark:border-[color:var(--p-input-color-bg)] dark:bg-[color:var(--p-input-color-bg)];
    }

    /**
    * make circle has
    * an outline when
    * selected
    */
    &.input-color--circle {
      .input-color__body {
        @apply outline outline-4 outline-default;
        @apply dark:outline-dark-default;
      }
    }
  }

  /**
  * default style of
  * body of input-color
  */
  &__body {
    @apply relative border-2 border-dashed border-default bg-base text-subtle;
    @apply dark:bg-dark-base dark:border-dark-default dark:text-dark-subtle;
  }

  /**
  * wrapper of checked
  * and add icon
  */
  &__face {
    @apply h-full w-full flex justify-center items-center;
  }

  /**
  * hide input-color
  * form visually
  */
  &__form {
    @apply w-full h-full absolute left-0 top-0 opacity-0;

    /**
    * cursor pointer
    * when form is not
    * disabled
    */
    &:not(&:disabled, &[disabled="true"], &--disabled) {
      @apply hover:cursor-pointer;
    }
  }

  /**
  * clear button
  */
  &__clear {
    @apply z-[10] text-default/30 cursor-pointer hover:text-danger absolute -right-2.5 -top-2.5;
    @apply dark:text-base-black/30 dark:hover:text-dark-danger;
  }

  /**
  * make input-color
  * looks vague when
  * disabled
  */
  &--disabled {
    .input-color__body {
      @apply opacity-50;
    }
  }

  /**
  * adding red border
  * when input error
  */
  &--error {
    .input-color__body {
      @apply ring-1 ring-danger-emphasis ring-offset-2;
      @apply dark:ring-dark-danger-emphasis;
    }
  }

  /**
  * make icon subtle
  * by default */
  &__icon {
    @apply text-subtle;
    @apply dark:text-dark-subtle;
  }
}
</style>
