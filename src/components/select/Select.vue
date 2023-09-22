<template>
  <Dropdown
    ref="dropdown"
    v-model="isOpen"
    class="select"
    data-testid="select"
    aria-label="select"
    :disabled="disabled"
    :divider="divider"
    :menu-size="menuSize"
    :menu-class="menuClass"
    :class="classNames"
    :no-animation="noAnimation"
    @show="onOpened"
    @hide="onClosed">
    <template #activator>
      <SelectInput
        data-testid="select-activator"
        class="select__activator"
        :size="size"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :error="error"
        @focus="onFocus">
        <template #default>
          <template v-if="hasValue">
            <slot
              name="selected"
              :item="localModel"
              :multiple="multiple">
              <template v-if="props.multiple && Array.isArray(localModel)">
                <SelectTags
                  :items="localModel"
                  :display-limit="displayLimit"
                  :limit-text="limitText" />
              </template>
              <template v-else-if="!Array.isArray(localModel)">
                {{ localModel?.text }}
              </template>
            </slot>
          </template>
          <template v-else>
            <div data-testid="select-placeholder">
              <slot name="placeholder">
                <span class="input__form__placeholder">
                  {{ placeholder }}
                </span>
              </slot>
            </div>
          </template>
        </template>
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
      </SelectInput>
    </template>

    <template #prepend>
      <p-input
        v-if="searchable"
        ref="input"
        v-model="keyword"
        data-testid="select-search"
        class="select__search no--error"
        :size="size"
        :placeholder="searchText"
        :clearable="true">
        <template #append>
          <IconSearch class="select__search-icon" />
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
        v-if="sectionLabel || clearable"
        data-testid="select-label">
        <template #default>
          {{ sectionLabel }}
        </template>

        <template
          v-if="clearable"
          #action>
          <p-text
            data-testid="select-clear"
            variant="caption2"
            href="javascript:void"
            @click.prevent="onClear">
            {{ clearLabel }}
          </p-text>
        </template>
      </DropdownHeader>
      <DropdownItem
        v-for="(item, i) in items"
        :key="i"
        data-testid="select-item"
        :class="{ selected: isSelected(item) }"
        :disabled="Boolean(item.disabled)"
        @click.prevent="setValue(item)">
        <div class="select__option">
          <div class="select__option-text">
            <slot
              name="option"
              :is-selected="isSelected(item)"
              :item="item">
              {{ item.text }}
            </slot>
          </div>
          <div class="select__option-checked">
            <IconCheckbox v-if="multiple" />
            <IconCheck v-else />
          </div>
        </div>
      </DropdownItem>
    </template>

    <template v-if="isLoading">
      <div
        data-testid="select-loading"
        class="select__loading">
        <IconLoading />
        <slot name="loading">
          <span>{{ loadingText }}</span>
        </slot>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import Dropdown from '../dropdown/Dropdown.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'
import DropdownHeader from '../dropdown/DropdownHeader.vue'
import pInput from '../input/Input.vue'
import pText from '../text/Text.vue'
import SelectInput from './SelectInput.vue'
import SelectTags from './SelectTags.vue'
import IconArrow from '@privyid/persona-icon/vue/chevron-down/20.vue'
import IconCheck from '@privyid/persona-icon/vue/checkmark-circle-solid/20.vue'
import IconSearch from '@privyid/persona-icon/vue/search/20.vue'
import IconCheckbox from '../checkbox/icon/IconCheckbox.vue'
import IconLoading from '../spinner/SpinnerRing.vue'
import {
  computed,
  PropType,
  ref,
  HTMLAttributes,
  nextTick,
} from 'vue-demi'
import {
  findSelected,
  filterSelected,
  SelectItem,
} from '.'
import { Adapter, AdapterContext } from './adapter/adapter'
import BasicAdapter from './adapter/basic-adapter'
import useLoading from '../overlay/utils/use-loading'
import { isEqual } from '../utils/value'
import { onStartTyping, watchPausable } from '@vueuse/core'
import { SizeVariant } from '../button'
import { MenuSizeVariant } from '../dropdown/'

defineOptions({
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
})

const props = defineProps({
  modelValue: {
    type   : undefined,
    default: undefined,
  },
  selected: {
    type   : [Object, Array] as PropType<SelectItem | SelectItem[]>,
    default: undefined,
  },
  options: {
    type   : Array as PropType<string[] | SelectItem[]>,
    default: () => ([]),
  },
  placeholder: {
    type   : String,
    default: '\u00A0',
  },
  emptyText: {
    type   : String,
    default: 'No Data',
  },
  loadingText: {
    type   : String,
    default: 'Loading...',
  },
  searchText: {
    type   : String,
    default: 'Search...',
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
  clearLabel: {
    type   : String,
    default: 'Clear',
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
  multiple: {
    type   : Boolean,
    default: false,
  },
  displayLimit: {
    type   : Number,
    default: undefined,
  },
  limitText: {
    type   : String,
    default: undefined,
  },
  searchable: {
    type   : Boolean,
    default: true,
  },
  menuSize: {
    type   : String as PropType<MenuSizeVariant>,
    default: undefined,
  },
  menuClass: {
    type: [
      String,
      Array,
      Object,
    ] as PropType<HTMLAttributes['class']>,
    default: undefined,
  },
  divider: {
    type   : Boolean,
    default: false,
  },
  /**
   * For testing only, disable transition animation
   */
  noAnimation: {
    type   : Boolean,
    default: false,
  },
  noCloseAfterSelect: {
    type   : Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'change',
  'update:modelValue',
  'update:selected',
  'userInput',
])

const input    = ref<InstanceType<typeof pInput>>()
const dropdown = ref<InstanceType<typeof Dropdown>>()

const inputEl = computed(() => input.value?.input)
const menuEl  = computed(() => dropdown.value?.menuBody)

const keyword   = ref('')
const isOpen    = ref(false)
const isLoading = useLoading({ elapsed: false })
const context   = {
  props,
  keyword,
  isOpen,
  isLoading,
  menuEl,
} as AdapterContext

const items      = props.adapter.setup(context)
const localModel = ref<SelectItem | SelectItem[]>(
  props.multiple
    ? filterSelected(items.value, props.modelValue as unknown[])
    : findSelected(items.value, props.modelValue),
)

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

  if (props.multiple)
    result.push('select--multiple')

  return result
})

const hasValue = computed(() => {
  return props.multiple
    ? Array.isArray(localModel.value) && localModel.value.length > 0
    : (localModel.value as SelectItem)?.value
})

const modelWatcher = watchPausable(() => props.modelValue, (value) => {
  localModel.value = props.multiple
    ? filterSelected(items.value, value as unknown[])
    : findSelected(items.value, value)
})

function setValue (item?: SelectItem) {
  let value: SelectItem | SelectItem[]

  if (props.multiple) {
    if (item) {
      if (Array.isArray(localModel.value)) {
        value = localModel.value.some((val) => isEqual(val.value, item.value))
          ? localModel.value.filter((val) => !isEqual(val.value, item.value))
          : [...localModel.value, item]
      }
    } else
      value = []
  } else
    value = item

  modelWatcher.pause()

  localModel.value = value

  emit('change', value)
  emit('update:selected', value)
  emit('update:modelValue',
    props.multiple
      ? (value as SelectItem[]).map((i) => i.value)
      : (value as SelectItem)?.value,
  )

  if (isOpen.value)
    emit('userInput', value)

  if (!props.noCloseAfterSelect)
    isOpen.value = false

  nextTick(() => {
    modelWatcher.resume()
  })
}

function onFocus () {
  if (!props.disabled && !props.readonly)
    isOpen.value = true
}

function onClear () {
  setValue()
}

function isSelected (item: SelectItem) {
  if (!localModel.value)
    return false

  if (props.multiple && Array.isArray(localModel.value))
    return localModel.value.some((model) => isEqual(item.value, model.value))

  return isEqual(item.value, (localModel.value as SelectItem).value)
}

function onOpened () {
  inputEl.value?.focus()
}

function onClosed () {
  keyword.value = ''
}

onStartTyping(() => {
  if (isOpen.value && inputEl.value && inputEl.value !== document.activeElement) {
    inputEl.value.select()
    inputEl.value.focus()
  }
})
</script>

<style lang="postcss">
.select {
  --p-select-min-width: 20ch;

  &__activator {
    @apply min-w-[var(--p-select-min-width)] items-center flex;
  }

  &__search {
    @apply pr-8 truncate hover:cursor-default focus:cursor-text rounded-b-none border-t-0 border-x-0;

    &-icon {
      @apply text-muted;
      @apply dark:text-dark-muted;
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

  &--multiple {
    .select__option {
      @apply flex-row-reverse;
    }

    .select__option-checked {
      @apply w-5 h-5 inline-flex flex-shrink-0 border rounded-tn border-subtle items-center justify-center bg-default visible mr-4;
      @apply dark:border-dark-subtle dark:bg-dark-default;

      > svg {
        @apply w-3 fill-default;
        @apply dark:fill-dark-default;
      }
    }

    .selected .select__option-checked {
      @apply bg-info-emphasis border-info-emphasis;
      @apply dark:bg-dark-info-emphasis dark:border-dark-info-emphasis;
    }

    .dropdown__item:disabled:not(.selected) .select__option-checked {
      @apply bg-subtle border-subtle;
      @apply dark:bg-dark-subtle dark:border-dark-subtle;

      > svg {
        @apply fill-subtle;
        @apply dark:fill-dark-subtle;
      }
    }
  }
}
</style>
