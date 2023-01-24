<template>
  <div class="filterbar">
    <transition-group
      name="fade"
      mode="out-in">
      <template
        v-for="item in pinnedItems"
        :key="item.key">
        <slot :name="`cell(${item.key})`">
          <component
            :is="item.type"
            :key="item.key"
            class="filterbar__item"
            :schema="item"
            :model-value="getValue(item.key)"
            v-bind="item"
            @update:model-value="setValue(item.key, $event)" />
        </slot>
      </template>
    </transition-group>
    <Button
      size="sm"
      variant="link"
      color="primary"
      @click="reset">
      Reset
    </Button>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
} from 'vue-demi'
import { FilterItem } from '.'
import Dropdown from '../dropdown/Dropdown.vue'
import Button from '../button/Button.vue'
import Select from './pinned/Select.vue'
import Toggle from './pinned/Toggle.vue'
import Multiselect from './pinned/Multiselect.vue'
import Date from './pinned/Date.vue'
import Divider from '../divider/Divider.vue'
import { useVModel } from '../input'
import { isFilled } from './utils/sorter'

export default defineComponent({
  components: {
    Divider,
    Button,
    Dropdown,
    Date,
    Select,
    Multiselect,
    Toggle,
  },
  props: {
    schema: {
      type   : Array as PropType<FilterItem[]>,
      default: () => ([]),
    },
    modelValue: {
      type   : Object as PropType<Record<string, unknown>>,
      default: () => ({}),
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue'],
  setup (props) {
    const model = useVModel(props)

    const pinnedItems = computed(() => {
      return props.schema
        .filter((item) => {
          return item.pinned !== false
        })
        .map((object) => reactive(object))
        .sort((a, b) => {
          const aIndex = isFilled(a, model.value) ? 10 : 1
          const bIndex = isFilled(b, model.value) ? 10 : 1

          return bIndex - aIndex
        })
    })

    function getValue (key: string) {
      return model.value[key]
    }

    function setValue (key: string, value: unknown) {
      model.value = { ...model.value, [key]: value }
    }

    function reset () {
      model.value = Object.fromEntries(props.schema.map((i) => [i.key, i.default]))
    }

    return {
      model,
      pinnedItems,
      getValue,
      setValue,
      reset,
    }
  },
})
</script>

<style lang="postcss">
.filterbar {
  @apply flex flex-wrap space-gap-2 items-center;

  &__item {
    &.filterbar--active {
      &.btn--default,
      & .dropdown__activator.btn--default {
        @apply bg-emphasis-subtle text-on-emphasis border-on-emphasis;
      }
    }
  }
}
</style>
