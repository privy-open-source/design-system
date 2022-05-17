<template>
  <Dropdown
    class="select"
    data-testid="select"
    :class="classNames"
    v-model="isOpen">
    <template #activator>
      <Input
        class="select__search"
        v-model="search"
        @focus="onFocus"
        :placeholder="placeholder"
        :disabled="disabled" />
      <IconArrow class="select__caret" />
    </template>

    <template v-if="!isLoading && items.length === 0">
      <div class="select__empty">
        <slot name="empty">
          No Data
        </slot>
      </div>
    </template>

    <template v-else v-for="item in items">
      <DropdownItem
        :class="{ selected: isSelected(item) }"
        @click="select(item)">
        <slot name="option" :item="item">
          <div class="select__option">
            <span class="select__option-text">{{ item.text }}</span>
            <IconCheck
              class="select__option-checked" />
          </div>
        </slot>
      </DropdownItem>
    </template>

    <template v-if="isLoading">
      <div class="select__loading">
        <slot name="loading">
          <IconLoading width="14" height="14" />
          Loading...
        </slot>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import Dropdown from "../dropdown/Dropdown.vue"
import DropdownItem from "../dropdown/DropdownItem.vue"
import Input from "../input/Input.vue"
import IconArrow from "@carbon/icons-vue/lib/chevron--down/16"
import IconCheck from "@carbon/icons-vue/lib/checkmark--filled/16"
import IconLoading from "../spinner/Ring.vue"
import { computed, defineComponent, PropType, ref } from "vue-demi"
import { SelectItem } from "./use-select"
import { Adapter } from "./adapter/adapter"
import BasicAdapter from "./adapter/basic-adapter"
import useLoading from "../overlay/utils/use-loading"
import { isEqual } from "../utils/value"

export default defineComponent({
  components: {
    Dropdown,
    DropdownItem,
    Input,
    IconArrow,
    IconCheck,
    IconLoading
  },
  props: {
    modelValue: {
      default: '',
    },
    selected: {
      type: Object as PropType<SelectItem>,
    },
    options: {
      type   : Array as PropType<string[] | SelectItem[]>,
      default: () => ([]),
    },
    placeholder: {
      type   : String,
      default: '',
    },
    adapter: {
      type   : Object as PropType<Adapter>,
      default: () => BasicAdapter,
    },
    noAutoClose: {
      type   : Boolean,
      default: false,
    },
    disabled: {
      type   : Boolean,
      default: false,
    }
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: [
    'update:modelValue',
    'update:selected',
    'userInput',
  ],
  setup (props, { emit }) {
    const keyword   = ref('')
    const isOpen    = ref(false)
    const isLoading = useLoading()

    const items = props.adapter.setup({
      props,
      keyword,
      isOpen,
      isLoading,
    })

    const model = computed({
      get (): SelectItem {
        return items.value.find((item) => isEqual(item.value, props.modelValue))
          ?? { text: '', value: undefined }
      },
      set (selected: SelectItem) {
        emit('update:modelValue', selected.value)
        emit('update:selected', selected)

        if (isOpen.value)
          emit('userInput', selected)
      }
    })

    const classNames = computed(() => {
      const result: string[] = []

      if (isOpen.value)
        result.push('select--open')

      return result
    })

    const search = computed({
      get () {
        return isOpen.value
          ? keyword.value
          : model.value?.text
      },
      set (value: string) {
        keyword.value = value
      }
    })

    function select (item: SelectItem) {
      model.value  = item
      isOpen.value = props.noAutoClose
    }

    function onFocus () {
      isOpen.value  = true
      keyword.value = ''
    }

    function isSelected (item: SelectItem) {
      return isEqual(item.value, model.value.value)
    }

    return {
      classNames,
      model,
      isOpen,
      isLoading,
      search,
      items,
      select,
      onFocus,
      isSelected,
    }
  }
})
</script>

<style lang="postcss">
.select {
  &__search {
    @apply pr-8 truncate;
  }

  &__caret {
    @apply absolute right-3 top-0 bottom-0 my-auto transition-transform duration-150 text-secondary-75 pointer-events-none;
  }

  &__option {
    @apply flex items-center justify-between;

    &-text {
      @apply flex-grow truncate;
    }

    &-checked {
      @apply flex-shrink-0 text-primary-100 invisible;

      .selected & {
        @apply visible;
      }
    }
  }

  &__empty,
  &__loading {
    @apply px-3 py-2 text-body-100 text-center;
  }

  &__loading {
    @apply flex justify-center items-center gap-2;
  }

  &--open {
    .select__caret {
      @apply rotate-180;
    }
  }
}
</style>
