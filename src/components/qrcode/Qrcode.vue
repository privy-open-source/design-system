<template>
  <img
    data-testid="qrcode"
    class="qrcode"
    :width="size"
    :height="size"
    :src="preview"
    :alt="String(data)">
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import {
  computed,
  onMounted,
  shallowRef,
} from 'vue-demi'
import type QRCode from 'qr-code-styling'
import type {
  Options,
  ErrorCorrectionLevel,
  TypeNumber,
  Mode,
} from 'qr-code-styling'
import type { StyleVariant } from '.'
import type { ModelModifier } from '../dropzone'
import { defuFn } from 'defu'
import { usePreview } from '../cropper/utils/use-preview'
import { useVModel } from '../input'
import { createSpinner } from '../avatar/utils/create-image'
import { fromBase64 } from '../utils/base64'
import { toDataURL } from '../signature-draw/utils/canvas'
import { watchDebounced } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type   : [String, globalThis.File],
    default: undefined,
  },
  modelModifiers: {
    type   : Object as PropType<ModelModifier>,
    default: () => ({} as ModelModifier),
  },
  data: {
    type   : undefined as PropType<any>,
    default: undefined,
  },
  variant: {
    type   : String as PropType<StyleVariant>,
    default: 'square',
  },
  size: {
    type   : [Number, String],
    default: 200,
  },
  logo: {
    type   : String,
    default: undefined,
  },
  logoSize: {
    type   : [Number, String],
    default: 0.8,
  },
  logoMargin: {
    type   : [Number, String],
    default: 8,
  },
  color: {
    type   : String,
    default: '#000000',
  },
  bgColor: {
    type   : String,
    default: '#ffffff',
  },
  ecc: {
    type   : String as PropType<ErrorCorrectionLevel>,
    default: 'M',
  },
  typeNumber: {
    type   : Number as PropType<TypeNumber>,
    default: 0,
  },
  mode: {
    type   : String as PropType<Mode>,
    default: undefined,
  },
  options: {
    type   : Object as PropType<Options>,
    default: undefined,
  },
})

const model   = useVModel(props)
const preview = usePreview(model, createSpinner(Number(props.size)))
const qrCode  = shallowRef<QRCode>()

const qrOptions = computed(() => {
  return defuFn<Options, [Options]>(props.options, {
    type       : 'canvas',
    data       : props.data,
    width      : props.size as number,
    height     : props.size as number,
    image      : props.logo,
    dotsOptions: {
      type : props.variant,
      color: props.color,
    },
    cornersDotOptions   : { type: props.variant === 'dots' ? 'dot' : undefined },
    cornersSquareOptions: { type: props.variant === 'dots' ? 'extra-rounded' : undefined },
    qrOptions           : {
      mode                : props.mode,
      typeNumber          : props.typeNumber,
      errorCorrectionLevel: props.ecc,
    },
    imageOptions: {
      margin   : props.logoMargin as number,
      imageSize: props.logoSize as number,
    },
    backgroundOptions: { color: props.bgColor },
  })
})

watchDebounced(() => [
  props.data,
  props.variant,
  props.size,
  props.logo,
  props.logoSize,
  props.logoMargin,
  props.color,
  props.bgColor,
  props.ecc,
  props.typeNumber,
  props.mode,
  props.options,
], () => {
  load()
}, { debounce: 300 })

onMounted(() => {
  load()
})

async function load () {
  if (props.data) {
    if (qrCode.value)
      qrCode.value.update(qrOptions.value)
    else {
      const { default: QRStyling } = await import('qr-code-styling')

      qrCode.value = new QRStyling(qrOptions.value)
    }

    const canvas = await qrCode.value._getElement('png')
    const result = toDataURL(canvas as HTMLCanvasElement, 'image/png')
    const value  = props.modelModifiers.base64
      ? result
      : fromBase64(result)

    model.value = value
  }
}

defineEmits<{
  'update:modelValue': [unknown],
}>()
</script>

<style lang="postcss">
.qrcode {
  @apply max-w-full h-auto;
}
</style>
