<template>
  <Dropdown
    v-model="isOpen"
    variant="input"
    size="sm"
    class="filterbar__multiselect"
    :class="{'filterbar--active': selected.length > 0 }"
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

    <Subheading
      class="px-4 pt-4 pb-1"
      weight="medium"
      overline>
      {{ schema.label }}
    </Subheading>
    <template
      v-for="(item, i) in items"
      :key="i">
      <Checkbox
        v-model="model"
        appearance="option"
        :value="item.value">
        {{ item.text }}
      </Checkbox>
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
import Badge from '../../badge/Badge.vue'
import Subheading from '../../subheading/Subheading.vue'
import Dropdown from '../../dropdown/Dropdown.vue'
import Checkbox from '../../checkbox/Checkbox.vue'
import { useOptionsProp } from '../../select/adapter/adapter'
import { useVModel } from '../../input'
import { isEqual } from '../../utils/value'
import { FilterSelect } from '..'
import { SelectItem } from '../../select'

export default defineComponent({
  components: {
    Badge,
    Subheading,
    Dropdown,
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
