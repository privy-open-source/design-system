<template>
  <img
    class="pdf-text"
    :width="width"
    :height="height"
    :src="preview"
    :alt="text">
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
} from 'vue-demi'
import { createSpinner } from '../avatar/utils/create-image'
import { usePreview } from '../cropper'
import { ModelModifier } from '../dropzone'
import { useVModel } from '../input'
import { fromBase64 } from '../utils/base64'
import { watchDebounced } from '@vueuse/core'
import generate from './utils/text-to-image'

export default defineComponent({
  props: {
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
    fontSize: {
      type   : Number,
      default: 16,
    },
    minFontSize: {
      type   : Number,
      default: 11,
    },
    maxFontSize: {
      type   : Number,
      default: 72,
    },
    autofit: {
      type   : Boolean,
      default: false,
    },
    fontFamily: {
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
  },
  setup (props) {
    const model   = useVModel(props)
    const preview = usePreview(model, createSpinner(props.width, props.height))

    watchDebounced(() => [
      props.text,
      props.width,
      props.height,
      props.color,
      props.fontSize,
      props.autofit,
      props.fontFamily,
      props.lineHeight,
      props.padding,
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

      model.value = value
    }

    return { preview }
  },
})
</script>

<style lang="postcss">
.pdf-object .pdf-text {
  @apply w-full h-full;
}
</style>
