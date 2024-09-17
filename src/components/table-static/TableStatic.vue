<template>
  <TableStaticRoot
    data-testid="table-static"
    :scrollable="scrollable"
    :class="classNames"
    :table-class="tableClass">
    <thead
      v-if="!noLabel"
      class="table-static__headers">
      <tr :class="trClass">
        <th
          v-if="draggable"
          class="table-static__header table-static__drag" />
        <th
          v-if="selectable"
          class="table-static__header table-static__checkbox">
          <Checkbox
            v-model="selectAll"
            data-testid="table-static-select-all"
            :indeterminate="indeterminate" />
        </th>
        <th
          v-for="field in fields"
          :key="field.key"
          class="table-static__header"
          data-testid="table-static-header"
          :style="field.width ? { width: withUnit(field.width) } : {}"
          :class="[field.thClass, { 'table-static__header--sortable': sortable && field.sortable }]"
          :data-header="field.key"
          @click="sortField(field)">
          <slot
            :name="`head(${field.key})`"
            :label="field.label"
            :field="field"
            :sort="getSortField(field.key)">
            {{ field.label }}
            <IconUp
              v-if="getSortField(field.key) === 'asc'"
              class="table-static__header__sort-up"
              data-testid="table-static-header-sort-up" />
            <IconDown
              v-if="getSortField(field.key) === 'desc'"
              class="table-static__header__sort-down"
              data-testid="table-static-header-sort-down" />
          </slot>
        </th>
      </tr>
    </thead>
    <Draggable
      v-if="Array.isArray(items) && items.length > 0"
      v-model="rows"
      class="table-static__body"
      handle=".table-static__drag"
      item-key="_key"
      tag="tbody"
      :disabled="!draggable">
      <template #item="{ element, index }">
        <tr
          class="table-static__row"
          :class="trClass"
          data-role="row">
          <slot
            name="row"
            :item="element"
            :index="index">
            <td
              v-if="draggable"
              class="table-static__cell table-static__drag"
              data-testid="table-static-drag-handle">
              <IconDrag />
            </td>
            <td
              v-if="selectable"
              class="table-static__cell table-static__checkbox">
              <Checkbox
                v-model="model"
                data-testid="table-static-select"
                :value="withoutKey(element)"
                :disabled="element._selectable === false" />
            </td>
            <td
              v-for="field in fields"
              :key="field.key"
              class="table-static__cell"
              data-testid="table-static-cell"
              :class="field.tdClass"
              :data-cell="field.key">
              <slot
                :name="`cell(${field.key})`"
                :index="index"
                :item="element">
                {{ field.formatter(element[field.key], element) }}
              </slot>
            </td>
          </slot>
        </tr>
      </template>
    </Draggable>
    <tbody
      v-else
      class="table-static__body">
      <tr
        class="table-static__row">
        <td
          :colspan="selectable ? fields.length+1 : fields.length"
          data-testid="table-static-empty"
          class="table-static__cell table-static__cell--empty datatable__state-empty">
          <slot name="empty">
            <span class="flex items-center justify-center text-subtle dark:text-dark-subtle">
              {{ emptyLabel }}
            </span>
          </slot>
        </td>
      </tr>
    </tbody>
  </TableStaticRoot>
</template>

<script lang="ts" setup generic="T">
import type {
  HTMLAttributes,
  PropType,
  VNode,
} from 'vue-demi'
import {
  ref,
  computed,
  onMounted,
  nextTick,
} from 'vue-demi'
import type {
  ApperanceVariant,
  TableField,
  KeyType,
  TableSort,
} from '../table'
import {
  withKey,
  withoutKey,
  withUnit,
} from '../table'
import Checkbox from '../checkbox/Checkbox.vue'
import TableStaticRoot from './TableStaticRoot.vue'
import { useVModel } from '../input'
import IconDrag from '@privyid/persona-icon/vue/draggable/20.vue'
import Draggable from 'vuedraggable'
import IconUp from '@privyid/persona-icon/vue/caret-up/16.vue'
import IconDown from '@privyid/persona-icon/vue/caret-down/16.vue'
import { orderBy } from 'lodash-es'
import { watchPausable } from '@vueuse/core'

const props = defineProps({
  apperance: {
    type   : String as PropType<ApperanceVariant>,
    default: 'table',
  },
  modelValue: {
    type   : Array as PropType<T[]>,
    default: () => ([]),
  },
  fields: {
    type   : Array as PropType<TableField<T>[]>,
    default: () => ([]),
  },
  items: {
    type   : Array as PropType<T[]>,
    default: () => ([]),
  },
  selectable: {
    type   : Boolean,
    default: false,
  },
  draggable: {
    type   : Boolean,
    default: false,
  },
  emptyLabel: {
    type   : String,
    default: 'There are no records to show',
  },
  noLabel: {
    type   : Boolean,
    default: false,
  },
  tableClass: {
    type: [
      String,
      Array,
      Object,
    ] as PropType<HTMLAttributes['class']>,
    default: undefined,
  },
  trClass: {
    type: [
      String,
      Array,
      Object,
    ] as PropType<HTMLAttributes['class']>,
    default: undefined,
  },
  scrollable: {
    type   : Boolean,
    default: true,
  },
  sortable: {
    type   : Boolean,
    default: false,
  },
  sortableAsyncronous: {
    type   : Boolean,
    default: false,
  },
})

const model = useVModel(props)
const emit  = defineEmits<{
  'update:modelValue': [T[]],
  'update:items': [T[]],
  'sort': [TableSort<T>[]],
  'reset-sort': [],
}>()

const rows = computed<T[]>({
  get () {
    return props.items.map((item) => {
      return withKey(item as Record<string, unknown>) as T
    })
  },
  set (items) {
    emit('update:items', items)
  },
})

const classNames = computed(() => {
  const result: string[] = ['table-static']

  if (props.apperance)
    result.push(`table-static--${props.apperance}`)

  if (props.selectable)
    result.push('table-static--selectable')

  if (props.draggable)
    result.push('table-static--draggable')

  if (props.noLabel)
    result.push('table-static--no-label')

  if (props.scrollable)
    result.push('table-static--scrollable')

  return result
})

const selectableRows = computed(() => {
  return props.items.filter((item) => (item as Record<string, unknown>)._selectable !== false)
})

const selectAll = computed({
  get () {
    if (props.items.length === 0)
      return false

    return model.value.length === selectableRows.value.length
  },
  set (value) {
    if (selectAll.value !== value) {
      model.value = value
        ? selectableRows.value.map((item) => withoutKey(item as Record<string, unknown>)) as T[]
        : []
    }
  },
})

const indeterminate = computed(() => {
  return model.value.length > 0
    && model.value.length < selectableRows.value.length
})

const defaultItems = ref<T[]>()
const tableSorts   = ref<TableSort<T>[]>([])

const itemsWatcher = watchPausable(() => props.items, (value) => {
  if (props.sortable && !props.sortableAsyncronous) {
    defaultItems.value = value
    tableSorts.value   = []
  }
})

async function sortField (field: TableField<T>) {
  if (!props.sortable || !field.sortable || field.sortable === undefined)
    return

  const currentFieldSort  = tableSorts.value.find((sort) => sort.key === field.key)
  const isChangeFieldSort = currentFieldSort && currentFieldSort.value === 'asc'
  const isClearFieldSort  = currentFieldSort && currentFieldSort.value === 'desc'

  if (!currentFieldSort)
    tableSorts.value.push({ key: field.key, value: 'asc' })

  if (isChangeFieldSort) {
    tableSorts.value = tableSorts.value.map((sort) => {
      if (sort.key === field.key)
        sort.value = 'desc'

      return sort
    })
  }
  if (isClearFieldSort)
    tableSorts.value = tableSorts.value.filter((sort) => sort.key !== field.key)

  const isEmptySorts = tableSorts.value.length === 0

  emit('sort', tableSorts.value)

  if (isEmptySorts)
    emit('reset-sort')

  if (props.sortableAsyncronous)
    return

  if (isEmptySorts && !props.sortableAsyncronous) {
    emit('update:items', defaultItems.value)

    return
  }

  itemsWatcher.pause()

  const items = orderBy(
    props.items,
    tableSorts.value.flatMap((sort) => sort.key),
    tableSorts.value.flatMap((sort) => sort.value),
  )

  emit('update:items', items)

  await nextTick()
  itemsWatcher.resume()
}

function getSortField (key: string) {
  return tableSorts.value.find((sort) => sort.key === key)?.value
}

/**
 * if table is sortable, store props items as default items when reset sorting
 */
onMounted(() => {
  if (props.sortable && !props.sortableAsyncronous)
    defaultItems.value = [...props.items]
})

defineSlots<{
  'empty'(): VNode[],
  'row'(props: { index: number, item: T }): VNode[],
  [K: `cell(${string})`]:(props: { index: number }) => VNode[],
  [K: `head(${string})`]:(props: { field: TableField<T>, label: string, sort?: 'asc' | 'desc' }) => VNode[],
} & {
  [K in KeyType<T> as `cell(${K})`]:(props: { item: T, index: number }) => VNode[]
} & {
  [K in KeyType<T> as `head(${K})`]:(props: { field: TableField<T>, label: string, sort?: 'asc' | 'desc' }) => VNode[]
}>()
</script>

<style lang="postcss">
.table-static {
  --p-table-bg: theme(backgroundColor.default.DEFAULT);
  --p-table-bg-dark: theme(backgroundColor.dark.default.DEFAULT);
  --p-table-header-bg: var(--p-table-bg);
  --p-table-header-bg-dark: var(--p-table-bg-dark);
  --p-table-border: theme(borderColor.default.DEFAULT);
  --p-table-border-dark: theme(borderColor.dark.default.DEFAULT);

  @apply w-full;

  &__table {
    @apply table;
  }

  &:not(&--scrollable) {
    &.table-static__table {
      @apply max-w-full;
    }

   & .table-static__row > .table-static__cell {
      @apply whitespace-pre-wrap;
    }
  }

  &:where(&--scrollable) {
    .table-static__table {
      @apply min-w-full;
    }

    & .table-static__row > .table-static__cell {
      @apply whitespace-pre;
    }
  }

  &__headers {
    @apply pt-4 bg-[color:var(--p-table-bg)];
    @apply dark:bg-[color:var(--p-table-bg-dark)];

    .table-static__header {
      @apply px-3 text-xs border-x-0;

      &.table-static__drag,
      &.table-static__checkbox {
        @apply w-[1%];
      }

      &:where(&--sortable) {
        @apply cursor-pointer;
      }

      &__sort-up {
        @apply inline mb-2;
      }

      &__sort-down {
        @apply inline mt-2;
      }
    }

    + .table-static__body {
      @apply pt-2;
    }
  }

  & &__row > &__cell {
    @apply ml-2 py-4 px-3 text-sm text-default;
    @apply dark:text-dark-default;

    &.table-static__drag {
      @apply cursor-grabbing md:mx-3;
    }
  }

  & &__headers &__header {
    @apply bg-[color:var(--p-table-header-bg)];
    @apply dark:bg-[color:var(--p-table-header-bg-dark)];
  }

  & &__body > &__row {
    @apply border-t border-[color:var(--p-table-border)] bg-[color:var(--p-table-bg)];
    @apply dark:border-[color:var(--p-table-border-dark)] dark:bg-[color:var(--p-table-bg-dark)];
  }

  &--no-label {
    .table-static__body > .table-static__row:first-child {
      @apply border-t-0;
    }
  }

  &--table {
    .table-static__row .table-static__cell,
    .table-static__headers .table-static__header {
      @apply border-0;
    }

    .table-static__row .table-static__cell {
      @apply align-top;
    }
  }

  &--card {
    .table-static__table {
      @apply border-separate border-spacing-y-2;
    }

    .table-static__row .table-static__cell,
    .table-static__headers .table-static__header {
      @apply border-x-0 border-y;

      &:first-child {
        @apply rounded-l border-l;
      }

      &:last-child {
        @apply rounded-r border-r;
      }
    }
  }

  &--scrollable {
    @apply overflow-auto overscroll-contain;
  }
}
</style>
