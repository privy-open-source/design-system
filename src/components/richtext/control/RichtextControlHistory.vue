<template>
  <p-button
    variant="ghost"
    size="sm"
    icon
    :disabled="!editor.can().chain().focus().undo().run()"
    @click="editor.chain().focus().undo().run()">
    <IconUndo />
  </p-button>
  <p-button
    variant="ghost"
    size="sm"
    icon
    :disabled="!editor.can().chain().focus().redo().run()"
    @click="editor.chain().focus().redo().run()">
    <IconRedo />
  </p-button>
</template>

<script lang="ts" setup>
import pButton from '../../button/Button.vue'
import IconUndo from '@privyid/persona-icon/vue/undo/20.vue'
import IconRedo from '@privyid/persona-icon/vue/redo/20.vue'
import { useRichtextEditor } from '..'

const editor = useRichtextEditor()
</script>
