<template>
  <Dropdown
    v-model="isOpen"
    variant="input"
    class="filterbar__select"
    :class="{'filterbar__select--active': selected !== undefined }">
    <template #button-content>
      {{ selected ? selected.text : schema.label }}
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
      <Radio
        v-model="model"
        apperance="option"
        class="filterbar__select__option"
        :value="item.value"
        @click="close">
        {{ item.text }}
      </Radio>
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
import Radio from '../../radio/Radio.vue'
import Caption from '../../caption/Caption.vue'
import IconArrow from '@carbon/icons-vue/lib/chevron--down/16'
import { isEqual } from '../../utils/value'

export default defineComponent({
  components: {
    Caption,
    Radio,
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
      type   : String,
      default: undefined,
    },
  },
  setup (props) {
    const model  = useVModel(props)
    const items  = useOptionsProp(props.schema)
    const isOpen = ref(false)

    const selected = computed(() => {
      return items.value.find((item) => {
        return isEqual(item.value, model.value)
      })
    })

    function close () {
      isOpen.value = false
    }

    return {
      items,
      model,
      isOpen,
      selected,
      close,
    }
  },
})
</script>

<style lang="postcss">
.filterbar__select {
  &-label {
    @apply pr-8 truncate;
  }

  .dropdown__item {
    @apply p-0;
  }

  &__option {
    @apply px-3 py-2 w-full;
  }

  &.filterbar__select--active {
    .dropdown__activator {
      @apply bg-body-100 text-white;
    }
  }

  &-badge.badge--primary {
   @apply bg-white bg-opacity-20 text-white;
  }
}
</style>
