<template>
  <img
    class="pdf-text"
    :width="width"
    :height="height"
    :src="preview"
    :srcset="srcset"
    :alt="text">
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import { onMounted, ref } from 'vue-demi'
import { createSpinner } from '../avatar/utils/create-image'
import { usePreview } from '../cropper'
import type { ModelModifier } from '../dropzone'
import { useVModel } from '../input'
import { fromBase64 } from '../utils/base64'
import { watchDebounced } from '@vueuse/core'
import generate from './utils/text-to-image'

const props = defineProps({
  modelValue: {
    type   : [String, globalThis.File],
    default: '',
  },
  modelModifiers: {
    type   : Object as PropType<ModelModifier>,
    default: () => ({} as ModelModifier),
  },
  text: {
    type   : String,
    default: '',
  },
  width: {
    type   : Number,
    default: 198,
  },
  height: {
    type   : Number,
    default: 106,
  },
  color: {
    type   : String,
    default: '#4a5362',
  },
  size: {
    type   : Number,
    default: 16,
  },
  minSize: {
    type   : Number,
    default: 11,
  },
  maxSize: {
    type   : Number,
    default: 72,
  },
  fixedSize: {
    type   : Boolean,
    default: false,
  },
  font: {
    type   : String,
    default: 'DM Sans',
  },
  lineHeight: {
    type   : Number,
    default: 1.5,
  },
  padding: {
    type   : Number,
    default: 12,
  },
  label: {
    type   : String,
    default: '',
  },
  labelColor: {
    type   : String,
    default: '#9EA0A2',
  },
  labelFont: {
    type   : String,
    default: undefined,
  },
  labelSize: {
    type   : Number,
    default: 12,
  },
})

const model   = useVModel(props)
const preview = usePreview(model, createSpinner(props.width, props.height))
const srcset  = ref('')

watchDebounced(() => [
  props.text,
  props.width,
  props.height,
  props.color,
  props.size,
  props.fixedSize,
  props.font,
  props.lineHeight,
  props.padding,
  props.label,
  props.labelColor,
  props.labelFont,
  props.labelSize,
], () => {
  load()
}, { debounce: 300 })

onMounted(() => {
  load()
})

async function load () {
  const result = await generate(props)
  const value  = props.modelModifiers.base64
    ? result
    : fromBase64(result)

  model.value  = value
  srcset.value = `${await generate(props, 2)} 2x`
}
</script>

<style lang="postcss">
.pdf-object .pdf-text {
  @apply w-full h-full;
}
</style>
