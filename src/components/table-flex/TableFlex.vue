<template>
  <div
    data-testid="table-flex"
    class="table-flex"
    :class="classNames">
    <Draggable
      v-if="Array.isArray(items) && items.length > 0"
      v-model="rows"
      class="table-flex__body"
      handle=".table-flex__drag"
      item-key="_key"
      :disabled="!draggable">
      <template #item="{ element, index }">
        <div
          class="table-flex__row"
          :class="trClass"
          data-role="row">
          <div
            v-if="draggable"
            class="table-flex__cell table-flex__drag"
            data-testid="table-flex-drag-handle">
            <IconDrag />
          </div>

          <div
            v-if="selectable"
            class="table-flex__cell table-flex__checkbox">
            <Checkbox
              v-model="model"
              data-testid="table-flex-select"
              :value="withoutKey(element)"
              :disabled="element._selectable === false" />
          </div>

          <slot
            name="row"
            :index="index"
            :item="element">
            <div
              v-for="field in fields"
              :key="field.key"
              class="table-flex__cell"
              data-testid="table-flex-cell"
              :class="field.tdClass"
              :style="field.width ? { '--p-table-flex-cell-width': withUnit(field.width) } : { flex: '1 1 0%' }"
              :data-cell="field.key">
              <div
                class="table-flex__header"
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
                :item="element">
                {{ field.formatter(element[field.key], element) }}
              </slot>
            </div>
          </slot>
        </div>
      </template>
    </Draggable>

    <div
      v-else
      class="table-flex__body table-flex--empty">
      <div
        class="table-flex__row"
        :class="trClass">
        <div
          v-for="field in fields"
          :key="field.key"
          class="table-flex__cell table-flex__cell--empty"
          data-testid="table-flex-cell-empty"
          :class="field.tdClass"
          :style="field.width ? { '--p-table-flex-cell-width': withUnit(field.width) } : { flex: '1 1 0%' }"
          :data-cell="field.key">
          <div
            class="table-flex__header"
            :class="field.thClass">
            <slot
              :name="`head(${field.key})`"
              :label="field.label"
              :field="field"
              :data-header="field.key">
              {{ field.label }}
            </slot>
          </div>
        </div>
        <div
          data-testid="table-flex-empty"
          class="table-flex__cell table-flex__cell--empty table-flex__state-empty">
          <slot name="empty">
            <span class="flex items-center justify-center text-subtle dark:text-dark-subtle">
              {{ emptyLabel }}
            </span>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup generic="T">
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
  KeyType,
} from '../table'
import Checkbox from '../checkbox/Checkbox.vue'
import { useVModel } from '../input'
import IconDrag from '@privyid/persona-icon/vue/draggable/20.vue'
import Draggable from 'vuedraggable'

const props = defineProps({
  apperance: {
    type   : String as PropType<ApperanceVariant>,
    default: 'card',
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
      return withKey(item as Record<string, unknown>) as T
    })
  },
  set (items) {
    emit('update:items', items)
  },
})

const classNames = computed(() => {
  const results: string[] = []

  if (props.apperance)
    results.push(`table-flex--${props.apperance}`)

  if (props.selectable)
    results.push('table-flex--selectable')

  if (props.draggable)
    results.push('table-flex--draggable')

  if (props.noLabel)
    results.push('table-flex--no-label')

  return results
})

defineSlots<{
  empty:() => VNode[],
  row:(props: { index: number, item: T }) => VNode[],
  [K: `cell(${string})`]:(props: { index: number }) => VNode[],
  [K: `head(${string})`]:(props: { field: TableField<T>, label: string }) => VNode[],
} & {
  [K in KeyType<T> as `cell(${K})`]:(props: { item: T, index: number }) => VNode[]
} & {
  [K in KeyType<T> as `head(${K})`]:(props: { field: TableField<T>, label: string }) => VNode[]
}>()
</script>

<style lang="postcss">
.table-flex {
  --p-table-bg: theme(backgroundColor.default.DEFAULT);
  --p-table-bg-dark: theme(backgroundColor.dark.default.DEFAULT);
  --p-table-border: theme(borderColor.default.DEFAULT);
  --p-table-border-dark: theme(borderColor.dark.default.DEFAULT);

  @apply flex flex-col w-full;

  .table-flex__header {
    @apply text-subtle text-xs font-bold pb-3;
    @apply dark:text-dark-subtle;
  }

  &__row {
    @apply max-sm:relative;
    @apply flex flex-col md:flex-row w-full items-start flex-wrap;

    & > :not([hidden]) {
      ~ .basis-full {
        @apply ml-0;
      }
    }

    .table-flex--empty & {
      @apply flex-row;
    }
  }

  &__cell {
    @apply max-sm:w-full md:w-[var(--p-table-flex-cell-width)];
    @apply py-4 px-3 text-sm text-default break-all;
    @apply dark:text-dark-default;

    & > .table-flex__header {
      @apply text-xs;
    }

    &.table-flex__checkbox,
    &.table-flex__drag {
      @apply max-sm:absolute max-sm:left-0 max-sm:top-1/2 max-sm:-translate-y-1/2;
      @apply flex-shrink-0 flex-grow-0 self-center w-auto;
    }

    &.table-flex__checkbox {
      > .checkbox {
        @apply md:gap-0;
      }
    }

    &.table-flex__drag {
      @apply cursor-grabbing md:mx-3;
    }

    &--empty {
      @apply pt-4 pb-0 px-3 text-sm text-default;
      @apply dark:text-dark-default;

      &.basis-full {
        @apply pb-4;
      }
    }
  }

  &__state-empty {
    @apply basis-full;
  }

  &__body {
    @apply flex flex-col;
  }

  &--card {
    .table-flex__body {
      @apply space-y-3;
    }

    .table-flex__row {
      @apply rounded border border-[color:var(--p-table-border)] bg-[color:var(--p-table-bg)];
      @apply dark:border-[color:var(--p-table-border-dark)] dark:bg-[color:var(--p-table-bg-dark)];
    }
  }

  &--no-label {
    .table-flex__header {
      @apply hidden;
    }
  }

  &--table {
    .table-flex__body {
      @apply border-b border-b-[color:var(--p-table-border)] divide-y divide-[color:var(--p-table-border)] bg-[color:var(--p-table-bg)];
      @apply dark:border-b-[color:var(--p-table-border-dark)] dark:divide-[color:var(--p-table-border-dark)] dark:bg-[color:var(--p-table-bg-dark)];
    }
  }

  &--selectable,
  &--draggable {
    .table-flex__row {
      @apply max-sm:pl-10;
    }
  }

  &.table-flex--selectable.table-flex--draggable {
    .table-flex__drag {
      @apply top-0 translate-y-0;
    }
  }
}
</style>
