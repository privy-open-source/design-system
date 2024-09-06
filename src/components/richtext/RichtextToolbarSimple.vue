<template>
  <template
    v-for="(group, _i) of controls"
    :key="_i">
    <div
      class="richtext__controls-group">
      <template
        v-for="control of group"
        :key="control.name">
        <p-button
          variant="ghost"
          size="sm"
          :active="control.isActive?.(editor)"
          icon
          :disabled="control.isEnabled?.(editor) === false"
          @click="control.action(editor)">
          <component :is="control.icon" />
        </p-button>
      </template>
    </div>
  </template>
</template>

<script lang="ts" setup>
import pButton from '../button/Button.vue'
import IconBold from '@privyid/persona-icon/vue/bold/20.vue'
import IconItalic from '@privyid/persona-icon/vue/italic/20.vue'
import IconUnderline from '@privyid/persona-icon/vue/underlined/20.vue'
import IconStrikethrough from '@privyid/persona-icon/vue/strikethrough/20.vue'
import IconAlignLeft from '@privyid/persona-icon/vue/align-left/20.vue'
import IconAlignCenter from '@privyid/persona-icon/vue/align-center/20.vue'
import IconAlignRight from '@privyid/persona-icon/vue/align-right/20.vue'
import IconAlignJustify from '@privyid/persona-icon/vue/align-justify/20.vue'
import IconBulletList from '@privyid/persona-icon/vue/list-bullets/20.vue'
import IconOrderedList from '@privyid/persona-icon/vue/list-numbers/20.vue'
import { useRichtextEditor } from '.'
import type { Component } from 'vue-demi'
import type { Editor } from '@tiptap/vue-3'

const editor = useRichtextEditor()

interface ControlItem {
  name: string,
  icon: Component,
  action: (editor?: Editor) => void,
  isActive?: (editor?: Editor) => boolean,
  isEnabled?: (editor?: Editor) => boolean,
}

const controls: Array<ControlItem[]> = [
  [
    {
      name: 'bold',
      icon: IconBold,
      action (editor) {
        editor?.chain().focus().toggleBold().run()
      },
      isActive (editor) {
        return !!editor?.isActive('bold')
      },
    },
    {
      name: 'italic',
      icon: IconItalic,
      action (editor) {
        editor?.chain().focus().toggleItalic().run()
      },
      isActive (editor) {
        return !!editor?.isActive('italic')
      },
    },
    {
      name: 'underline',
      icon: IconUnderline,
      action (editor) {
        editor?.chain().focus().toggleUnderline().run()
      },
      isActive (editor) {
        return !!editor?.isActive('underline')
      },
    },
    {
      name: 'strikethrough',
      icon: IconStrikethrough,
      action (editor) {
        editor?.chain().focus().toggleStrike().run()
      },
      isActive (editor) {
        return !!editor?.isActive('strike')
      },
    },
  ],
  [
    {
      name: 'align-left',
      icon: IconAlignLeft,
      action (editor) {
        editor?.chain().focus().setTextAlign('left').run()
      },
      isActive (editor) {
        return !!editor?.isActive({ textAlign: 'left' })
      },
    },
    {
      name: 'align-center',
      icon: IconAlignCenter,
      action (editor) {
        editor?.chain().focus().setTextAlign('center').run()
      },
      isActive (editor) {
        return !!editor?.isActive({ textAlign: 'center' })
      },
    },
    {
      name: 'align-right',
      icon: IconAlignRight,
      action (editor) {
        editor?.chain().focus().setTextAlign('right').run()
      },
      isActive (editor) {
        return !!editor?.isActive({ textAlign: 'right' })
      },
    },
    {
      name: 'align-justify',
      icon: IconAlignJustify,
      action (editor) {
        editor?.chain().focus().setTextAlign('justify').run()
      },
      isActive (editor) {
        return !!editor?.isActive({ textAlign: 'justify' })
      },
    },
  ],
  [
    {
      name: 'bullet-list',
      icon: IconBulletList,
      action (editor) {
        editor?.chain().focus().toggleBulletList().run()
      },
      isActive (editor) {
        return !!editor?.isActive('bulletList')
      },
    },
    {
      name: 'ordered-list',
      icon: IconOrderedList,
      action (editor) {
        editor?.chain().focus().toggleOrderedList().run()
      },
      isActive (editor) {
        return !!editor?.isActive('orderedList')
      },
    },
  ],
]
</script>
