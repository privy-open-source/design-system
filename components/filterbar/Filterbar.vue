<template>
  <div class="filterbar">
    <template
      v-for="item in items"
      :key="item.key">
      <slot :name="`cell(${item.key})`">
        <component
          :is="item.type"
          class="filterbar__item"
          :schema="item"
          :model-value="getValue(item.key)"
          @update:model-value="setValue(item.key, $event)" />
      </slot>
    </template>
    <Button
      variant="link"
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
} from 'vue-demi'
import { FilterItem } from './use-filterbar'
import Dropdown from '../dropdown/Dropdown.vue'
import Button from '../button/Button.vue'
import Select from './type/Select.vue'
import Toggle from './type/Toggle.vue'
import Multiselect from './type/Multiselect.vue'
import { useVModel } from '../input/use-input'
import IconSetting from '@carbon/icons-vue/lib/settings--adjust/20'

export default defineComponent({
  components: {
    IconSetting,
    Button,
    Dropdown,
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
    const items = computed(() => {
      return props.schema
        .filter((item) => {
          return item.pinned !== false
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
      items,
      getValue,
      setValue,
      reset,
    }
  },
})
</script>

<style lang="postcss">
.filterbar {
  @apply flex gap-2;
}
</style>
