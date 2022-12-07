<template>
  <label
    class="dropzone"
    :class="classNames"
    data-testid="dropzone"
    @drop.prevent="onDrop"
    @dragover.prevent
    @dragenter.prevent="isDragover = true"
    @dragleave.prevent="isDragover = false"
    @mouseover="isHovered = true"
    @mouseout="isHovered = false">
    <input
      ref="input"
      data-testid="dropzone-input"
      class="dropzone__input"
      type="file"
      :multiple="multiple !== false"
      :accept="accept"
      :disabled="(disabled || readonly)"
      v-bind="$attrs"
      @change="onChange">
    <slot
      :is-dragover="isDragover"
      :is-hovered="isHovered"
      :model="model"
      :raw-model="rawModel"
      :browse="browse"
      :clear="clear" />
  </label>
</template>

<script lang="ts">
import accept from './utils/accept'
import { templateRef } from '@vueuse/core'
import {
  computed,
  defineComponent,
  nextTick,
  PropType,
  ref,
  toRef,
} from 'vue-demi'
import { useVModel } from '../input'
import { toBase64 } from '../utils/base64'
import { useToNumber } from '@vueuse/shared'
import { ModelModifier, MultipleType } from '.'

export default defineComponent({
  props: {
    modelValue: {
      type: [
        globalThis.File,
        Array,
        String,
      ] as PropType<globalThis.File | globalThis.File[] | string | string[]>,
      default: undefined,
    },
    modelModifiers: {
      type   : Object as PropType<ModelModifier>,
      default: () => ({} as ModelModifier),
    },
    multiple: {
      type   : [Boolean, String] as PropType<boolean | MultipleType>,
      default: false,
    },
    maxlength: {
      type   : [Number, String],
      default: undefined,
    },
    accept: {
      type   : String,
      default: '',
    },
    clearOnCancel: {
      type   : Boolean,
      default: false,
    },
    disabled: {
      type   : Boolean,
      default: false,
    },
    readonly: {
      type   : Boolean,
      default: false,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: [
    'update:modelValue',
    'change',
    'cancel',
  ],
  setup (props, { emit }) {
    const rawModel  = ref<globalThis.File | globalThis.File[]>()
    const model     = useVModel(props)
    const input     = templateRef<HTMLInputElement>('input')
    const maxlength = useToNumber(toRef(props, 'maxlength'), { method: 'parseInt' })

    const isDragover = ref(false)
    const isHovered  = ref(false)

    const classNames = computed(() => {
      const result: string[] = []

      if (isDragover.value)
        result.push('dropzone--dragover')

      if (isHovered.value)
        result.push('dropzone--hover')

      if (props.disabled)
        result.push('dropzone--disabled')

      if (props.readonly)
        result.push('dropzone--readonly')

      return result
    })

    function browse () {
      input.value.value = ''
      input.value.click()
    }

    function clear () {
      input.value.value = ''
      rawModel.value    = undefined
      model.value       = undefined
    }

    function onDrop (event: DragEvent) {
      if (!props.disabled && !props.readonly) {
        const files = event.dataTransfer.files

        isDragover.value = false

        handleFiles(files)
      }
    }

    function onChange (event: Event) {
      const target = event.target as HTMLInputElement
      const files  = target.files

      handleFiles(files)

      if (props.multiple === 'append') {
        /* Issue with multiselect with same file(s), need to be reset */
        nextTick(() => {
          target.value = ''
        })
      }
    }

    function filesToBase64 (files: globalThis.File | globalThis.File[]): Promise<string | string[]> {
      if (Array.isArray(files))
        return Promise.all(files.map((file) => toBase64(file)))

      return toBase64(files)
    }

    async function handleFiles (fileList: globalThis.FileList) {
      if (fileList.length > 0) {
        // eslint-disable-next-line unicorn/prefer-spread
        const files = accept(props.accept, Array.from(fileList))
        const file  = props.multiple !== false ? files : files.at(0)

        let value: typeof props.modelValue = file

        // multiple="append"
        if (props.multiple === 'append' && Array.isArray(model.value))
          value = [...model.value as globalThis.File[], ...value as globalThis.File[]]

        // maxlength
        if (Number.isInteger(maxlength.value) && Array.isArray(value))
          value = value.slice(0, maxlength.value)

        // keep original value before converting base64
        rawModel.value = value

        // v-model.base64
        if (props.modelModifiers.base64)
          value = await filesToBase64(file)

        model.value = value
        emit('change', value)
      } else {
        if (props.clearOnCancel)
          clear()

        emit('cancel')
      }
    }

    return {
      classNames,
      browse,
      clear,
      isDragover,
      isHovered,
      model,
      rawModel,
      onDrop,
      onChange,
    }
  },
})
</script>

<style lang="postcss">
.dropzone {
  @apply cursor-pointer block w-full;

  &__input {
    @apply hidden;
  }

  * {
    @apply pointer-events-none;
  }

  &:disabled,
  &--disabled {
    @apply pointer-events-none;
  }

  a,
  button {
    @apply pointer-events-auto;
  }
}
</style>
