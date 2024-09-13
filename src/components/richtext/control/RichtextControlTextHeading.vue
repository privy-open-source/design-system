<template>
  <p-dropdown
    variant="ghost"
    size="sm"
    icon
    no-caret>
    <template #button-content>
      {{ current }}
      <IconCaret />
    </template>
    <p-dropdown-item
      :active="editor.isActive('paragraph')"
      @click="setParagraph()">
      Paragraph
    </p-dropdown-item>
    <p-dropdown-item
      :active="editor.isActive('heading', { level: 1 })"
      @click="setHeading(1)">
      <span class="text-4xl font-bold">
        Heading 1
      </span>
    </p-dropdown-item>
    <p-dropdown-item
      :active="editor.isActive('heading', { level: 2 })"
      @click="setHeading(2)">
      <span class="text-3xl font-bold">
        Heading 2
      </span>
    </p-dropdown-item>
    <p-dropdown-item
      :active="editor.isActive('heading', { level: 3 })"
      @click="setHeading(3)">
      <span class="text-2xl font-bold">
        Heading 3
      </span>
    </p-dropdown-item>
    <p-dropdown-item
      :active="editor.isActive('heading', { level: 4 })"
      @click="setHeading(4)">
      <span class="text-xl font-bold">
        Heading 4
      </span>
    </p-dropdown-item>
    <p-dropdown-item
      :active="editor.isActive('heading', { level: 5 })"
      @click="setHeading(5)">
      <span class="text-lg font-bold">
        Heading 5
      </span>
    </p-dropdown-item>
    <p-dropdown-item
      :active="editor.isActive('heading', { level: 5 })"
      @click="setHeading(6)">
      <span class="text-base font-bold">
        Heading 6
      </span>
    </p-dropdown-item>
    <p-dropdown-item
      :active="editor.isActive('codeBlock')"
      @click="setCodeBlock()">
      <span class="font-mono text-base">
        Code Block
      </span>
    </p-dropdown-item>
  </p-dropdown>
</template>

<script lang="ts" setup>
import pDropdown from '../../dropdown/Dropdown.vue'
import pDropdownItem from '../../dropdown/DropdownItem.vue'
import IconCaret from '@privyid/persona-icon/vue/caret-down/16.vue'
import type { Level } from '@tiptap/extension-heading'
import { useRichtextEditor } from '..'
import { computed } from 'vue-demi'

const editor = useRichtextEditor()

const current = computed(() => {
  for (let i = 1; i <= 6; i++) {
    if (editor.value.isActive('heading', { level: i }))
      return `Heading ${i}`
  }

  if (editor.value.isActive('codeBlock'))
    return 'Code Block'

  return 'Paragraph'
})

function setParagraph () {
  editor.value.chain().focus().setParagraph().run()
}

function setHeading (level: Level) {
  editor.value.chain().focus().setHeading({ level }).run()
}

function setCodeBlock () {
  editor.value.chain().focus().setCodeBlock().run()
}
</script>
