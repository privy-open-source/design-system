<template>
  <label
    class="dropzone"
    @drop.prevent="onDrop"
    @dragover.prevent
    @dragenter.prevent="isDragover = true"
    @dragleave.prevent="isDragover = false">
    <input
      ref="input"
      class="dropzone__input"
      type="file"
      :multiple="multiple"
      :accept="accept"
      v-bind="$attrs"
      @change="onChange">
    <slot
      :is-dragover="isDragover"
      :model="model"
      :browse="browse" />
  </label>
</template>

<script lang="ts">
import { templateRef } from '@vueuse/core'
import {
  defineComponent, PropType, ref,
} from 'vue-demi'
import { useVModel } from '../input/use-input'
import accept from 'attr-accept'

export default defineComponent({
  props: {
    modelValue: {
      type   : [File, Array] as PropType<File | File[]>,
      default: undefined,
    },
    multiple: {
      type   : Boolean,
      default: false,
    },
    accept: {
      type   : String,
      default: '*',
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
    const model = useVModel(props)
    const input = templateRef<HTMLInputElement>('input')

    const isDragover = ref(false)

    function browse () {
      input.value.click()
    }

    function onDrop (event: DragEvent) {
      const files = event.dataTransfer.files

      isDragover.value = false

      handleFiles(files)
    }

    function onChange (event: Event) {
      const target = event.target as HTMLInputElement
      const files  = target.files

      handleFiles(files)
    }

    function handleFiles (fileList: FileList) {
      if (fileList.length > 0) {
        // eslint-disable-next-line unicorn/prefer-spread
        const files = Array.from(fileList)
          .filter((file) => {
            return accept(file, props.accept)
          })

        const value = props.multiple ? files : files.at(0)
        model.value = value

        emit('change', value)
      } else
        emit('cancel')
    }

    return {
      browse,
      isDragover,
      model,
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

  a,
  button {
    @apply pointer-events-auto;
  }
}
</style>
