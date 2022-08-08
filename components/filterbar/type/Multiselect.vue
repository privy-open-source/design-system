<template>
  <Dropdown
    v-model="isOpen"
    variant="input"
    class="filterbar__multiselect"
    :class="{'filterbar__multiselect--active': selected.length > 0 }">
    <template #button-content>
      <template v-if="selected.length > 1">
        {{ schema.label }}:
        <Badge class="filterbar__multiselect-badge">
          {{ selected.length }}
        </Badge>
      </template>
      <template v-else-if="selected.length === 1">
        {{ selected.at(0).text }}
      </template>
      <template v-else>
        {{ schema.label }}
      </template>
      <IconArrow />
    </template>
    <Caption
      class="px-3 py-2"
      bold>
      {{ schema.label }}
    </Caption>
    <DropdownItem
      v-for="(item, i) in items"
      :key="i">
      <Checkbox
        v-model="model"
        apperance="option"
        class="filterbar__multiselect__option"
        :value="item.value">
        {{ item.text }}
      </Checkbox>
    </DropdownItem>
  </Dropdown>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from 'vue-demi'
import Dropdown from '../../dropdown/Dropdown.vue'
import DropdownItem from '../../dropdown/DropdownItem.vue'
import { useVModel } from '../../input/use-input'
import { useOptionsProp } from '../../select/adapter/adapter'
import { FilterSelect } from '../use-filterbar'
import Checkbox from '../../checkbox/Checkbox.vue'
import Caption from '../../caption/Caption.vue'
import IconArrow from '@carbon/icons-vue/lib/chevron--down/16'
import { isEqual } from '../../utils/value'
import Badge from '../../badge/Badge.vue'

export default defineComponent({
  components: {
    Badge,
    Caption,
    Checkbox,
    Dropdown,
    DropdownItem,
    IconArrow,
  },
  props: {
    schema: {
      type    : Object as PropType<FilterSelect>,
      required: true,
    },
    modelValue: {
      type   : Array,
      default: () => ([]),
    },
  },
  setup (props) {
    const model  = useVModel(props)
    const items  = useOptionsProp(props.schema)
    const isOpen = ref(false)

    const selected = computed(() => {
      return items.value.filter((item) => {
        return model.value.some((v) => isEqual(item.value, v))
      })
    })

    return {
      items,
      model,
      isOpen,
      selected,
    }
  },
})
</script>

<style lang="postcss">
.filterbar__multiselect {
  &-label {
    @apply pr-8 truncate;
  }

  .dropdown__item {
    @apply p-0;
  }

  &__option {
    @apply px-3 py-2 w-full;
  }

  &.filterbar__multiselect--active {
    .dropdown__activator {
      @apply bg-body-100 text-white;
    }
  }

  &-badge.badge--primary {
   @apply bg-white bg-opacity-20 text-white;
  }
}
</style>
