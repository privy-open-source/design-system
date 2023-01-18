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
      :clearable="false"
      :readonly="readonly"
      :disabled="disabled"
      :error="error"
      @input="setValue(i - 1, $event)"
      @focus.passive="onFocus"
      @keyup.delete.stop.prevent="onDelete"
      @keyup.left.stop.prevent="prevFocus"
      @keyup.right.stop.prevent="nextFocus"
      @paste.passive="onPaste" />
  </div>
</template>

<script lang="ts">
import pInput from '../input/Input.vue'
import {
  computed,
  defineComponent,
  toRef,
  ref,
} from 'vue-demi'
import {
  syncRef,
  templateRef,
  useToNumber,
} from '@vueuse/core'
import { useFocus } from '../dropdown/utils/use-focus'

export default defineComponent({
  components  : { pInput },
  inheritAttrs: false,
  props       : {
    modelValue: {
      type   : String,
      default: '',
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
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue', 'clear'],
  setup (props, { emit }) {
    const root       = templateRef<HTMLDivElement>('root')
    const num        = useToNumber(toRef(props, 'length'))
    const localModel = ref<string[]>([...props.modelValue].slice(0, num.value).map((val) => val.trim()))

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

    const { next: nextFocus, prev: prevFocus } = useFocus(root, false)

    const model = computed<string[]>({
      get () {
        return [...props.modelValue]
          .slice(0, num.value)
      },
      set (value: string[]) {
        const text = value.map((val) => val || ' ').join('').trimEnd()

        emit('update:modelValue', text)
      },
    })

    syncRef(localModel, model, { deep: true })

    function getValue (index: number): string {
      return localModel.value.at(index)
    }

    function setValue (index: number, event: InputEvent) {
      const target = event.target as HTMLInputElement
      const value  = target.value

      localModel.value[index] = value

      if (root.value) {
        if (value)
          nextFocus()
        else
          prevFocus()
      }
    }

    function onFocus (event: InputEvent) {
      (event.target as HTMLInputElement).select()
    }

    function onDelete (event: InputEvent) {
      if (root.value && !(event.target as HTMLInputElement).value)
        prevFocus()
    }

    function onPaste (event: ClipboardEvent) {
      localModel.value = [...event.clipboardData.getData('Text')]
        .slice(0, num.value)
    }

    return {
      classNames,
      num,
      localModel,
      getValue,
      setValue,
      onFocus,
      onDelete,
      onPaste,
      nextFocus,
      prevFocus,
    }
  },
})
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
