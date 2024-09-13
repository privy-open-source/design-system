<template>
  <p-dropdown
    v-model="isShow"
    icon
    no-caret
    variant="ghost"
    size="sm"
    menu-size="auto"
    title="Highlight">
    <template #button-content>
      <IconHighlight />
      <IconCaret />
    </template>

    <div class="richtext__highlight-container">
      <template
        v-for="(color, i) in colors"
        :key="i">
        <p-button
          icon
          variant="ghost"
          size="sm"
          :title="color.text"
          :active="isActive(color.value as string)"
          @click="setHightlight(color.value as string)">
          <span
            class="richtext__highlight-pallete"
            :class="color.class" />
        </p-button>
      </template>
      <p-button
        icon
        variant="ghost"
        size="sm"
        title="Remove highlight"
        @click="unsetHightlight()">
        <IconDelete class="richtext__highlight-pallete richtext__highlight-delete" />
      </p-button>
    </div>
  </p-dropdown>
</template>

<script lang="ts" setup>
import pButton from '../../button/Button.vue'
import pDropdown from '../../dropdown/Dropdown.vue'
import IconCaret from '@privyid/persona-icon/vue/caret-down/16.vue'
import IconHighlight from '@privyid/persona-icon/vue/highlight/20.vue'
import IconDelete from '@privyid/persona-icon/vue/close/16.vue'
import { useRichtextEditor } from '..'
import type { SelectItem } from '../../select'
import { ref } from 'vue-demi'

const editor = useRichtextEditor()
const isShow = ref(false)

const colors: SelectItem[] = [
  {
    text : 'Yellow',
    value: '#F6E789',
    class: 'bg-yellow-20',
  },
  {
    text : 'Orange',
    value: '#F9CD84',
    class: 'bg-orange-20',
  },
  {
    text : 'Red',
    value: '#F08A89',
    class: 'bg-red-20',
  },
  {
    text : 'Lime',
    value: '#B7EB61',
    class: 'bg-lime-30',
  },
  {
    text : 'Green',
    value: '#84D495',
    class: 'bg-green-20',
  },
  {
    text : 'Blue',
    value: '#3887DB',
    class: 'bg-blue-20',
  },
  {
    text : 'Lightblue',
    value: '#71D2DF',
    class: 'bg-lightblue-20',
  },
  {
    text : 'Purple',
    value: '#C8A8EF',
    class: 'bg-purple-20',
  },
]

function isActive (color: string) {
  return editor.value.isActive('highlight', { color })
}

function setHightlight (color?: string) {
  editor.value.chain().focus().setHighlight({ color }).run()

  isShow.value = false
}

function unsetHightlight () {
  editor.value.chain().focus().unsetHighlight().run()

  isShow.value = false
}
</script>

<style lang="postcss">
.richtext__highlight {
  &-container {
    @apply grid grid-cols-[repeat(3,_2rem)] grid-rows-[repeat(3,_2rem)] gap-1 p-1;

    > .btn {
      @apply w-full h-full;
    }
  }

  &-pallete {
    @apply w-full h-full rounded-xs;
  }

  &-delete {
    @apply border text-danger;
    @apply dark:border-dark-default dark:text-dark-danger;
  }
}
</style>
