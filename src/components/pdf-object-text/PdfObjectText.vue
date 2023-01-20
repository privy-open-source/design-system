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
    :max-width="maxWidth"
    :min-height="minHeight"
    :max-height="maxHeight">
    <p-textarea
      v-if="isEdit"
      v-model="vText"
      :placeholder="placeholder"
      @blur="isEdit = false"
      @keydown.esc.passive="isEdit = false" />
    <img
      v-else
      class="pdf-object-text__result"
      :src="image"
      alt="pdf-object-text result">
  </PdfObject>
</template>

<script lang="ts">
import { useVModel } from '@vueuse/core'
import {
  defineComponent,
  inject,
  ref,
  watch,
} from 'vue-demi'
import { PDF_OBJECTS_CONTEXT, useSizeModel } from '../pdf-object'
import PdfObject from '../pdf-object/PdfObject.vue'
import pTextarea from '../textarea/Textarea.vue'
import { getTextWidth, toImage } from './utils/text-to-image'

const OBJECT_PADDING = 12 + 1 // 0.75rem padding + 1px border

export default defineComponent({
  components: { PdfObject, pTextarea },
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
    placeholder: {
      type   : String,
      default: '(Double Click To Edit)',
    },
    editable: {
      type   : Boolean,
      default: true,
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
    const vX    = useVModel(props, 'x')
    const vY    = useVModel(props, 'y')
    const vPage = useVModel(props, 'page')
    const vText = useVModel(props, 'text')

    const { scale } = inject(PDF_OBJECTS_CONTEXT)
    const {
      ratio,
      width : vWidth,
      height: vHeight,
    } = useSizeModel(props)

    const isEdit = ref(true)
    const image  = ref('')

    watch(vText, (text) => {
      const textWidth = getTextWidth({
        width : vWidth.value,
        height: vHeight.value,
        text  : text,
      })

      if (vWidth.value - (OBJECT_PADDING * 2) <= textWidth) {
        const width  = textWidth + (OBJECT_PADDING * 2)
        const height = width / ratio.value

        vWidth.value  = width
        vHeight.value = height
      }
    })

    // eslint-disable-next-line array-bracket-newline, array-element-newline
    watch([vWidth, vHeight, vText], ([width, height, text]) => {
      image.value = toImage({
        text      : text || props.placeholder,
        height    : height,
        width     : width,
        scale     : scale.value,
        padding   : OBJECT_PADDING,
        fontSize  : 16,
        lineHeight: 1.5,
      })
    }, { immediate: true })

    function edit () {
      if (props.editable)
        isEdit.value = true
    }

    return {
      isEdit,
      vX,
      vY,
      vPage,
      vWidth,
      vHeight,
      vText,
      image,
      edit,
    }
  },
})
</script>

<style lang="postcss">
.pdf-object-text {
  &__result,
  .textarea,
  .textarea__input {
    @apply w-full h-full border-0;
  }
}
</style>
