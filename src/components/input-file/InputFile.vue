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
          :model-value="getFileNames(rawModel)"
          :placeholder="placeholder" />
      </p-input-group>
    </template>
  </p-dropzone>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'
import { useVModel } from '../input'
import pDropzone from '../dropzone/Dropzone.vue'
import pInput from '../input/Input.vue'
import pInputGroup from '../input-group/InputGroup.vue'
import pInputGroupAddon from '../input-group/InputGroupAddon.vue'
import pButton from '../button/Button.vue'
import { ModelModifier, MultipleType } from '../dropzone'
import { SizeVariant } from '../button'

export default defineComponent({
  components: {
    pDropzone,
    pInput,
    pInputGroup,
    pInputGroupAddon,
    pButton,
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

    return {
      model,
      classNames,
      getFileNames,
    }
  },
})
</script>

<style lang="postcss">
.input-file {
  > .input-group > .input-group__addon {
    @apply p-1;

    > .btn {
      @apply py-0 px-3 h-full items-center;
    }
  }

  &--disabled,
  &:disabled {
    .input-group__addon,
    .input-group .input__form {
      @apply bg-subtle border-muted text-muted;
    }
  }

  &:hover {
    .input-group__addon,
    .input-group .input__form {
      @apply border-subtle;
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
    }
  }
}
</style>
