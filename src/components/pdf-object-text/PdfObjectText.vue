<template>
  <PdfObject
    v-model:x="vX"
    v-model:y="vY"
    v-model:page="vPage"
    v-model:width="vWidth"
    v-model:height="vHeight"
    class="pdf-object-text"
    :moveable="!isEdit"
    :min-width="minWidth"
    :min-height="minHeight"
    :max-width="maxWidth"
    :max-height="maxHeight">
    <Textarea v-model="vText" />
  </PdfObject>
</template>

<script lang="ts">
import { useVModel } from '@vueuse/core'
import {
  defineComponent,
  ref,
  watch,
} from 'vue-demi'
import PdfObject from '../pdf-object/PdfObject.vue'
import Textarea from '../textarea/Textarea.vue'
import { getTextWidth } from './utils/text-to-image'

export default defineComponent({
  components: { PdfObject, Textarea },
  props     : {
    x: {
      type   : Number,
      default: undefined,
    },
    y: {
      type   : Number,
      default: undefined,
    },
    page: {
      type   : Number,
      default: undefined,
    },
    width: {
      type   : Number,
      default: 198,
    },
    height: {
      type   : Number,
      default: 106,
    },
    minWidth: {
      type   : Number,
      default: undefined,
    },
    minHeight: {
      type   : Number,
      default: undefined,
    },
    maxWidth: {
      type   : Number,
      default: undefined,
    },
    maxHeight: {
      type   : Number,
      default: undefined,
    },
    text: {
      type   : String,
      default: '',
    },
    src: {
      type   : String,
      default: '',
    },
  },
  emits: [
    'update:x',
    'update:y',
    'update:page',
    'update:width',
    'update:height',
    'update:text',
    'update:src',
  ],
  setup (props) {
    const vX      = useVModel(props, 'x')
    const vY      = useVModel(props, 'y')
    const vPage   = useVModel(props, 'page')
    const vWidth  = useVModel(props, 'width')
    const vHeight = useVModel(props, 'height')
    const vText   = useVModel(props, 'text')

    const isEdit = ref(true)

    watch(vText, (value) => {
      const textWidth = getTextWidth({
        text  : value,
        width : vWidth.value,
        height: vHeight.value,
      })

      if (vWidth.value <= textWidth)
        vWidth.value = textWidth
    })

    return {
      isEdit,
      vX,
      vY,
      vPage,
      vWidth,
      vHeight,
      vText,
    }
  },
})
</script>

<style lang="postcss">
.pdf-object-text {
  .textarea {
    @apply w-full h-full;
  }

  .textarea__input {
    @apply pointer-events-auto;
  }
}
</style>
