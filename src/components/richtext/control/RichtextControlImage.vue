<template>
  <p-dropzone
    v-slot="{ browse }"
    accept="image/*"
    @change="handleFiles($event)">
    <p-button
      variant="ghost"
      size="sm"
      icon
      title="Insert image"
      @click="browse">
      <IconImage />
    </p-button>
  </p-dropzone>
</template>

<script lang="ts" setup>
import pButton from '../../button/Button.vue'
import pDropzone from '../../dropzone/Dropzone.vue'
import IconImage from '@privyid/persona-icon/vue/image/20.vue'
import { useRichtextEditor } from '..'
import { toBase64 } from '../../utils/base64'

const editor = useRichtextEditor()

async function handleFiles (image: unknown) {
  if (image instanceof File) {
    editor.value.chain().focus().setImage({
      src  : await toBase64(image),
      title: image.name,
    }).run()
  }
}
</script>
