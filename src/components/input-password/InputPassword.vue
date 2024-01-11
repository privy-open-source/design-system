<template>
  <p-input
    class="input-password"
    :model-value="modelValue"
    :size="size"
    :disabled="disabled"
    :readonly="readonly"
    :error="error"
    :clearable="clearable"
    :container-class="containerClass"
    :accept="accept"
    :type="isShow ? 'text' : 'password'"
    @clear="$emit('clear', $event)"
    @update:model-value="$emit('update:modelValue', $event)">
    <template #append>
      <IconHide
        v-if="isShow"
        class="input-password__toggle"
        @click.prevent.stop="toggle" />
      <IconShow
        v-else
        class="input-password__toggle"
        @click.prevent.stop="toggle" />
    </template>
  </p-input>
</template>

<script lang="ts" setup>
import pInput from '../input/Input.vue'
import IconShow from '@privyid/persona-icon/vue/view/20.vue'
import IconHide from '@privyid/persona-icon/vue/view-off/20.vue'
import { ref } from 'vue-demi'
import type { PropType } from 'vue-demi'
import type { SizeVariant } from '../button'
import type { AcceptVariant } from '../input/utils/accept'

defineProps({
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
})

defineEmits<{
  'update:modelValue': [string | number],
  'clear': [MouseEvent],
}>()

const isShow = ref(false)

function toggle () {
  isShow.value = !isShow.value
}
</script>

<style lang="postcss">
.input-password {
  @apply pr-9;

  &__toggle {
    @apply absolute right-[0.15rem] top-1/2 -translate-y-1/2 cursor-pointer z-1 text-default/30 hover:text-subtle;
    @apply dark:text-dark-default/30 hover:dark:text-dark-subtle;

    .input--disabled ~ & {
      @apply pointer-events-none text-muted;
      @apply dark:text-dark-muted;
    }
  }

  &.input--clearable {
    @apply pr-16;

    + .input__clear {
      @apply right-10;
    }
  }
}
</style>
