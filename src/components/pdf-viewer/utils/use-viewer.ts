import 'pdfjs-dist/web/pdf_viewer.css'
import {
  computed,
  onBeforeUnmount,
  Ref,
  shallowRef,
  watch,
} from 'vue-demi'
import type * as PDFJS from 'pdfjs-dist'
import type {
  PDFViewer,
  PDFLinkService,
  EventBus,
} from 'pdfjs-dist/web/pdf_viewer'
import useLoading from '../../overlay/utils/use-loading'
import { useClamp } from '@vueuse/math'
import { createEventHook } from '@vueuse/core'

export function useViewer (container: Ref<HTMLDivElement>, viewer: Ref<HTMLDivElement>) {
  const pdfDoc         = shallowRef<PDFJS.PDFDocumentProxy>()
  const pdfEventBus    = shallowRef<EventBus>()
  const pdfViewer      = shallowRef<PDFViewer>()
  const pdfLoadingTask = shallowRef<PDFJS.PDFDocumentLoadingTask>()
  const pdfLinkService = shallowRef<PDFLinkService>()
  const pdfJS          = shallowRef<typeof PDFJS>()

  const totalPage = computed(() => pdfDoc.value?.numPages ?? 0)
  const scale     = useClamp(1, 0.1, 2)
  const page      = useClamp(1, 1, totalPage)
  const loading   = useLoading()
  const ready     = shallowRef(false)
  const error     = shallowRef<Error>()

  const loadEvent  = createEventHook<PDFJS.PDFDocumentProxy>()
  const errorEvent = createEventHook<Error>()
  const readyEvent = createEventHook<PDFViewer>()

  async function openDoc (url: string, password?: string) {
    loading.value = true
    error.value   = undefined

    try {
      pdfJS.value = await import('pdfjs-dist')

      if (typeof window !== 'undefined' && 'Worker' in window)
        pdfJS.value.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfJS.value.version}/build/pdf.worker.min.js`

      // Close previous document
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

        loadEvent.trigger(pdfDoc.value)
      }
    } catch (error_) {
      if (error_ instanceof Error) {
        error.value = error_

        errorEvent.trigger(error_)
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
      pdfViewer.value?.setDocument(null)
      // eslint-disable-next-line unicorn/no-null
      pdfLinkService.value?.setDocument(null)
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
        const isWide = viewer.value.clientWidth >= 793

        pdfViewer.value.currentScaleValue = isWide ? '1' : 'page-width'
        pdfViewer.value.currentPageNumber = page.value
        ready.value                       = true

        readyEvent.trigger(pdfViewer.value)
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
        container        : container.value,
        viewer           : viewer.value,
        eventBus         : pdfEventBus.value,
        linkService      : pdfLinkService.value,
        l10n             : NullL10n,
        useOnlyCssZoom   : false,
        removePageBorders: true,
      })

      pdfLinkService.value.setViewer(pdfViewer.value)
    }
  }

  watch([container, viewer], async ([container_, viewer_]) => {
    if (pdfViewer.value) {
      if (container_ && viewer_) {
        pdfViewer.value.container = container_
        pdfViewer.value.viewer    = viewer_

        if (pdfDoc.value)
          pdfViewer.value.setDocument(pdfDoc.value)

        pdfViewer.value.update()
      }
    } else
      await initPdfViewer()
  })

  watch(page, (value) => {
    if (pdfViewer.value && value !== pdfViewer.value.currentPageNumber)
      pdfViewer.value.currentPageNumber = value
  })

  watch(scale, (value) => {
    if (pdfViewer.value && value !== pdfViewer.value.currentScale)
      pdfViewer.value.currentScale = value
  })

  onBeforeUnmount(async () => {
    pdfViewer.value?.cleanup()

    await closeDoc()
  })

  return {
    page          : page,
    scale         : scale,
    totalPage     : totalPage,
    loading       : loading,
    error         : error,
    ready         : ready,
    openDoc       : openDoc,
    closeDoc      : closeDoc,
    pdfDoc        : pdfDoc,
    pdfEventBus   : pdfEventBus,
    pdfViewer     : pdfViewer,
    pdfLoadingTask: pdfLoadingTask,
    pdfLinkService: pdfLinkService,
    pdfJS         : pdfJS,
    onLoaded      : loadEvent.on,
    onError       : errorEvent.on,
    onReady       : readyEvent.on,
  }
}
