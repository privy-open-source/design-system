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
        :clearable="clearable"
        @clear.prevent="onClear"
        @focus="onFocus">
        <template
          v-if="!noCaret"
          #append>
          <slot
            name="caret"
            :is-open="isOpen"
            :toggle="toggleOpen">
            <IconArrow
              class="select__caret"
              data-testid="select-caret-icon"
              @click="toggleOpen" />
          </slot>
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
      <DropdownHeader
        v-if="sectionLabel"
        data-testid="select-label">
        {{ sectionLabel }}
      </DropdownHeader>
      <DropdownItem
        v-for="(item, i) in items"
        :key="i"
        data-testid="select-item"
        :class="{ selected: isSelected(item) }"
        :disabled="Boolean(item.disabled)"
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
          <span>{{ loadingText }}</span>
        </slot>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import Dropdown from '../dropdown/Dropdown.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'
import DropdownHeader from '../dropdown/DropdownHeader.vue'
import pInput from '../input/Input.vue'
import IconArrow from '@privyid/persona-icon/vue/chevron-down/20.vue'
import IconCheck from '@privyid/persona-icon/vue/checkmark-circle-solid/20.vue'
import IconLoading from '../spinner/SpinnerRing.vue'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  PropType,
  ref,
  watch,
} from 'vue-demi'
import { findSelected, SelectItem } from '.'
import { Adapter } from './adapter/adapter'
import BasicAdapter from './adapter/basic-adapter'
import useLoading from '../overlay/utils/use-loading'
import { isEqual } from '../utils/value'
import { tryOnMounted } from '@vueuse/shared'
import {
  onStartTyping,
} from '@vueuse/core'
import { SizeVariant } from '../button'

export default defineComponent({
  components: {
    Dropdown,
    DropdownItem,
    DropdownHeader,
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
      default: undefined,
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
    clearable: {
      type   : Boolean,
      default: false,
    },
    size: {
      type   : String as PropType<SizeVariant>,
      default: 'md',
    },
    sectionLabel: {
      type   : String,
      default: undefined,
    },
    noCaret: {
      type   : Boolean,
      default: false,
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

    const items      = props.adapter.setup(context)
    const localModel = ref<SelectItem>(findSelected(items.value, props.modelValue))

    const toggleOpen = () => {
      if (!props.disabled && !props.readonly)
        isOpen.value = !isOpen.value
    }

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
          : localModel.value?.text
      },
      set (value: string) {
        if (value !== search.value)
          keyword.value = value
      },
    })

    watch(() => props.modelValue, (value) => {
      localModel.value = findSelected(items.value, value)
    })

    function select (item?: SelectItem) {
      localModel.value = item

      emit('change', item)
      emit('update:selected', item)
      emit('update:modelValue', item?.value)

      if (isOpen.value)
        emit('userInput', item)
    }

    function onFocus () {
      if (!props.disabled && !props.readonly)
        isOpen.value = true
    }

    function onClear () {
      if (isOpen.value)
        keyword.value = ''
      else
        select()
    }

    function isSelected (item: SelectItem) {
      return isEqual(item.value, localModel.value?.value)
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
      isOpen,
      isLoading,
      search,
      items,
      toggleOpen,
      select,
      onFocus,
      onClear,
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
    @apply transition-transform duration-150 text-subtle;
    @apply dark:text-dark-subtle;
    @apply cursor-pointer;
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
