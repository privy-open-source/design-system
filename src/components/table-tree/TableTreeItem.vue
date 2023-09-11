<template>
  <div
    class="table-tree__item"
    :class="{ 'table-tree--open': isOpen }">
    <div class="table-tree__row">
      <div
        class="table-tree__drag"
        data-testid="table-tree-drag-handle">
        <IconDrag />
      </div>

      <icon-expand
        class="table-tree__expand"
        @click="toggle" />

      <div class="table-tree__content">
        <slot
          name="row"
          :item="item">
          <div
            v-for="field in fields"
            :key="field.key"
            class="table-tree__cell"
            data-testid="table-tree-cell"
            :class="field.tdClass"
            :style="field.width ? { '--p-table-tree-cell-width': withUnit(field.width) } : { flex: '1 1 0%' }"
            :data-cell="field.key">
            <div
              class="table-tree__header"
              :class="field.thClass">
              <slot
                :name="`head(${field.key})`"
                :label="field.label"
                :field="field"
                :data-header="field.key">
                {{ field.label }}
              </slot>
            </div>
            <slot
              :name="`cell(${field.key})`"
              :index="index"
              :item="item">
              {{ field.formatter(item[field.key], item) }}
            </slot>
          </div>
        </slot>
      </div>
    </div>
    <p-collapse
      :model-value="isOpen">
      <div
        class="table-tree__children"
        :class="{ 'table-tree--has-append': !!$slots.append }">
        <draggable
          v-if="hasChild()"
          :list="getChild()"
          tag="div"
          class="table-tree"
          group="table-tree"
          handle=".table-tree__drag"
          item-key="_key">
          <template #item="{ element, index: i }">
            <TableTreeItem
              :key="element._key"
              :fields="fields"
              :index="i"
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

          <template #footer>
            <div
              v-if="$slots.append"
              class="table-tree__append">
              <slot
                :item="item"
                name="append" />
            </div>
            <div
              v-else-if="getChild().length === 0"
              class="table-tree__empty-label">
              {{ emptyLabel }}
            </div>
          </template>
        </draggable>
      </div>
    </p-collapse>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue-demi'
import pCollapse from '../collapse/Collapse.vue'
import Draggable from 'vuedraggable'
import IconDrag from '@privyid/persona-icon/vue/draggable/20.vue'
import IconExpand from '@privyid/persona-icon/vue/chevron-down/20.vue'
import { TableField, withUnit } from '../table'

const isOpen = ref(true)

const props = defineProps({
  fields: {
    type   : Array as PropType<TableField<Record<string, unknown>>[]>,
    default: () => ([]),
  },
  childKey: {
    type   : String,
    default: 'children',
  },
  index: {
    type   : Number,
    default: undefined,
  },
  item: {
    type   : Object as PropType<Record<string, unknown>>,
    default: () => ({}),
  },
  emptyLabel: {
    type   : String,
    default: 'There are no records to show',
  },
})

function hasChild () {
  return props.childKey in props.item
}

function getChild () {
  return (props.item[props.childKey] ?? []) as Record<string, unknown>[]
}

function toggle () {
  isOpen.value = !isOpen.value
}
</script>

<style lang="postcss">
.table-tree {
  &__item {
    @apply w-full;
  }

  &__row,
  &__append,
  &__empty-label {
    @apply flex p-4 bg-default items-center space-x-4 border border-default-alpha;
    @apply dark:bg-dark-default dark:border-dark-default-alpha;
  }

  &__expand {
    @apply transition-transform;
  }

  &__children {
    @apply pl-10;

    .table-tree__item {
      @apply relative;

      &::before {
        @apply content-[''] absolute inset-y-0 top-[1px] -left-[19px] h-full w-5 border-l border-default;
        @apply dark:border-dark-default;
      }
    }

    .table-tree__row {
      @apply relative;

      &::before {
        @apply content-[''] absolute inset-y-0 -left-5 h-1/2 w-5 border-b border-l border-default;
        @apply dark:border-dark-default;
      }
    }

    &.table-tree--has-append {
      .table-tree__item:nth-last-child(2) {
        &::before {
          @apply hidden;
        }
      }
    }
  }

  &__header {
    @apply text-subtle text-xs font-bold;
    @apply dark:text-dark-subtle;
  }

  &--open > &__row > &__expand {
    @apply rotate-180;
  }

  &__content {
    @apply flex-grow flex space-x-4;
  }

  &__empty-label {
    @apply flex items-center justify-center text-subtle;
    @apply dark:text-dark-subtle;
  }
}
</style>
