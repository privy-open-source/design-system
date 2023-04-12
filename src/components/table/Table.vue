<template>
  <div
    data-testid="datatable"
    class="datatable"
    :class="classNames">
    <div
      v-if="variant === 'static'"
      class="datatable__headers">
      <div
        v-if="draggable"
        class="datatable__header datatable__drag">
        <IconDrag />
      </div>

      <div
        v-if="selectable"
        class="datatable__header datatable__checkbox">
        <Checkbox
          v-model="selectAll"
          data-testid="datatable-select-all"
          :indeterminate="indeterminate" />
      </div>

      <div
        v-for="field in fields"
        :key="field.key"
        class="datatable__header"
        data-testid="datatable-static-header"
        :class="field.thClass"
        :style="field.width ? { width: `${field.width}%` } : { flex: '1 1 0%' }"
        :data-header="field.key">
        <slot
          :name="`head(${field.key})`"
          :label="field.label"
          :field="field">
          {{ field.label }}
        </slot>
      </div>
    </div>

    <Draggable
      v-if="items.length > 0"
      v-model="rows"
      class="datatable__body"
      handle=".datatable__drag"
      item-key="_key"
      :disabled="!draggable">
      <template #item="{ element, index }">
        <div
          class="datatable__row"
          data-role="row">
          <div
            v-if="draggable"
            class="datatable__cell datatable__drag"
            data-testid="datatable-drag-handle">
            <IconDrag />
          </div>

          <div
            v-if="selectable"
            class="datatable__cell datatable__checkbox">
            <Checkbox
              v-model="model"
              data-testid="datatable-select"
              :value="element"
              :disabled="element._selectable === false" />
          </div>

          <div
            v-for="field in fields"
            :key="field.key"
            class="datatable__cell"
            data-testid="datatable-cell"
            :class="field.tdClass"
            :style="field.width ? { width: `${field.width}%` } : { flex: '1 1 0%' }"
            :data-cell="field.key">
            <template v-if="variant === 'flexible'">
              <div
                class="datatable__header"
                :class="field.thClass">
                <slot
                  :name="`head(${field.key})`"
                  :label="field.label"
                  :field="field"
                  :data-header="field.key">
                  {{ field.label }}
                </slot>
              </div>
            </template>
            <slot
              :name="`cell(${field.key})`"
              :index="index"
              :item="element">
              {{ field.formatter(element[field.key], element) }}
            </slot>
          </div>
        </div>
      </template>
    </Draggable>

    <div
      v-else
      class="datatable__body">
      <div
        class="datatable__row">
        <template v-if="variant === 'flexible'">
          <div
            v-for="field in fields"
            :key="field.key"
            class="datatable__cell datatable__cell--empty"
            data-testid="datatable-cell"
            :class="field.tdClass"
            :style="field.width ? { width: `${field.width}%` } : { flex: '1 1 0%' }"
            :data-cell="field.key">
            <div
              class="datatable__header"
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
        </template>
        <div class="datatable__cell datatable__cell--empty datatable__state-empty">
          <slot name="empty">
            <span class="flex justify-center items-center text-subtle dark:text-dark-subtle">There are no records to show</span>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'
import { TableField } from '.'
import Checkbox from '../checkbox/Checkbox.vue'
import { useVModel } from '../input'
import IconDrag from '@carbon/icons-vue/lib/draggable/24'
import Draggable from 'vuedraggable'
import defu from 'defu'

type TypeVariant = 'flexible' | 'static'

export default defineComponent({
  components: {
    Checkbox,
    IconDrag,
    Draggable,
  },
  props: {
    variant: {
      type   : String as PropType<TypeVariant>,
      default: 'flexible',
    },
    modelValue: {
      type   : Array as PropType<Record<string, unknown>[]>,
      default: () => ([]),
    },
    fields: {
      type   : Array as PropType<TableField[]>,
      default: () => ([]),
    },
    items: {
      type   : Array as PropType<Record<string, unknown>[]>,
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
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue', 'update:items'],
  setup (props, { emit }) {
    const model = useVModel(props)

    const rows = computed<Record<string, unknown>[]>({
      get () {
        return props.items.map((item) => {
          return defu(item, { _key: Symbol('item-key') })
        })
      },
      set (items) {
        emit('update:items', items)
      },
    })

    const classNames = computed(() => {
      const results: string[] = []

      if (props.variant)
        results.push(`datatable--${props.variant}`)

      if (props.selectable)
        results.push('datatable--selectable')

      if (props.draggable)
        results.push('datatable--draggable')

      return results
    })

    const selectableRows = computed(() => {
      return props.items.filter((item) => item._selectable !== false)
    })

    const selectAll = computed({
      get () {
        return model.value.length === selectableRows.value.length
      },
      set (value) {
        if (selectAll.value !== value)
          model.value = value ? [...selectableRows.value] : []
      },
    })

    const indeterminate = computed(() => {
      return model.value.length > 0
        && model.value.length < selectableRows.value.length
    })

    return {
      model,
      rows,
      classNames,
      selectAll,
      indeterminate,
    }
  },
})
</script>

<style lang="postcss">
.datatable {
  @apply flex flex-col w-full;

  &__headers {
    @apply flex pt-4 space-x-2 bg-default;
    @apply dark:bg-dark-default;

    > .datatable__header {
      @apply px-3;
    }

    + .datatable__body {
      @apply pt-2;
    }
  }

  .datatable__header {
    @apply text-subtle text-xs font-bold pb-3;
    @apply dark:text-dark-subtle;

    &.datatable__checkbox,
    &.datatable__drag {
      @apply flex-shrink-0 flex-grow-0;
    }

    &.datatable__drag {
      @apply invisible mx-3;
    }
  }

  &__row {
    @apply flex space-x-2 w-full items-start flex-wrap;

    & > :not([hidden]) {
      ~ .basis-full {
        @apply ml-0;
      }
    }
  }

  &__cell {
    @apply py-4 px-3 text-sm text-default break-all;
    @apply dark:text-dark-default;

    & > .datatable__header {
      @apply text-xs;
    }

    &.datatable__checkbox,
    &.datatable__drag {
      @apply flex-shrink-0 flex-grow-0 self-center;
    }

    &.datatable__checkbox {
      > .checkbox {
        @apply px-3 gap-0;
      }
    }

    &.datatable__drag {
      @apply cursor-grabbing mx-3;
    }

    &--empty {
      @apply pt-4 pb-0 px-3 text-sm text-default;

      &.basis-full {
        @apply pb-4;
      }
    }
  }

  &__state-empty {
    @apply basis-full flex-1;
  }

  &__body {
    @apply flex flex-col;
  }

  &--flexible {
    .datatable__body {
      @apply space-y-3;
    }

    .datatable__row {
      @apply rounded border border-default bg-default;
      @apply dark:border-dark-default dark:bg-dark-default;
    }
  }

  &--static {
    .datatable__headers {
      @apply border-b border-b-default;
      @apply dark:border-b-dark-default;
    }

    .datatable__body {
      @apply border-b border-b-default divide-y divide-default bg-default;
      @apply dark:border-b-dark-default dark:divide-dark-default dark:bg-dark-default;
    }
  }
}
</style>
