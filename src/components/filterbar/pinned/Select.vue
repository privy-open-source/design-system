<template>
  <Dropdown
    v-model="isOpen"
    variant="input"
    class="filterbar__select"
    :class="{'filterbar--active': selected !== undefined }"
    caret>
    <template #button-content>
      {{ selected ? selected.text : schema.label }}
    </template>
    <Caption
      class="px-3 py-2"
      bold>
      {{ schema.label }}
    </Caption>
    <template
      v-for="(item, i) in items"
      :key="i">
      <Radio
        v-model="model"
        apperance="option"
        :value="item.value"
        @click="close">
        {{ item.text }}
      </Radio>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from 'vue-demi'
import Caption from '../../caption/Caption.vue'
import Dropdown from '../../dropdown/Dropdown.vue'
import Radio from '../../radio/Radio.vue'
import { useOptionsProp } from '../../select/adapter/adapter'
import { useVModel } from '../../input/use-input'
import { isEqual } from '../../utils/value'
import { FilterSelect } from '../use-filterbar'
import { SelectItem } from '../../select/use-select'

export default defineComponent({
  components: {
    Caption,
    Dropdown,
    Radio,
  },
  props: {
    schema: {
      type    : Object as PropType<FilterSelect>,
      required: true,
    },
    options: {
      type   : Array as PropType<string[] | SelectItem[]>,
      default: () => ([]),
    },
    modelValue: {
      type: [
        String,
        Number,
        Boolean,
        Array,
        Object,
        Date,
      ],
      default: undefined,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue'],
  setup (props) {
    const items  = useOptionsProp(props)
    const isOpen = ref(false)

    const model = useVModel(props)

    const selected = computed(() => {
      return items.value.find((item) => {
        return isEqual(item.value, model.value)
      })
    })

    function close () {
      isOpen.value = false
    }

    return {
      model,
      items,
      isOpen,
      selected,
      close,
    }
  },
})
</script>
