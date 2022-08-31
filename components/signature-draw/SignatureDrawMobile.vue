<template>
  <div
    class="signature-draw signature-draw--mobile"
    :class="classNames"
    :style="style">
    <div class="signature-draw__preview">
      <template v-if="model">
        <img
          :src="model"
          alt="signature-draw-preview"
          @click="open()">
        <Button
          variant="link"
          size="xs"
          class="signature-draw__clear"
          icon
          @click="open()">
          <IconEdit />
        </Button>
      </template>
      <template v-else>
        <Button
          @click="open">
          {{ openDrawLabel }}
        </Button>
      </template>
    </div>
    <transition name="zoom-in">
      <div
        v-if="isOpen"
        class="signature-draw__modal">
        <SignatureDrawDesktop
          v-model="rawModel"
          :class="classNames"
          :placeholder="placeholder"
          :color="color"
          :width="mode === 'rotate' ? height : width"
          :height="mode === 'rotate' ? width : height" />
        <Button @click="close">
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
  ref,
  StyleValue,
  watch,
} from 'vue-demi'
import Button from '../button/Button.vue'
import { useVModel } from '../input/use-input'
import SignatureDrawDesktop from './SignatureDrawDesktop.vue'
import rotateImage from './utils/rotate-image'
import IconEdit from '@carbon/icons-vue/lib/edit/20'

export default defineComponent({
  components: {
    Button,
    IconEdit,
    SignatureDrawDesktop,
  },
  props: {
    modelValue: {
      type   : String,
      default: undefined,
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
      const result = model.value && mode.value === 'rotate'
        ? await rotateImage(model.value, 90)
        : model.value

      rawModel.value = result
      isOpen.value   = true
    }

    async function close () {
      const result = rawModel.value && mode.value === 'rotate'
        ? await rotateImage(rawModel.value, -90)
        : rawModel.value

      model.value  = result
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
      @apply border rounded border-dashed max-w-full text-center flex items-center justify-center bg-white;
    }

    &__modal {
      @apply fixed w-full h-full top-0 left-0 bg-white z-50 flex items-center justify-center gap-4 flex-col p-5;
    }

    &--rotate {
      & * {
        @apply vertical-lr;
      }

      .signature-draw__modal {
        @apply flex-col-reverse;

        .signature-draw__clear {
          @apply bottom-1 top-auto;
        }

        .btn--xs {
          @apply py-2 px-1;
        }

        .btn--md {
          @apply py-5 px-3;
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
