<template>
  <template v-if="isEdit">
    <LinkEdit
      v-model="formURL"
      @cancel="cancel"
      @submit="save" />
  </template>
  <template v-else>
    <p-button
      :href="url"
      target="_blank"
      variant="link"
      size="sm">
      <span class="truncate max-w-52">{{ url }}</span>
      <IconNewPage />
    </p-button>
    <div class="px-2 border-l dark:border-dark-default">
      <p-button
        size="sm"
        icon
        variant="ghost"
        title="Edit hyperlink"
        @click="edit()">
        <IconEdit />
      </p-button>
      <p-button
        size="sm"
        icon
        variant="ghost"
        title="Remove hyperlink"
        @click="remove()">
        <IconDelete />
      </p-button>
    </div>
  </template>
</template>

<script lang="ts" setup>
import LinkEdit from './RichtextPopupLinkEdit.vue'
import pButton from '../../button/Button.vue'
import IconEdit from '@privyid/persona-icon/vue/edit/20.vue'
import IconNewPage from '@privyid/persona-icon/vue/new-page/16.vue'
import IconDelete from '@privyid/persona-icon/vue/trash/20.vue'
import {
  ref,
  computed,
  watch,
  nextTick,
} from 'vue-demi'
import { withHttps } from 'ufo'
import { useRichtextEditor } from '..'

const editor = useRichtextEditor()
const url    = computed(() => {
  return editor.value.getAttributes('link').href
})

const isEdit  = ref(false)
const formURL = ref('')

watch(url, () => {
  nextTick(() => {
    if (isEdit.value)
      cancel()
  })
})

function edit () {
  formURL.value = url.value
  isEdit.value  = true
}

function save () {
  editor.value.chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: withHttps(formURL.value) })
    .run()

  cancel()
}

function cancel () {
  formURL.value = ''
  isEdit.value  = false
}

function remove () {
  editor.value.chain()
    .focus()
    .extendMarkRange('link')
    .unsetLink()
    .run()
}
</script>
