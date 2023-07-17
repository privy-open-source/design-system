<template>
  <Dropdown
    v-model="isOpen"
    class="select"
    data-testid="select"
    aria-label="select"
    :disabled="disabled"
    :class="classNames">
    <template #activator>
      <p-input
        v-model="search"
        data-testid="select-search"
        class="select__search"
        :size="size"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @focus="onFocus">
        <template #append>
          <IconArrow class="select__caret" />
        </template>
      </p-input>
    </template>

    <template v-if="!isLoading && items.length === 0">
      <div
        data-testid="select-no-data"
        class="select__empty">
        <slot name="empty">
          {{ emptyText }}
        </slot>
      </div>
    </template>

    <template v-else>
      <DropdownItem
        v-for="(item, i) in items"
        :key="i"
        data-testid="select-item"
        :class="{ selected: isSelected(item) }"
        @click="select(item)">
        <div class="select__option">
          <div class="select__option-text">
            <slot
              name="option"
              :is-selected="isSelected(item)"
              :item="item">
              {{ item.text }}
            </slot>
          </div>
          <IconCheck
            class="select__option-checked" />
        </div>
      </DropdownItem>
    </template>

    <template v-if="isLoading">
      <div
        data-testid="select-loading"
        class="select__loading">
        <IconLoading
          width="14"
          height="14" />
        <slot name="loading">
          {{ loadingText }}
        </slot>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import Dropdown from '../dropdown/Dropdown.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'
import pInput from '../input/Input.vue'
import IconArrow from '@carbon/icons-vue/lib/chevron--down/16'
import IconCheck from '@carbon/icons-vue/lib/checkmark--filled/16'
import IconLoading from '../spinner/SpinnerRing.vue'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  PropType,
  ref,
  watch,
} from 'vue-demi'
import { SelectItem } from '.'
import { Adapter } from './adapter/adapter'
import BasicAdapter from './adapter/basic-adapter'
import useLoading from '../overlay/utils/use-loading'
import { isEqual } from '../utils/value'
import { tryOnMounted } from '@vueuse/shared'
import { onStartTyping } from '@vueuse/core'
import { SizeVariant } from '../button'

export default defineComponent({
  components: {
    Dropdown,
    DropdownItem,
    pInput,
    IconArrow,
    IconCheck,
    IconLoading,
  },
  props: {
    modelValue: {
      type: [
        String,
        Number,
        Boolean,
        Array,
        Object,
        Date,
      ],
      default: '',
    },
    selected: {
      type   : Object as PropType<SelectItem>,
      default: () => {
        return {
          text : '',
          value: undefined,
        }
      },
    },
    options: {
      type   : Array as PropType<string[] | SelectItem[]>,
      default: () => ([]),
    },
    placeholder: {
      type   : String,
      default: '',
    },
    emptyText: {
      type   : String,
      default: 'No Data',
    },
    loadingText: {
      type   : String,
      default: 'Loading...',
    },
    adapter: {
      type   : Object as PropType<Adapter>,
      default: () => BasicAdapter,
    },
    disabled: {
      type   : Boolean,
      default: false,
    },
    readonly: {
      type   : Boolean,
      default: false,
    },
    error: {
      type   : Boolean,
      default: false,
    },
    size: {
      type   : String as PropType<SizeVariant>,
      default: 'md',
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: [
    'change',
    'update:modelValue',
    'update:selected',
    'userInput',
  ],
  setup (props, { emit }) {
    const vm        = getCurrentInstance()
    const input     = ref<HTMLInputElement>()
    const keyword   = ref('')
    const isOpen    = ref(false)
    const isLoading = useLoading({ elapsed: false })
    const context   = {
      props,
      keyword,
      isOpen,
      isLoading,
    }

    const items = props.adapter.setup(context)

    const model = computed({
      get (): SelectItem {
        return items.value.find((item) => isEqual(item.value, props.modelValue))
          ?? {
            text : '',
            value: undefined,
          }
      },
      set (selected: SelectItem) {
        emit('change', selected)
        emit('update:modelValue', selected.value)
        emit('update:selected', selected)

        if (isOpen.value)
          emit('userInput', selected)
      },
    })

    const classNames = computed(() => {
      const result: string[] = []

      if (isOpen.value)
        result.push('select--open')

      if (props.disabled)
        result.push('select--disabled')

      if (props.readonly)
        result.push('select--readonly')

      if (props.error)
        result.push('select--error', 'state--error')

      return result
    })

    const search = computed({
      get () {
        return isOpen.value
          ? keyword.value
          : model.value?.text
      },
      set (value: string) {
        if (value !== search.value)
          keyword.value = value
      },
    })

    function select (item: SelectItem) {
      model.value = item
    }

    function onFocus () {
      if (!props.disabled && !props.readonly)
        isOpen.value = true
    }

    function isSelected (item: SelectItem) {
      return isEqual(item.value, model.value.value)
    }

    watch(isOpen, (value) => {
      if (!value)
        keyword.value = ''
    }, { flush: 'post' })

    onStartTyping(() => {
      if (isOpen.value && input.value && input.value !== document.activeElement)
        input.value.focus()
    })

    tryOnMounted(() => {
      if (vm?.proxy?.$el) {
        input.value = (vm.proxy.$el as HTMLElement)
          .querySelector('.select__search')
      }
    })

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
  },
})
</script>

<style lang="postcss">
.select {
  &__search {
    @apply pr-8 truncate hover:cursor-default focus:cursor-text;

    .state--error &,
    .select--error & {
        @apply border-danger-emphasis hover:border-danger-emphasis focus:ring-danger focus:border-danger-emphasis;
        @apply dark:border-dark-danger-emphasis hover:dark:border-dark-danger-emphasis focus:dark:ring-dark-danger focus:dark:border-dark-danger-emphasis;
    }
  }

  &__caret {
    @apply transition-transform duration-150 text-subtle pointer-events-none;
    @apply dark:text-dark-subtle;
  }

  &__option {
    @apply flex items-center justify-between;

    &-text {
      @apply flex-grow truncate;
    }

    &-checked {
      @apply flex-shrink-0 text-info invisible;
      @apply dark:text-dark-info;

      .selected & {
        @apply visible;
      }
    }
  }

  &__empty,
  &__loading {
    @apply px-3 py-2 text-default text-center;
    @apply dark:text-dark-default;
  }

  &__loading {
    @apply flex justify-center items-center space-x-2;
  }

  &--open {
    .select__caret {
      @apply rotate-180;
    }
  }
}
</style>
