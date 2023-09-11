<template>
  <draggable
    v-model="rows"
    tag="div"
    class="table-tree"
    group="table-tree"
    handle=".table-tree__drag"
    item-key="_key">
    <template #item="{ element, index }">
      <TableTreeItem
        :key="element._key"
        :fields="fields"
        :index="index"
        :item="element">
        <template
          v-for="(_, slot) in $slots"
          #[slot]="scope">
          <slot
            :name="slot"
            v-bind="scope" />
        </template>
      </TableTreeItem>
    </template>
  </draggable>
</template>

<script lang="ts" setup generic="T extends Record<string, unknown>">
import {
  PropType,
  computed,
} from 'vue-demi'
import { TableField, withKey } from '../table'
import Draggable from 'vuedraggable'
import TableTreeItem from './TableTreeItem.vue'

const props = defineProps({
  fields: {
    type   : Array as PropType<TableField<T>[]>,
    default: () => ([]),
  },
  items: {
    type   : Array as PropType<T[]>,
    default: () => ([]),
  },
  childKey: {
    type   : String,
    default: 'children',
  },
})

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (event: 'update:modelValue', items: T[]): void,
  (event: 'update:items', items: T[]): void,
}>()

const rows = computed<T[]>({
  get () {
    return props.items.map((item) => {
      return withKey(item) as T
    })
  },
  set (items) {
    emit('update:items', items)
  },
})
</script>

<style lang="postcss">
.table-tree {
  @apply w-full bg-base;
  @apply dark:bg-dark-base;
}
</style>
