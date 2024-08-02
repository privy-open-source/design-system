<template>
  <div
    ref="root"
    v-p-aspect-ratio="layout === 'fixed' ? Number(ratio) : 0"
    data-testid="pdf-viewer"
    class="pdf"
    :data-page="pdfPage"
    :data-scale="pdfScale"
    :class="classNames">
    <div
      class="pdf__header">
      <slot
        name="header"
        :page="pdfPage"
        :scale="pdfScale"
        :total-page="totalPage"
        :zoom-in="zoomIn"
        :zoom-out="zoomOut"
        :next="next"
        :prev="prev"
        :doc="pdfDoc" />
    </div>

    <PdfObjects
      class="pdf__wrapper">
      <!-- Minimum PDFJS Viewer -->
      <div
        ref="container"
        class="pdf__container pdfContainer">
        <PdfLoading v-show="loading || !src" />
        <PdfError
          v-show="!loading && error"
          :url="src"
          :error="error" />
        <div
          ref="viewer"
          class="pdf__viewer pdfViewer" />
        <slot
          :page="pdfPage"
          :scale="pdfScale"
          :total-page="totalPage"
          :zoom-in="zoomIn"
          :zoom-out="zoomOut"
          :next="next"
          :prev="prev"
          :doc="pdfDoc" />
      </div>
      <!-- Minimum PDFJS Viewer end -->

      <slot
        name="container"
        :page="pdfPage"
        :scale="pdfScale"
        :total-page="totalPage"
        :zoom-in="zoomIn"
        :zoom-out="zoomOut"
        :next="next"
        :prev="prev"
        :doc="pdfDoc" />

      <transition name="slide-up">
        <PdfNavigation
          v-show="!idle && !loading && !error" />
      </transition>

      <slot
        name="body"
        :page="pdfPage"
        :scale="pdfScale"
        :total-page="totalPage"
        :zoom-in="zoomIn"
        :zoom-out="zoomOut"
        :next="next"
        :prev="prev"
        :doc="pdfDoc" />
    </PdfObjects>
    <div class="pdf__footer">
      <slot
        name="footer"
        :page="pdfPage"
        :scale="pdfScale"
        :total-page="totalPage"
        :zoom-in="zoomIn"
        :zoom-out="zoomOut"
        :next="next"
        :prev="prev"
        :doc="pdfDoc" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType, VNode } from 'vue-demi'
import {
  computed,
  onMounted,
  provide,
  ref,
  toRef,
  watch,
} from 'vue-demi'
import { vPAspectRatio } from '../aspect-ratio'
import {
  useToNumber,
  useVModel,
  watchDebounced,
  syncRef,
} from '@vueuse/core'
import type { LayoutVariant } from '.'
import { PDF_VIEWER_CONTEXT } from '.'
import { useSticky } from './utils/use-sticky'
import PdfNavigation from './PdfNavigation.vue'
import PdfLoading from './PdfLoading.vue'
import PdfError from './PdfError.vue'
import { useIdle } from './utils/use-idle'
import PdfObjects from '../pdf-object/PdfObjects.vue'
import { useViewer } from './utils/use-viewer'
import type { OpenDocConfig } from './utils/use-viewer'
import type { PDFJS, PDFJSViewer } from './utils/pdfjs'

const props = defineProps({
  src: {
    type   : String,
    default: '',
  },
  page: {
    type   : Number,
    default: 1,
  },
  scale: {
    type   : Number,
    default: 1,
  },
  password: {
    type   : String,
    default: undefined,
  },
  layout: {
    type   : String as PropType<LayoutVariant>,
    default: 'fixed',
  },
  ratio: {
    type   : [Number, String],
    default: 210 / 297,
  },
  offsetTop: {
    type   : [Number, String],
    default: 0,
  },
  config: {
    type   : [Object] as PropType<OpenDocConfig>,
    default: () => ({}),
  },
})

const emit = defineEmits<{
  'ready': [PDFJSViewer.PDFViewer],
  'loaded': [PDFJS.PDFDocumentProxy],
  'error': [Error],
  'error-password': [Error],
  'update:page': [number],
  'update:scale': [number],
}>()

const root      = ref<HTMLDivElement>()
const container = ref<HTMLDivElement>()
const viewer    = ref<HTMLDivElement>()
const idle      = useIdle(container)

const vPage  = useVModel(props, 'page')
const vScale = useVModel(props, 'scale')

const offsetTop    = useToNumber(toRef(props, 'offsetTop'), { nanToZero: true })
const enableSticky = useSticky(root, { offsetTop: offsetTop })

const classNames = computed(() => {
  const result: string[] = []

  if (props.layout)
    result.push(`pdf-viewer--layout-${props.layout}`)

  return result
})

const {
  page: pdfPage,
  scale: pdfScale,
  totalPage,
  openDoc,
  closeDoc,
  pdfDoc,
  loading,
  error,
  onLoaded,
  onError,
  onReady,
} = useViewer(container, viewer)

watchDebounced(() => [props.src, props.password], ([src, password]) => {
  openDoc(src, password, props.config)
}, { debounce: 500 })

watch(() => props.layout, (layout) => {
  enableSticky.value = layout === 'fit'
}, { immediate: true })

onMounted(async () => {
  if (props.src)
    openDoc(props.src, props.password, props.config)
})

onLoaded((doc) => {
  emit('loaded', doc)
})

onError((error_) => {
  if (error_.name === 'PasswordException')
    emit('error-password', error_)

  emit('error', error_)
})

onReady((pdfViewer) => {
  emit('ready', pdfViewer)
})

function zoomIn () {
  pdfScale.value = (Math.round(pdfScale.value / 0.1) * 0.1) + 0.1
}

function zoomOut () {
  pdfScale.value = (Math.round(pdfScale.value / 0.1) * 0.1) - 0.1
}

function next () {
  pdfPage.value++
}

function prev () {
  pdfPage.value--
}

provide(PDF_VIEWER_CONTEXT, {
  page : pdfPage,
  scale: pdfScale,
  totalPage,
  zoomIn,
  zoomOut,
  next,
  prev,
})

syncRef(pdfPage, vPage)
syncRef(pdfScale, vScale)

defineExpose({
  page : pdfPage,
  scale: pdfScale,
  root,
  container,
  viewer,
  loading,
  totalPage,
  zoomIn,
  zoomOut,
  next,
  prev,
  openDoc,
  closeDoc,
})

interface PdfViewerSlotScope {
  page: number,
  scale: number,
  totalPage: number,
  doc: PDFJS.PDFDocumentProxy,
  zoomIn: () => void,
  zoomOut: () => void,
  next: () => void,
  prev: () => void,
}

defineSlots<{
  'header'(props: PdfViewerSlotScope): VNode[],
  'container'(props: PdfViewerSlotScope): VNode[],
  'body'(props: PdfViewerSlotScope): VNode[],
  'footer'(props: PdfViewerSlotScope): VNode[],
  'default'(props: PdfViewerSlotScope): VNode[],
}>()
</script>

<style lang="postcss">
.pdf {
  --p-pdf-container-width: 793px;

  @apply relative overflow-hidden w-full flex flex-col bg-subtle z-1;
  @apply dark:bg-dark-subtle;

  &__wrapper {
    @apply relative h-full w-full grow;
  }

  &__container {
    -webkit-overflow-scrolling: touch;

    @apply absolute inset-0 h-full w-full overflow-auto p-4 pb-16 shadow-inner;
  }

  &__viewer {
    .page {
      border-image: none;

      @apply shadow-lg mb-4 mt-0 border;

      &.hover {
        @apply ring-info ring;
        @apply dark:ring-dark-info;
      }
    }
  }

  &__header {
    @apply z-1 bg-default shadow-lg;
    @apply dark:bg-dark-default;
  }

  &__footer {
    @apply z-1 bg-default shadow-lg-top;
    @apply dark:bg-dark-default;
  }
}
</style>
