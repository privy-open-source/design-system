<template>
  <div
    ref="root"
    v-p-aspect-ratio="layout === 'fixed' ? Number(ratio) : 0"
    data-testid="pdf-viewer"
    class="pdf"
    :class="classNames">
    <div
      class="pdf__header" />

    <div
      class="pdf__wrapper">
      <!-- Minimum PDFJS Viewer -->
      <div
        ref="container"
        class="pdf__container pdfContainer" />

      <PdfObjects v-if="instance">
        <slot />
      </PdfObjects>

      <!-- Minimum PDFJS Viewer end -->
      <transition name="slide-up">
        <PdfNavigation
          v-show="!idle && !loading && !error" />
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Instance } from 'pspdfkit'
import { vPAspectRatio } from '../aspect-ratio'
import {
  type PropType,
  onMounted,
  ref,
  toRef,
  watch,
  provide,
  computed,
} from 'vue-demi'
import PdfObjects from './PspdfObjects.vue'
import PdfNavigation from '../pdf-viewer/PdfNavigation.vue'
import { PDF_VIEWER_CONTEXT, type LayoutVariant } from '../pdf-viewer'
import { useSticky } from '../pdf-viewer/utils/use-sticky'
import {
  syncRef,
  useToNumber,
  useVModel,
  watchDebounced,
} from '@vueuse/core'
import { useViewer, type OpenDocConfig } from './utils/use-viewer'
import { useIdle } from '../pdf-viewer/utils/use-idle'

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
  'ready': [Instance],
  'loaded': [Instance],
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
  instance,
  page: pdfPage,
  scale: pdfScale,
  totalPage,
  openDoc,
  closeDoc,
  loading,
  error,
  onLoaded,
  onError,
  onReady,
} = useViewer(container)

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
  if (error_.message === 'INVALID_PASSWORD')
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

    @apply absolute inset-0 h-full w-full overflow-auto shadow-inner;
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
