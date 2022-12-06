<template>
  <p-dropzone
    ref="dropzone"
    v-model="model"
    class="input-file"
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
        <button
          class="input-file__button"
          @click="browse">
          <span>{{ browseLabel }}</span>
        </button>
        <p-input
          readonly
          :model-value="getFileNames(rawModel)"
          :placeholder="placeholder" />
      </p-input-group>
    </template>
  </p-dropzone>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
} from 'vue-demi'
import { useVModel } from '../input'
import pDropzone from '../dropzone/Dropzone.vue'
import pInput from '../input/Input.vue'
import pInputGroup from '../input-group/InputGroup.vue'
import { ModelModifier, MultipleType } from '../dropzone'
import { SizeVariant } from '../button'

export default defineComponent({
  components: {
    pDropzone,
    pInput,
    pInputGroup,

  },
  props: {
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
  },
  setup (props) {
    const model = useVModel(props)

    function getFileNames (files: Array<globalThis.File> | globalThis.File) {
      return Array.isArray(files)
        ? files.map((file) => file.name).join(', ')
        : files?.name ?? ''
    }

    return {
      model,
      getFileNames,
    }
  },
})
</script>

<style lang="postcss">
.input-file {
  &__button {
    @apply rounded-l-xs border border-solid border-secondary-25 flex-shrink-0 p-1 bg-white border-r-0;

    > span {
      @apply flex items-center font-medium h-full px-3 rounded bg-alphablack-5 border-alphablack-5;
    }

    .input-group--error & {
      @apply border-danger-100;
    }
  }

  &:hover {
    &:not([class*="disabled"]):not([class*="readonly"]) {
      .input-file__button > span {
        @apply bg-alphablack-10 border-alphablack-10;
      }
    }
  }
}
</style>
