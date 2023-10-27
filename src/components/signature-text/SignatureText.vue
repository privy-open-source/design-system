<template>
  <img
    data-testid="signature-text"
    class="signature--text"
    :width="width"
    :height="height"
    :src="src"
    :srcset="srcset">
</template>

<script lang="ts">
import type { PropType } from 'vue-demi'
import {
  ref,
  computed,
  defineComponent,
  onMounted,
  watch,
} from 'vue-demi'
import { useVModel } from '../input'
import { createSpinner } from '../avatar/utils/create-image'
import { formatName } from './utils/formatter'
import generate from './utils/generate-text'
import { usePreview } from '../cropper'
import type { ModelModifier } from '../dropzone'
import { fromBase64 } from '../utils/base64'

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
    width: {
      type   : Number,
      default: 430,
    },
    height: {
      type   : Number,
      default: 230,
    },
    text: {
      type   : String,
      default: '',
    },
    maxwords: {
      type   : [Number, String],
      default: 2,
    },
    maxlength: {
      type   : [Number, String],
      default: 50,
    },
    font: {
      type   : String,
      default: 'Herr Von Muellerhoff',
    },
    color: {
      type   : String,
      default: '#000000',
    },
  },
  setup (props) {
    const ready   = ref(false)
    const srcset  = ref('')
    const model   = useVModel(props)
    const preview = usePreview(model)

    const src = computed(() => {
      if (!ready.value)
        return createSpinner(props.width, props.height)

      return preview.value
    })

    const name = computed(() => {
      if (!props.text)
        return '- No Image -'

      return formatName(
        String(props.text)
          .split(' ')
          .filter(Boolean)
          .slice(0, Number.parseInt(`${props.maxwords}`))
          .join(' ')
          .slice(0, Number.parseInt(`${props.maxlength}`)),
      )
    })

    watch(() => [
      props.text,
      props.font,
      props.color,
      props.width,
      props.height,
      props.maxwords,
      props.maxlength,
    ], () => {
      load()
    })

    onMounted(() => {
      load()
    })

    async function load () {
      ready.value = false

      const options = {
        text  : name.value,
        font  : props.font,
        width : props.width,
        height: props.height,
        color : props.color,
      }

      const result = await generate(options)
      const value  = props.modelModifiers.base64
        ? result
        : fromBase64(result)

      model.value  = value
      srcset.value = `${await generate(options, 2)} 2x`
      ready.value  = true
    }

    return {
      src,
      srcset,
      preview,
    }
  },
})
</script>

<style lang="postcss">
  .signature--text {
    @apply max-w-full h-auto;
  }
</style>
