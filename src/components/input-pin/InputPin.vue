<template>
  <div
    ref="root"
    data-testid="input-pin"
    class="input-pin"
    :class="classNames">
    <p-input
      v-for="i in num"
      :key="i"
      maxlength="1"
      v-bind="$attrs"
      :model-value="getValue(i - 1)"
      :size="size"
      :clearable="false"
      :readonly="readonly"
      :disabled="disabled"
      :error="error"
      @keydown="onKeyDown($event)"
      @beforeinput.prevent="setValue(i - 1, $event)"
      @keydown.left.stop.prevent="prevFocus"
      @keydown.right.stop.prevent="nextFocus" />
  </div>
</template>

<script lang="ts" setup>
import pInput from '../input/Input.vue'
import type { PropType } from 'vue-demi'
import {
  computed,
  toRef,
  ref,
} from 'vue-demi'
import {
  syncRef,
  useToNumber,
} from '@vueuse/core'
import { useFocus } from '../dropdown/utils/use-focus'
import type { AcceptVariant } from '../input'
import {
  isAccepted,
  removeUnaccepted,
} from '../input'
import { toArray } from '.'
import type { SizeVariant } from '../button'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  modelValue: {
    type   : String,
    default: undefined,
  },
  size: {
    type   : String as PropType<SizeVariant>,
    default: 'md',
  },
  length: {
    type   : [Number, String],
    default: 5,
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
  accept: {
    type   : String as PropType<AcceptVariant>,
    default: undefined,
  },
})

const emit = defineEmits<{
  'update:modelValue': [string],
  'change': [string],
}>()

const root       = ref<HTMLDivElement>()
const num        = useToNumber(toRef(props, 'length'))
const localModel = ref<string[]>(toArray(props.modelValue, num.value))

const classNames = computed(() => {
  const result: string[] = []

  if (props.disabled)
    result.push('input-pin--disabled')

  if (props.readonly)
    result.push('input-pin--readonly')

  if (props.error)
    result.push('input-pin--error', 'state--error')

  return result
})

const {
  next: nextFocus,
  prev: prevFocus,
} = useFocus(root, false)

const model = computed<string[]>({
  get () {
    return toArray(props.modelValue, num.value)
  },
  set (value: string[]) {
    const text = value.map((val) => val || ' ').join('').trimEnd()

    emit('change', text)
    emit('update:modelValue', text)
  },
})

syncRef(localModel, model, { deep: true, immediate: false })

function getValue (index: number): string {
  return localModel.value.at(index)
}

function setValue (index: number, event: InputEvent) {
  if (event.inputType === 'insertFromPaste')
    localModel.value = toArray(removeUnaccepted(props.accept, event.data), num.value)

  else if (event.inputType !== 'insertLineBreak' && (!event.data || isAccepted(props.accept, event.data))) {
    localModel.value[index] = event.data

    if (root.value) {
      if (event.inputType === 'deleteContentBackward')
        prevFocus()

      if (event.inputType === 'insertText')
        nextFocus()
    }
  }
}

function onKeyDown (event: KeyboardEvent) {
  if (!props.readonly && !props.disabled) {
    const target = event.target as HTMLInputElement

    if (target.value && [...event.key].length === 1 && !event.ctrlKey && !event.metaKey) {
      event.preventDefault()

      target.dispatchEvent(new InputEvent('beforeinput', { inputType: 'insertText', data: event.key }))
    } else if (event.key === 'Backspace') {
      event.preventDefault()

      target.dispatchEvent(new InputEvent('beforeinput', { inputType: 'deleteContentBackward' }))
    }
  }
}
</script>

<style lang="postcss">
.input-pin {
  @apply flex flex-row space-x-4;

  .input__form {
    -webkit-touch-callout: none;

    @apply text-center;
  }
}
</style>
