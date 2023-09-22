<template>
  <div
    data-testid="table-static"
    class="table-static"
    :class="classNames">
    <table
      class="table-static__table"
      :class="tableClass">
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
            :class="field.thClass"
            :data-header="field.key">
            <slot
              :name="`head(${field.key})`"
              :label="field.label"
              :field="field">
              {{ field.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <Draggable
        v-if="items.length > 0"
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
            :colspan="fields.length"
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
    </table>
  </div>
</template>

<script lang="ts" setup generic="T extends Record<string, unknown>">
import {
  computed,
  HTMLAttributes,
  PropType,
  VNode,
} from 'vue-demi'
import {
  ApperanceVariant,
  TableField,
  withKey,
  withoutKey,
  withUnit,
} from '../table'
import Checkbox from '../checkbox/Checkbox.vue'
import { useVModel } from '../input'
import IconDrag from '@privyid/persona-icon/vue/draggable/20.vue'
import Draggable from 'vuedraggable'

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
})

const model = useVModel(props)
const emit  = defineEmits<{
  'update:modelValue': [T[]],
  'update:items': [T[]],
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

const classNames = computed(() => {
  const result: string[] = []

  if (props.apperance)
    result.push(`table-static--${props.apperance}`)

  if (props.selectable)
    result.push('table-static--selectable')

  if (props.draggable)
    result.push('table-static--draggable')

  if (props.noLabel)
    result.push('table-static--no-label')

  return result
})

const selectableRows = computed(() => {
  return props.items.filter((item) => item._selectable !== false)
})

const selectAll = computed({
  get () {
    return model.value.length === selectableRows.value.length
  },
  set (value) {
    if (selectAll.value !== value) {
      model.value = value
        ? selectableRows.value.map((item) => withoutKey(item)) as T[]
        : []
    }
  },
})

const indeterminate = computed(() => {
  return model.value.length > 0
    && model.value.length < selectableRows.value.length
})

defineSlots<{
  empty:() => VNode,
  row:(props: { index: number, item: T, [key: string]: any }) => VNode,
  [colKey: `head(${string})`]:(props: { label: string, field: TableField<T>, [key: string]: any }) => VNode,
  [colKey: `cell(${string})`]:(props: { index: number, item: T, [key: string]: any }) => VNode,
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

  @apply w-full overflow-auto overscroll-contain;

  &__table {
    @apply min-w-full table;
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
    }

    + .table-static__body {
      @apply pt-2;
    }
  }

  & &__row > &__cell {
    @apply ml-2 py-4 px-3 text-sm text-default whitespace-pre;
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
}
</style>
