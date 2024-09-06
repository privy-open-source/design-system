<template>
  <p-dropdown
    icon
    no-caret
    variant="ghost"
    size="sm"
    menu-size="auto"
    title="Text alignment">
    <template #button-content>
      <component :is="currentIcon" />
      <IconCaret />
    </template>
    <p-dropdown-item
      title="Left"
      :active="editor.isActive({ textAlign: 'left' })"
      @click="setAlign('left')">
      <IconAlignLeft />
    </p-dropdown-item>
    <p-dropdown-item
      title="Center"
      :active="editor.isActive({ textAlign: 'center' })"
      @click="setAlign('center')">
      <IconAlignCenter />
    </p-dropdown-item>
    <p-dropdown-item
      title="Right"
      :active="editor.isActive({ textAlign: 'right' })"
      @click="setAlign('right')">
      <IconAlignRight />
    </p-dropdown-item>
    <p-dropdown-item
      title="Justify"
      :active="editor.isActive({ textAlign: 'justify' })"
      @click="setAlign('justify')">
      <IconAlignJustify />
    </p-dropdown-item>
  </p-dropdown>
</template>

<script lang="ts" setup>
import pDropdown from '../../dropdown/Dropdown.vue'
import pDropdownItem from '../../dropdown/DropdownItem.vue'
import IconCaret from '@privyid/persona-icon/vue/caret-down/16.vue'
import IconAlignLeft from '@privyid/persona-icon/vue/align-left/20.vue'
import IconAlignCenter from '@privyid/persona-icon/vue/align-center/20.vue'
import IconAlignRight from '@privyid/persona-icon/vue/align-right/20.vue'
import IconAlignJustify from '@privyid/persona-icon/vue/align-justify/20.vue'
import { useRichtextEditor } from '..'
import type { Component } from 'vue-demi'
import { computed } from 'vue-demi'

const alignment = [
  'left',
  'center',
  'right',
  'justify',
] as const

type Alignment = typeof alignment[number]

const ICONS: Record<Alignment, Component> = {
  left   : IconAlignLeft,
  center : IconAlignCenter,
  right  : IconAlignRight,
  justify: IconAlignJustify,
}

const editor = useRichtextEditor()

const current = computed(() => {
  if (editor.value?.isActive({ textAlign: 'center' }))
    return 'center'

  if (editor.value?.isActive({ textAlign: 'right' }))
    return 'right'

  if (editor.value?.isActive({ textAlign: 'justify' }))
    return 'justify'

  return 'left'
})

const currentIcon = computed(() => {
  return ICONS[current.value]
})

function setAlign (align: Alignment) {
  editor.value?.chain().focus().setTextAlign(align).run()
}
</script>
