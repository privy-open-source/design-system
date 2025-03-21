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
    <template #activator="dropdownAttrs">
      <slot
        name="activator"
        v-bind="dropdownAttrs">
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
                <template v-else>
                  {{ (localModel as SelectItem)?.text }}
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
              :toggle="toggle">
              <IconArrow
                class="select__caret"
                data-testid="select-caret-icon"
                @click="toggle" />
            </slot>
          </template>
        </SelectInput>
      </slot>
    </template>

    <template #prepend>
      <p-input
        v-if="searchable"
        ref="input"
        v-model="keyword"
        data-testid="select-search"
        class="select__search no--error"
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
        <slot
          name="empty"
          :keyword="keyword">
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
import IconCheck from '@privyid/persona-icon/vue/checkmark/20.vue'
import IconSearch from '@privyid/persona-icon/vue/search/20.vue'
import IconCheckbox from '../checkbox/icon/IconCheckbox.vue'
import IconLoading from '../spinner/SpinnerRing.vue'
import type {
  PropType,
  HTMLAttributes,
  VNode,
} from 'vue-demi'
import {
  computed,
  ref,
  watch,
} from 'vue-demi'
import type { SelectItem } from '.'
import {
  findSelected,
  filterSelected,
  mergeUniq,
} from '.'
import type { Adapter, AdapterContext } from './adapter/adapter'
import BasicAdapter from './adapter/basic-adapter'
import useLoading from '../overlay/utils/use-loading'
import { isEqual } from '../utils/value'
import { onStartTyping, watchIgnorable } from '@vueuse/core'
import type { SizeVariant } from '../button'
import type { MenuSizeVariant } from '../dropdown/'
import { isNil } from 'lodash-es'

defineOptions({
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
})

const props = defineProps({
  modelValue: {
    type   : undefined as PropType<any>,
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
    default: '\u00A0' /* &nbsp; */,
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

const emit = defineEmits<{
  'change': [unknown],
  'update:modelValue': [unknown],
  'update:selected': [unknown],
  'userInput': [unknown],
}>()

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

const toggle = () => {
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
    : !isNil((localModel.value as SelectItem)?.value)
})

const { ignoreUpdates } = watchIgnorable(() => props.modelValue, (value) => {
  localModel.value = props.multiple
    ? filterSelected(items.value, value as unknown[])
    : findSelected(items.value, value)
})

watch(items, (options) => {
  if (props.modelValue && options.length > 0) {
    if (props.multiple) {
      const selected = filterSelected(options, props.modelValue)

      if (selected.length > 0)
        localModel.value = mergeUniq(localModel.value as SelectItem[], selected)
    } else {
      const selected = findSelected(options, props.modelValue)

      if (!isNil(selected.value))
        localModel.value = selected
    }
  }
})

function setValue (item?: SelectItem) {
  let value = props.multiple
    ? [] as SelectItem[]
    : { text: '', value: undefined } as SelectItem

  if (item) {
    if (props.multiple && Array.isArray(localModel.value)) {
      value = localModel.value.some((val) => isEqual(val.value, item.value))
        ? localModel.value.filter((val) => !isEqual(val.value, item.value))
        : [...localModel.value, item]
    } else
      value = item
  }

  ignoreUpdates(() => {
    localModel.value = value

    emit('change', value)
    emit('update:selected', value)
    emit('update:modelValue',
      props.multiple
        ? (value as SelectItem[]).map((i) => i.value)
        : (value as SelectItem)?.value,
    )
  })

  if (isOpen.value)
    emit('userInput', value)

  if (!props.noCloseAfterSelect)
    isOpen.value = false
}

function onFocus () {
  if (!props.disabled && !props.readonly)
    isOpen.value = true
}

function onClear () {
  setValue()
}

function isSelected (item: SelectItem) {
  if (props.multiple && localModel.value.length === 0)
    return false

  if (!props.multiple && (localModel.value as SelectItem).value === undefined)
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

defineExpose({
  keyword,
  isOpen,
  isLoading,
  menuEl,
  toggle,
})

defineSlots<{
  'activator'(props: {
    isOpen: boolean,
    open: () => void,
    close: () => void,
    toggle: () => void,
  }): VNode[],
  'selected'(props: { item: unknown, multiple: boolean }): VNode[],
  'placeholder'(): VNode[],
  'empty'(props: { keyword: string }): VNode[],
  'option'(props: {
    item: SelectItem,
    isSelected: boolean,
  }): VNode[],
  'loading'(): VNode[],
  'caret'(): VNode[],
}>()
</script>

<style lang="postcss">
.select {
  &__activator {
    @apply items-center flex;
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
      @apply grow truncate;
    }

    &-checked {
      @apply shrink-0 text-info invisible;
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
      @apply w-5 h-5 inline-flex shrink-0 border rounded-tn border-subtle items-center justify-center bg-default visible mr-4;
      @apply dark:border-dark-subtle dark:bg-dark-default;

      > svg {
        @apply w-3 fill-default;
        @apply dark:fill-dark-default;
      }
    }

    .selected .select__option-checked {
      @apply bg-brand-accent border-brand-accent;
      @apply dark:bg-dark-brand-accent dark:border-dark-brand-accent;
    }

    .dropdown__item:disabled:not(.selected) .select__option-checked {
      @apply bg-default/50 border-subtle;
      @apply dark:bg-dark-default/50 dark:border-dark-subtle;

      > svg {
        @apply fill-base;
        @apply dark:fill-dark-base;
      }
    }
  }
}
</style>
