<template>
  <p-dropdown
    icon
    no-caret
    variant="ghost"
    size="sm"
    title="Font family">
    <template #button-content>
      <IconFont />
      <IconCaret />
    </template>

    <p-dropdown-item @click="unsetFont()">
      Default
    </p-dropdown-item>
    <template
      v-for="font in fonts"
      :key="font">
      <p-dropdown-item @click="setFont(font)">
        <span :style="{ fontFamily: font }">
          {{ font }}
        </span>
      </p-dropdown-item>
    </template>
  </p-dropdown>
</template>

<script lang="ts" setup>
import pDropdown from '../../dropdown/Dropdown.vue'
import pDropdownItem from '../../dropdown/DropdownItem.vue'
import IconCaret from '@privyid/persona-icon/vue/caret-down/16.vue'
import IconFont from '@privyid/persona-icon/vue/font-family/20.vue'
import { useRichtextEditor } from '..'

const fonts = [
  'Arial',
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  'Times New Roman',
  'Georgia',
  'Garamond',
  'Courier New',
  'Brush Script MT',
] as const

const editor = useRichtextEditor()

function setFont (family: string) {
  editor.value.chain().focus().setFontFamily(family).run()
}

function unsetFont () {
  editor.value.chain().focus().unsetFontFamily().run()
}
</script>
