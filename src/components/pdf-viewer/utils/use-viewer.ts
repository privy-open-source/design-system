import 'pdfjs-dist/web/pdf_viewer.css'
import type { Ref } from 'vue-demi'
import {
  computed,
  onBeforeUnmount,
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
import { type EventHook } from '@vueuse/shared'
import {
  createEventBus,
  createLinkService,
  createViewer,
  getCMAPUri,
  getDocument,
} from './pdfjs'

export interface OpenDocConfig {
  disableStream: boolean,
  disableRange: boolean,
}

export function useViewer (container: Ref<HTMLDivElement>, viewer: Ref<HTMLDivElement>) {
  const pdfDoc         = shallowRef<PDFJS.PDFDocumentProxy>()
  const pdfEventBus    = shallowRef<EventBus>()
  const pdfViewer      = shallowRef<PDFViewer>()
  const pdfLoadingTask = shallowRef<PDFJS.PDFDocumentLoadingTask>()
  const pdfLinkService = shallowRef<PDFLinkService>()

  const totalPage = computed(() => pdfDoc.value?.numPages ?? 0)
  const scale     = useClamp(1, 0.1, 2)
  const page      = useClamp(1, 1, totalPage)
  const loading   = useLoading()
  const ready     = shallowRef(false)
  const error     = shallowRef<Error>()

  const loadEvent: EventHook<PDFJS.PDFDocumentProxy> = createEventHook<PDFJS.PDFDocumentProxy>()
  const errorEvent: EventHook<Error>                 = createEventHook<Error>()
  const readyEvent: EventHook<PDFViewer>             = createEventHook<PDFViewer>()

  async function openDoc (url: string, password?: string, config: Partial<OpenDocConfig> = {}) {
    loading.value = true
    error.value   = undefined

    try {
      // Close previous document
      await closeDoc()

      if (url) {
        // Open new document
        pdfLoadingTask.value = await getDocument({
          url          : url,
          password     : password,
          cMapUrl      : await getCMAPUri(),
          cMapPacked   : true,
          disableStream: config.disableStream,
          disableRange : config.disableRange,
        })

        pdfDoc.value = await pdfLoadingTask.value.promise

        pdfViewer.value.setDocument(pdfDoc.value)
        pdfLinkService.value.setDocument(pdfDoc.value)

        void loadEvent.trigger(pdfDoc.value)
      }
    } catch (error_) {
      if (error_ instanceof Error) {
        error.value = error_

        void errorEvent.trigger(error_)
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
      const bus = await createEventBus()

      bus.on('pagesinit', () => {
        const width    = viewer.value?.clientWidth ?? 0
        const isMobile = width > 0 && width < 793

        pdfViewer.value.currentScaleValue = isMobile ? 'page-width' : '1'
        pdfViewer.value.currentPageNumber = page.value
        ready.value                       = true

        void readyEvent.trigger(pdfViewer.value)
      })

      bus.on('pagechanging', (event: { pageNumber: number }) => {
        page.value = event.pageNumber
      })

      bus.on('scalechanging', (event: { scale: number }) => {
        scale.value = event.scale
      })

      pdfEventBus.value    = bus
      pdfLinkService.value = await createLinkService({ eventBus: pdfEventBus.value })
      pdfViewer.value      = await createViewer({
        container           : container.value,
        viewer              : viewer.value,
        eventBus            : pdfEventBus.value,
        linkService         : pdfLinkService.value,
        removePageBorders   : true,
        annotationEditorMode: -1,
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
    await closeDoc()

    pdfViewer.value?.cleanup()
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
    onLoaded      : loadEvent.on,
    onError       : errorEvent.on,
    onReady       : readyEvent.on,
  }
}
