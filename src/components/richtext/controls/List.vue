<template>
  <p-dropdown
    icon
    no-caret
    variant="ghost"
    size="sm"
    menu-size="auto"
    title="Text alignment">
    <template #button-content>
      <IconOrderedList v-if="editor.isActive('orderedList')" />
      <IconBulletList v-else />
      <IconCaret />
    </template>
    <p-dropdown-item
      title="Bullet List"
      :active="editor.isActive('bulletList')"
      @click="toggleList('bullet')">
      <IconBulletList />
    </p-dropdown-item>
    <p-dropdown-item
      title="Ordered list"
      :active="editor.isActive('orderedList')"
      @click="toggleList('ordered')">
      <IconOrderedList />
    </p-dropdown-item>
  </p-dropdown>
</template>

<script lang="ts" setup>
import pDropdown from '../../dropdown/Dropdown.vue'
import pDropdownItem from '../../dropdown/DropdownItem.vue'
import IconCaret from '@privyid/persona-icon/vue/caret-down/16.vue'
import IconBulletList from '@privyid/persona-icon/vue/list-bullets/20.vue'
import IconOrderedList from '@privyid/persona-icon/vue/list-numbers/20.vue'
import { useRichtextEditor } from '..'

const editor = useRichtextEditor()

function toggleList (type: 'bullet' | 'ordered') {
  if (type === 'bullet')
    editor.value.chain().focus().toggleBulletList().run()
  else
    editor.value.chain().focus().toggleOrderedList().run()
}
</script>
