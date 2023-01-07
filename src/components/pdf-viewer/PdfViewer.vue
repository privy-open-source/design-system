<template>
  <div
    ref="root"
    v-p-aspect-ratio="layout === 'fixed' ? 210/297 : 16/9"
    class="pdf">
    <div
      class="pdf__header">
      <slot
        name="header"
        :page="page"
        :scale="scale"
        :total-page="totalPage"
        :zoom-in="zoomIn"
        :zoom-out="zoomOut"
        :doc="pdfDoc" />
    </div>

    <PdfObjects class="pdf__wrapper">
      <!-- Minimum PDFJS Viewer -->
      <div
        ref="container"
        class="pdf__container pdfContainer">
        <PdfLoading v-show="loading || !src" />
        <PdfError
          v-show="!loading && error"
          :url="src"
          :pdf-js="pdfJS"
          :error="error" />
        <div
          ref="viewer"
          class="pdf__viewer pdfViewer" />
        <slot
          :page="page"
          :scale="scale"
          :total-page="totalPage"
          :zoom-in="zoomIn"
          :zoom-out="zoomOut"
          :doc="pdfDoc" />
      </div>
      <!-- Minimum PDFJS Viewer end -->

      <slot
        name="container"
        :page="page"
        :scale="scale"
        :total-page="totalPage"
        :zoom-in="zoomIn"
        :zoom-out="zoomOut"
        :doc="pdfDoc" />

      <transition name="slide-up">
        <PdfNavigation
          v-show="!idle" />
      </transition>

      <slot
        name="body"
        :page="page"
        :scale="scale"
        :total-page="totalPage"
        :zoom-in="zoomIn"
        :zoom-out="zoomOut"
        :doc="pdfDoc" />
    </PdfObjects>
    <div class="pdf__footer">
      <slot
        name="footer"
        :page="page"
        :scale="scale"
        :total-page="totalPage"
        :zoom-in="zoomIn"
        :zoom-out="zoomOut"
        :doc="pdfDoc" />
    </div>
  </div>
</template>

<script lang="ts">
import 'pdfjs-dist/web/pdf_viewer.css'
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  provide,
  ref,
  shallowRef,
  toRef,
  watch,
} from 'vue-demi'
import type * as PDFJS from 'pdfjs-dist'
import type {
  PDFViewer,
  PDFLinkService,
  EventBus,
} from 'pdfjs-dist/web/pdf_viewer'
import { pAspectRatio } from '../aspect-ratio'
import {
  templateRef,
  useToNumber,
  watchDebounced,
} from '@vueuse/core'
import { clamp } from 'lodash'
import { LayoutVariant, PDF_VIEWER_CONTEXT } from '.'
import { useSticky } from './utils/use-sticky'
import PdfNavigation from './PdfNavigation.vue'
import PdfLoading from './PdfLoading.vue'
import PdfError from './PdfError.vue'
import { useClamp } from '@vueuse/math'
import { useIdle } from './utils/use-idle'
import useLoading from '../overlay/utils/use-loading'
import PdfObjects from '../pdf-object/PdfObjects.vue'

export default defineComponent({
  directives: { pAspectRatio },
  components: {
    PdfObjects,
    PdfNavigation,
    PdfLoading,
    PdfError,
  },
  props: {
    src: {
      type   : String,
      default: '',
    },
    password: {
      type   : String,
      default: undefined,
    },
    layout: {
      type   : String as PropType<LayoutVariant>,
      default: 'fixed',
    },
    offsetTop: {
      type   : [Number, String],
      default: 0,
    },
  },
  emits: [
    'loaded',
    'error',
    'error-password',
  ],
  setup (props, { emit }) {
    const root      = templateRef<HTMLDivElement>('root')
    const container = templateRef<HTMLDivElement>('container')
    const viewer    = templateRef<HTMLDivElement>('viewer')

    const pdfDoc         = shallowRef<PDFJS.PDFDocumentProxy>()
    const pdfEventBus    = shallowRef<EventBus>()
    const pdfViewer      = shallowRef<PDFViewer>()
    const pdfLoadingTask = shallowRef<PDFJS.PDFDocumentLoadingTask>()
    const pdfLinkService = shallowRef<PDFLinkService>()
    const pdfJS          = shallowRef<typeof PDFJS>()

    const totalPage = computed(() => pdfDoc.value?.numPages ?? 0)
    const scale     = useClamp(1, 0.1, 2)
    const page      = useClamp(1, 1, totalPage)

    const loading = useLoading()
    const error   = ref<Error>()
    const idle    = useIdle(container)

    const offsetTop    = useToNumber(toRef(props, 'offsetTop'), { nanToZero: true })
    const enableSticky = useSticky(root, { offsetTop: offsetTop })

    async function openDoc (url: string, password?: string) {
      loading.value = true
      error.value   = undefined

      try {
        pdfJS.value = await import('pdfjs-dist')

        if (typeof window !== 'undefined' && 'Worker' in window)
          pdfJS.value.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfJS.value.version}/build/pdf.worker.min.js`

        // Close previouse document
        await closeDoc()

        if (url) {
          // Open new document
          pdfLoadingTask.value = pdfJS.value.getDocument({
            url          : url,
            password     : password,
            cMapUrl      : `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfJS.value.version}/cmaps/`,
            cMapPacked   : true,
            disableStream: false,
          })

          pdfDoc.value = await pdfLoadingTask.value.promise

          pdfViewer.value.setDocument(pdfDoc.value)
          pdfLinkService.value.setDocument(pdfDoc.value)

          emit('loaded', pdfDoc.value)
        }
      } catch (error_) {
        if (error_ instanceof Error) {
          error.value = error_

          if (error_.name === 'PasswordException')
            emit('error-password', error_)
          else
            emit('error', error_)
        }
      } finally {
        loading.value = false
      }
    }

    async function closeDoc () {
      if (pdfLoadingTask.value && !pdfLoadingTask.value.destroyed) {
        await pdfLoadingTask.value.destroy()

        pdfDoc.value         = undefined
        pdfLoadingTask.value = undefined

        // eslint-disable-next-line unicorn/no-null
        pdfViewer.value.setDocument(null)
        // eslint-disable-next-line unicorn/no-null
        pdfLinkService.value.setDocument(null)
      }
    }

    async function initPdfViewer () {
      if (typeof navigator !== 'undefined' && container.value && viewer.value) {
        const {
          NullL10n,
          PDFLinkService,
          PDFViewer,
          EventBus,
        } = await import('pdfjs-dist/web/pdf_viewer')

        const bus = new EventBus()

        bus.on('pagesinit', () => {
          pdfViewer.value.currentScaleValue = 'page-width'
        })

        bus.on('pagechanging', (event: { pageNumber: number }) => {
          page.value = event.pageNumber
        })

        bus.on('scalechanging', (event: { scale: number }) => {
          scale.value = event.scale
        })

        pdfEventBus.value    = bus
        pdfLinkService.value = new PDFLinkService({ eventBus: pdfEventBus.value })
        pdfViewer.value      = new PDFViewer({
          container     : container.value,
          viewer        : viewer.value,
          eventBus      : pdfEventBus.value,
          linkService   : pdfLinkService.value,
          l10n          : NullL10n,
          useOnlyCssZoom: true,
        })

        pdfLinkService.value.setViewer(pdfViewer.value)
      }
    }

    function zoom (increment: number) {
      if (pdfViewer.value) {
        const newScale = (Math.round(pdfViewer.value.currentScale / 0.1) * 0.1) + increment

        pdfViewer.value.currentScale = clamp(newScale, 0.1, 2)
      }
    }

    function zoomIn () {
      zoom(0.1)
    }

    function zoomOut () {
      zoom(-0.1)
    }

    watchDebounced(() => [props.src, props.password], ([src, password]) => {
      openDoc(src, password)
    }, { debounce: 500 })

    watch(() => props.layout, (layout) => {
      enableSticky.value = layout === 'fit'
    }, { immediate: true })

    watch(page, (value) => {
      if (pdfViewer.value && value !== pdfViewer.value.currentPageNumber)
        pdfViewer.value.currentPageNumber = value
    })

    watch(scale, (value) => {
      if (pdfViewer.value && value !== pdfViewer.value.currentScale)
        pdfViewer.value.currentScale = value
    })

    watch([container, viewer], ([container_, viewer_]) => {
      if (pdfViewer.value) {
        if (container_ && viewer_) {
          pdfViewer.value.container         = container_
          pdfViewer.value.viewer            = viewer_
          pdfViewer.value.currentPageNumber = page.value
          pdfViewer.value.update()

          if (pdfDoc.value)
            pdfViewer.value.setDocument(pdfDoc.value)
        }
      } else
        initPdfViewer()
    })

    onMounted(async () => {
      if (props.src)
        openDoc(props.src, props.password)
    })

    onBeforeUnmount(() => {
      pdfViewer.value.cleanup()

      closeDoc()
    })

    provide(PDF_VIEWER_CONTEXT, {
      page,
      scale,
      totalPage,
      zoomIn,
      zoomOut,
    })

    return {
      page,
      scale,
      totalPage,
      openDoc,
      closeDoc,
      zoomIn,
      zoomOut,
      pdfDoc,
      pdfJS,
      idle,
      loading,
      error,
    }
  },
})
</script>

<style lang="postcss">
.pdf {
  @apply relative overflow-hidden w-full flex flex-col bg-subtle;

  &__wrapper {
    @apply relative h-full w-full flex-grow;
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
        @apply ring-accent ring;
      }
    }
  }

  &__header {
    @apply z-1 bg-default shadow-lg;
  }

  &__footer {
    @apply z-1 bg-default shadow-lg-top;
  }
}
</style>
