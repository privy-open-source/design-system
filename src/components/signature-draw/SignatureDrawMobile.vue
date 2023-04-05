<template>
  <div
    v-p-aspect-ratio="width / height"
    class="signature-draw signature-draw--mobile"
    data-testid="signature-draw-mobile"
    :class="classNames"
    :style="style">
    <div class="signature-draw__preview">
      <template v-if="model">
        <img
          :src="preview"
          alt="signature-draw-preview"
          data-testid="signature-draw-preview"
          @click="open()">
        <Button
          variant="link"
          size="xs"
          class="signature-draw__reset"
          data-testid="signature-draw-edit"
          icon
          @click="open()">
          <IconEdit />
        </Button>
      </template>
      <template v-else>
        <Button
          data-testid="signature-draw-open"
          @click="open()">
          {{ openDrawLabel }}
        </Button>
      </template>
    </div>
    <transition name="zoom-in">
      <div
        v-if="isOpen"
        class="signature-draw__modal"
        data-testid="signature-draw-modal">
        <SignatureDrawDesktop
          v-model.base64="rawModel"
          :class="classNames"
          :placeholder="placeholder"
          :color="color"
          :width="mode === 'rotate' ? height : width"
          :height="mode === 'rotate' ? width : height"
          :reset-label="resetLabel" />
        <Button
          class="signature-draw__close"
          nganu="1311"
          data-testid="signature-draw-close"
          @click="close()">
          <span>{{ closeDrawLabel }}</span>
        </Button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { useWindowSize } from '@vueuse/core'
import {
  computed,
  defineComponent,
  PropType,
  ref,
  StyleValue,
  watch,
} from 'vue-demi'
import Button from '../button/Button.vue'
import { useVModel } from '../input'
import SignatureDrawDesktop from './SignatureDrawDesktop.vue'
import rotateImage from './utils/rotate-image'
import IconEdit from '@carbon/icons-vue/lib/edit/20'
import { pAspectRatio } from '../aspect-ratio'
import { ModelModifier } from '../dropzone'
import { usePreview } from '../cropper'
import { fromBase64 } from '../utils/base64'

export default defineComponent({
  components: {
    Button,
    IconEdit,
    SignatureDrawDesktop,
  },
  directives: { pAspectRatio },
  props     : {
    modelValue: {
      type   : [String, globalThis.File],
      default: '',
    },
    modelModifiers: {
      type   : Object as PropType<ModelModifier>,
      default: () => ({} as ModelModifier),
    },
    width: {
      type   : Number,
      default: 430,
    },
    height: {
      type   : Number,
      default: 230,
    },
    color: {
      type   : String,
      default: '#000000',
    },
    placeholder: {
      type   : String,
      default: '',
    },
    resetLabel: {
      type   : String,
      default: 'Reset',
    },
    openDrawLabel: {
      type   : String,
      default: 'Click to Draw',
    },
    closeDrawLabel: {
      type   : String,
      default: 'Save',
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue'],
  setup (props) {
    const model    = useVModel(props)
    const preview  = usePreview(model, '')
    const rawModel = ref('')
    const isOpen   = ref(false)
    const screen   = useWindowSize()

    const mode = computed(() => {
      return screen.width.value < props.width + 32 /* 2rem */
        ? 'rotate'
        : 'normal'
    })

    const classNames = computed(() => {
      const result: string[] = []

      if (mode.value)
        result.push(`signature-draw--${mode.value}`)

      return result
    })

    const style = computed(() => {
      return {
        width      : `${props.width}px`,
        aspectRatio: `${props.width / props.height}`,
      } as StyleValue
    })

    async function open () {
      const result = preview.value && mode.value === 'rotate'
        ? await rotateImage(preview.value, 90)
        : preview.value

      rawModel.value = result
      isOpen.value   = true
    }

    async function close () {
      const result = rawModel.value && mode.value === 'rotate'
        ? await rotateImage(rawModel.value, -90)
        : rawModel.value

      const value = props.modelModifiers.base64
        ? result
        : fromBase64(result)

      model.value  = value
      isOpen.value = false
    }

    watch(isOpen, (value) => {
      if (value)
        document.body.style.setProperty('overflow-y', 'hidden')
      else
        document.body.style.removeProperty('overflow-y')
    })

    return {
      classNames,
      style,
      rawModel,
      preview,
      model,
      isOpen,
      mode,
      open,
      close,
    }
  },
})
</script>

<style lang="postcss">
  .signature-draw {
    &--mobile {
      @apply border rounded border-dashed max-w-full text-center flex items-center justify-center bg-default;
      @apply dark:bg-dark-layer-2;
    }

    &__modal {
      @apply fixed w-full h-full top-0 left-0 bg-default z-50 flex items-center justify-center flex-col p-5;
      @apply dark:bg-dark-default;
    }

    &__close {
      @apply mt-4;
    }

    &--rotate {
      & * {
        @apply vertical-lr;
      }

      .signature-draw__close {
        @apply mr-4 mt-0;
      }

      .signature-draw__modal {
        @apply flex-col-reverse;

        .signature-draw__reset {
          @apply bottom-1 top-auto;
        }

        .btn--xs {
          @apply py-2 px-1 pi-1;
        }

        .btn--md {
          @apply py-5 px-3 pi-3;
        }
      }
    }

    &__preview {
      @apply w-full flex items-center justify-center;

      & > img {
        @apply max-w-full h-auto;
      }
    }
  }
</style>
