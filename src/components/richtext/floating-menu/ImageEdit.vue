<template>
  <p-button
    variant="ghost"
    size="sm"
    icon
    title="Align left"
    :active="editor.isActive('image', { imageAlign: 'left' })"
    @click="editor.chain().focus().setImageAlign('left').run()">
    <IconAlignLeft />
  </p-button>
  <p-button
    variant="ghost"
    size="sm"
    icon
    title="Align center"
    :active="editor.isActive('image', { imageAlign: 'center' })"
    @click="editor.chain().focus().setImageAlign('center').run()">
    <IconAlignCenter />
  </p-button>
  <p-button
    variant="ghost"
    size="sm"
    icon
    title="Align right"
    :active="editor.isActive('image', { imageAlign: 'right' })"
    @click="editor.chain().focus().setImageAlign('right').run()">
    <IconAlignRight />
  </p-button>
  <div class="flex items-center w-32 px-4 border-l dark:border-dark-default">
    <p-input-range
      v-model="scale"
      min="25"
      max="100"
      step="25" />
  </div>
  <p-button
    variant="ghost"
    icon
    size="sm"
    @click="editor.chain().focus().deleteSelection().run()">
    <IconDelete />
  </p-button>
</template>

<script lang="ts" setup>
import pButton from '../../button/Button.vue'
import pInputRange from '../../input-range/InputRange.vue'
import IconAlignLeft from '@privyid/persona-icon/vue/align-left/20.vue'
import IconAlignCenter from '@privyid/persona-icon/vue/align-center/20.vue'
import IconAlignRight from '@privyid/persona-icon/vue/align-right/20.vue'
import IconDelete from '@privyid/persona-icon/vue/trash/20.vue'
import { useRichtextEditor } from '..'
import { computed } from 'vue-demi'
import { withoutUnit, withUnit } from '../../table'

const editor = useRichtextEditor()
const scale  = computed({
  get () {
    return withoutUnit(editor.value.getAttributes('image').imageWidth ?? '100%')
  },
  set (value) {
    return editor.value.commands.updateAttributes('image', { imageWidth: withUnit(value) })
  },
})
</script>
