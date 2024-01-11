<template>
  <p-dropzone
    ref="dropzone"
    v-model="model"
    class="input-file"
    :class="classNames"
    :model-modifiers="modelModifiers"
    :multiple="multiple"
    :maxlength="maxlength"
    :accept="accept"
    :disabled="disabled"
    :readonly="readonly"
    :clear-on-cancel="clearOnCancel">
    <template #default="{ browse, rawModel }">
      <p-input-group
        :disabled="disabled"
        :error="error"
        :size="size">
        <p-input-group-addon>
          <p-button
            :disabled="disabled"
            :readonly="readonly"
            @click="browse">
            {{ browseLabel }}
          </p-button>
        </p-input-group-addon>
        <p-input
          readonly
          :clearable="clearable"
          :model-value="getFileNames(rawModel)"
          :placeholder="placeholder"
          @clear.stop.prevent="clear" />
      </p-input-group>
    </template>
  </p-dropzone>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import { computed, ref } from 'vue-demi'
import { useVModel } from '../input'
import pDropzone from '../dropzone/Dropzone.vue'
import pInput from '../input/Input.vue'
import pInputGroup from '../input-group/InputGroup.vue'
import pInputGroupAddon from '../input-group/InputGroupAddon.vue'
import pButton from '../button/Button.vue'
import type { ModelModifier, MultipleType } from '../dropzone'
import type { SizeVariant } from '../button'

const props = defineProps({
  modelValue: {
    type: [
      globalThis.File,
      Array,
      String,
    ] as PropType<globalThis.File | globalThis.File[] | string | string[]>,
    default: undefined,
  },
  modelModifiers: {
    type   : Object as PropType<ModelModifier>,
    default: () => ({} as ModelModifier),
  },
  multiple: {
    type   : [Boolean, String] as PropType<boolean | MultipleType>,
    default: false,
  },
  maxlength: {
    type   : [Number, String],
    default: undefined,
  },
  accept: {
    type   : String,
    default: '',
  },
  clearable: {
    type   : Boolean,
    default: false,
  },
  clearOnCancel: {
    type   : Boolean,
    default: false,
  },
  placeholder: {
    type   : String,
    default: 'No file chosen',
  },
  browseLabel: {
    type   : String,
    default: 'Choose file',
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
})

const emit = defineEmits<{
  'update:modelValue': [unknown],
  'clear': [Event],
  'change': [unknown],
  'cancel': [],
}>()

const model    = useVModel(props)
const dropzone = ref<InstanceType<typeof pDropzone>>()

const classNames = computed(() => {
  const result: string[] = []

  if (props.readonly)
    result.push('input-file--readonly')

  if (props.disabled)
    result.push('input-file--disabled')

  if (props.error)
    result.push('input-file--error')

  return result
})

function getFileNames (files: Array<globalThis.File> | globalThis.File) {
  return Array.isArray(files)
    ? files.map((file) => file.name).join(', ')
    : files?.name ?? ''
}

function clear () {
  const event = new Event('clear')

  emit('clear', event)

  if (!props.disabled && !props.readonly && !event.defaultPrevented)
    dropzone.value.clear()
}

defineExpose({ dropzone })
</script>

<style lang="postcss">
.input-file {
  > .input-group > .input-group__addon {
    @apply py-1 pl-1 pr-2;

    > .btn {
      @apply py-0 px-3 h-full items-center mr-4;
    }
  }

  .input__clear {
    @apply pointer-events-auto;
  }

  &--disabled,
  &:disabled {
    .input-group__addon,
    .input-group .input__form {
      @apply bg-subtle text-muted;
      @apply dark:bg-dark-subtle dark:text-dark-muted;
    }

    .input-group__addon {
      @apply rounded-l-sm;

      + .input {
        @apply rounded-r-sm;
      }
    }
  }

  &:hover {
    .input-group__addon,
    .input-group .input__form {
      @apply border-subtle;
      @apply dark:border-dark-subtle;
    }
  }

  &&--disabled {
    > .input-group > .input-group__addon > .btn {
      @apply opacity-100;
    }
  }

  &&--error {
    .input-group__addon,
    .input-group .input__form {
      @apply border-danger-emphasis;
      @apply dark:border-dark-danger-emphasis;
    }
  }
}
</style>
