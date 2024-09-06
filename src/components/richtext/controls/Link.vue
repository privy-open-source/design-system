<template>
  <p-dropdown
    v-model="isShow"
    icon
    no-caret
    variant="ghost"
    size="sm"
    menu-size="auto"
    title="Add hyperlink">
    <template #button-content>
      <IconLink />
    </template>

    <div class="flex p-1 space-x-1">
      <LinkEdit
        v-if="isShow"
        v-model="url"
        @submit="setLink()"
        @cancel="close()" />
    </div>
  </p-dropdown>
</template>

<script lang="ts" setup>
import pDropdown from '../../dropdown/Dropdown.vue'
import IconLink from '@privyid/persona-icon/vue/link/20.vue'
import { useRichtextEditor } from '..'
import { ref } from 'vue-demi'
import LinkEdit from '../floating-menu/LinkEdit.vue'
import { withHttps } from 'ufo'

const editor = useRichtextEditor()
const url    = ref('')
const isShow = ref(false)

function setLink () {
  if (!url.value)
    return

  editor.value.chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: withHttps(url.value) })
    .run()

  close()
}

function close () {
  isShow.value = false
  url.value    = ''
}
</script>
