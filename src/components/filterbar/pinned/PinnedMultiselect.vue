<template>
  <Dropdown
    v-model="isOpen"
    variant="input"
    size="sm"
    class="filterbar__multiselect"
    :class="{'filterbar--active': selected.length > 0 }"
    divider
    caret>
    <template #button-content>
      <template v-if="selected.length > 1">
        {{ schema.label }}
        <Badge variant="inverse">
          {{ selected.length }}
        </Badge>
      </template>
      <template v-else-if="selected.length === 1">
        {{ selected.at(0).text }}
      </template>
      <template v-else>
        {{ schema.label }}
      </template>
    </template>

    <DropdownHeader>
      {{ schema.label }}
    </DropdownHeader>
    <template
      v-for="(item, i) in items"
      :key="i">
      <DropdownItem>
        <Checkbox
          v-model="model"
          appearance="option"
          :value="item.value">
          {{ item.text }}
        </Checkbox>
      </DropdownItem>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import type { PropType } from 'vue-demi'
import {
  computed,
  defineComponent,
  ref,
} from 'vue-demi'
import Badge from '../../badge/Badge.vue'
import Dropdown from '../../dropdown/Dropdown.vue'
import DropdownHeader from '../../dropdown/DropdownHeader.vue'
import DropdownItem from '../../dropdown/DropdownItem.vue'
import Checkbox from '../../checkbox/Checkbox.vue'
import { useOptionsProp } from '../../select/adapter/adapter'
import { useVModel } from '../../input'
import { isEqual } from '../../utils/value'
import type { FilterSelect } from '..'
import type { SelectItem } from '../../select'

export default defineComponent({
  components: {
    Badge,
    Dropdown,
    DropdownItem,
    DropdownHeader,
    Checkbox,
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
      type   : Array,
      default: () => ([]),
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
      return items.value.filter((item) => {
        return Array.isArray(model.value) && model.value.some((v: unknown) => isEqual(item.value, v))
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

<style lang="postcss">
.filterbar__multiselect {
  > .btn {
    @apply items-center;
  }
}
</style>
