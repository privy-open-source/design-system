<template>
  <p-dropdown
    icon
    no-caret
    variant="ghost"
    size="sm"
    title="Font size">
    <template #button-content>
      <IconSize />
      <IconCaret />
    </template>

    <template
      v-for="size in sizes"
      :key="size.name">
      <p-dropdown-item
        :active="editor.isActive({ fontSize: size.value })"
        @click="setSize(size.value as string)">
        <span :class="size.className">
          {{ size.text }}
        </span>
      </p-dropdown-item>
    </template>
  </p-dropdown>
</template>

<script lang="ts" setup>
import pDropdown from '../../dropdown/Dropdown.vue'
import pDropdownItem from '../../dropdown/DropdownItem.vue'
import IconCaret from '@privyid/persona-icon/vue/caret-down/16.vue'
import IconSize from '@privyid/persona-icon/vue/font-size/20.vue'
import { useRichtextEditor } from '..'
import type { SelectItem } from '../../select'

const sizes: SelectItem[] = [
  {
    text     : 'Default',
    value    : '',
    className: 'text-base',
  },
  {
    text     : 'Tiny',
    value    : '11px',
    className: 'text-tn',
  },
  {
    text     : 'Extra small',
    value    : '12px',
    className: 'text-xs',
  },
  {
    text     : 'Small',
    value    : '14px',
    className: 'text-sm',
  },
  {
    text     : 'Normal',
    value    : '16px',
    className: 'text-base',
  },
  {
    text     : 'Large',
    value    : '18px',
    className: 'text-lg',
  },
  {
    text     : 'Extra large',
    value    : '20px',
    className: 'text-xl',
  },
]

const editor = useRichtextEditor()

function setSize (fontSize: string) {
  editor.value.chain()
    .focus()
    .setFontSize(fontSize)
    .run()
}
</script>
