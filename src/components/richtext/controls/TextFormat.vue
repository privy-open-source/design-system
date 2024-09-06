<template>
  <p-button
    variant="ghost"
    size="sm"
    icon
    title="Bold"
    :active="editor.isActive('bold')"
    @click="editor.chain().focus().toggleBold().run()">
    <IconBold />
  </p-button>
  <p-button
    variant="ghost"
    size="sm"
    icon
    title="Italic"
    :active="editor.isActive('italic')"
    @click="editor.chain().focus().toggleItalic().run()">
    <IconItalic />
  </p-button>
  <p-button
    variant="ghost"
    size="sm"
    icon
    title="Underline"
    :active="editor.isActive('underline')"
    @click="editor.chain().focus().toggleUnderline().run()">
    <IconUnderline />
  </p-button>
  <p-button
    variant="ghost"
    size="sm"
    icon
    title="Strikethrough"
    :active="editor.isActive('strikethrough')"
    @click="editor.chain().focus().toggleStrike().run()">
    <IconStrikethrough />
  </p-button>
</template>

<script lang="ts" setup>
import pButton from '../../button/Button.vue'
import IconBold from '@privyid/persona-icon/vue/bold/20.vue'
import IconItalic from '@privyid/persona-icon/vue/italic/20.vue'
import IconUnderline from '@privyid/persona-icon/vue/underlined/20.vue'
import IconStrikethrough from '@privyid/persona-icon/vue/strikethrough/20.vue'
import { useRichtextEditor } from '..'

const editor = useRichtextEditor()
</script>
