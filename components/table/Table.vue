<template>
  <div
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
          :indeterminate="indeterminate" />
      </div>

      <div
        v-for="field in fields"
        :key="field.key"
        class="datatable__header"
        :class="field.thClass"
        :style="field.width ? { width: `${field.width}%` } : { flex: '1 1 0%' }">
        <slot
          :name="`head(${field.key})`"
          :label="field.label"
          :field="field">
          {{ field.label }}
        </slot>
      </div>
    </div>

    <Draggable
      v-model="rows"
      class="datatable__body"
      handle=".datatable__drag"
      item-key="_key"
      :disabled="!draggable">
      <template #item="{ element }">
        <div
          class="datatable__row"
          data-role="row">
          <div
            v-if="draggable"
            class="datatable__cell datatable__drag">
            <IconDrag />
          </div>

          <div
            v-if="selectable"
            class="datatable__cell datatable__checkbox">
            <Checkbox
              v-model="model"
              :value="element" />
          </div>

          <div
            v-for="field in fields"
            :key="field.key"
            class="datatable__cell"
            :class="field.tdClass"
            :style="field.width ? { width: `${field.width}%` } : { flex: '1 1 0%' }">
            <template v-if="variant === 'flexible'">
              <div
                class="datatable__header"
                :class="field.thClass">
                <slot
                  :name="`head(${field.key})`"
                  :label="field.label"
                  :field="field">
                  {{ field.label }}
                </slot>
              </div>
            </template>
            <slot
              :name="`cell(${field.key})`"
              :item="element">
              {{ field.formatter(element[field.key], element) }}
            </slot>
          </div>
        </div>
      </template>
    </Draggable>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  PropType,
} from 'vue-demi'
import { TableField } from './use-table'
import Checkbox from '../checkbox/Checkbox.vue'
import { useVModel } from '../input/use-input'
import IconDrag from '@carbon/icons-vue/lib/draggable/16'
import { omit } from 'lodash'

type TypeVariant = 'flexible' | 'static'

export default defineComponent({
  components: {
    Checkbox,
    IconDrag,
    Draggable: defineAsyncComponent(() => import('vuedraggable')),
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

    const rows = computed({
      get () {
        return props.items.map((item) => {
          return { ...item, _key: Symbol('item-key') }
        })
      },
      set (items) {
        emit('update:items', items.map((item) => omit(item, '_key')))
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

    const selectAll = computed({
      get () {
        return model.value.length === rows.value.length
      },
      set (value) {
        if (selectAll.value !== value)
          model.value = value ? [...rows.value] : []
      },
    })

    const indeterminate = computed(() => {
      return model.value.length > 0
        && model.value.length < rows.value.length
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
    @apply flex px-4 py-3 gap-2 bg-white;
  }

  .datatable__header {
    @apply text-subtext-100 text-sm font-bold;

    &.datatable__checkbox,
    &.datatable__drag {
      @apply flex-shrink-0 flex-grow-0;
    }

    &.datatable__drag {
      @apply invisible;
    }
  }

  &__row {
    @apply flex px-4 py-2 gap-2 w-full items-center bg-white;
  }

  &__cell {
    & > .datatable__header {
      @apply text-xs;
    }

    &.datatable__checkbox,
    &.datatable__drag {
      @apply flex-shrink-0 flex-grow-0;
    }

    &.datatable__drag {
      @apply cursor-grabbing;
    }
  }

  &__body {
    @apply flex flex-col;
  }

  &--flexible {
    .datatable__body {
      @apply gap-3;
    }

    .datatable__row {
      @apply rounded border border-secondary-25;
    }
  }

  &--static {
    .datatable__body {
      @apply divide-y divide-secondary-25;
    }
  }
}
</style>
