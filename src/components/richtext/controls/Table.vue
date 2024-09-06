<template>
  <p-dropdown
    v-model="isShow"
    icon
    no-caret
    variant="ghost"
    size="sm"
    menu-size="auto"
    title="Insert table">
    <template #button-content>
      <IconTable />
      <IconCaret />
    </template>

    <div class="richtext__table-grid">
      <template
        v-for="i in (MAX_ROWS * MAX_COLS)"
        :key="i">
        <button
          class="richtext__table-size-item"
          :active="isHovered(i)"
          @mouseenter="setHover(i)"
          @click="insertTable(i)" />
      </template>
    </div>
    <div class="py-1 text-center">
      {{ hoverLabel }}
    </div>
  </p-dropdown>
</template>

<script lang="ts" setup>
import pDropdown from '../../dropdown/Dropdown.vue'
import IconCaret from '@privyid/persona-icon/vue/caret-down/16.vue'
import IconTable from '@privyid/persona-icon/vue/table/20.vue'
import { computed, ref } from 'vue-demi'
import { useRichtextEditor } from '..'

const MAX_ROWS = 10
const MAX_COLS = 10

const editor = useRichtextEditor()
const hover  = ref(0)
const isShow = ref(false)

const hoverLabel = computed(() => {
  const { x, y } = getXY(hover.value)

  return `${x}x${y}`
})

function getXY (index: number) {
  const x = index % MAX_ROWS
  const y = Math.ceil(index / MAX_COLS)

  return {
    x: x === 0 ? MAX_ROWS : x,
    y: y,
  }
}

function isHovered (index: number) {
  const cursor  = getXY(hover.value)
  const current = getXY(index)

  return current.x <= cursor.x
    && current.y <= cursor.y
}

function insertTable (index: number) {
  const { x: cols, y: rows } = getXY(index)

  editor.value?.chain()
    .focus()
    .insertTable({
      rows,
      cols,
      withHeaderRow: false,
    })
    .run()

  hover.value  = 0
  isShow.value = false
}

function setHover (index: number) {
  hover.value = index
}
</script>

<style lang="postcss">
.richtext__table {
  &-size-item {
    @apply w-full h-full border border-default border-solid rounded-[2px];
    @apply dark:border-dark-default;

    &[active="true"] {
      @apply bg-brand-accent/15;
    }
  }

  &-grid {
    @apply grid grid-cols-[repeat(10,_1rem)] grid-rows-[repeat(10,_1rem)] gap-0.5 p-2 pb-0;
  }
}
</style>
