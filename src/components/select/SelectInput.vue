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
      class="input__hidden"
      type="text">
    <div
      class="input__form"
      data-testid="input"
      :disabled="disabled"
      :readonly="readonly"
      :class="classNames"
      :tabindex="1"
      v-bind="$attrs">
      <slot />
    </div>
    <span
      v-if="$slots.append"
      class="input__append">
      <slot name="append" />
    </span>
  </div>
</template>

<script lang="ts" setup>
import type {
  PropType,
  VNode,
} from 'vue-demi'
import {
  computed,
  inject,
} from 'vue-demi'
import type { SizeVariant } from '../button'
import { INPUTGROUP_SETTING } from '../input-group'

defineOptions({ inheritAttrs: false })

const props = defineProps({
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
  containerClass: {
    type: [
      String,
      Array,
      Object,
    ],
    default: undefined,
  },
})

const slots = defineSlots<{
  prepend(): VNode[],
  append(): VNode[],
}>()

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

  if (slots.prepend)
    result.push('input--has-prepend')

  if (slots.append)
    result.push('input--has-append')

  return result
})
</script>

<style lang="postcss">
.input .input__hidden {
  @apply h-0 block p-0 leading-[0];
}
</style>
