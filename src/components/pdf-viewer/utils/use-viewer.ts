import 'pdfjs-dist/web/pdf_viewer.css'
import type { Ref } from 'vue-demi'
import {
  computed,
  onBeforeUnmount,
  shallowRef,
  watch,
} from 'vue-demi'
import {
  createEventBus,
  createLinkService,
  createViewer,
  getCMAPUri,
  getDocument,
  normalizeRect,
} from './pdfjs'
import type {
  PDFJS,
  PDFJSAnnotation,
  PDFJSRawDimension,
  PDFJSViewer,
} from './pdfjs'
import useLoading from '../../overlay/utils/use-loading'
import { useClamp, useMax } from '@vueuse/math'
import { createEventHook } from '@vueuse/core'

export interface OpenDocConfig {
  disableStream?: boolean,
  disableRange?: boolean,
  httpHeaders?: Object,
}

export function useViewer (container: Ref<HTMLDivElement>, viewer: Ref<HTMLDivElement>) {
  const pdfDoc         = shallowRef<PDFJS.PDFDocumentProxy>()
  const pdfEventBus    = shallowRef<PDFJSViewer.EventBus>()
  const pdfViewer      = shallowRef<PDFJSViewer.PDFViewer>()
  const pdfLoadingTask = shallowRef<PDFJS.PDFDocumentLoadingTask>()
  const pdfLinkService = shallowRef<PDFJSViewer.PDFLinkService>()

  const totalPage = computed(() => pdfDoc.value?.numPages ?? 0)
  const scale     = useClamp(1, 0.1, 2)
  const page      = useClamp(1, 1, useMax(totalPage, 1))
  const loading   = useLoading()
  const ready     = shallowRef(false)
  const error     = shallowRef<Error>()

  const loadEvent    = createEventHook<PDFJS.PDFDocumentProxy>()
  const loadingEvent = createEventHook<PDFJS.OnProgressParameters>()
  const errorEvent   = createEventHook<Error>()
  const readyEvent   = createEventHook<PDFJSViewer.PDFViewer>()

  async function openDoc (url: string, password?: string, config: OpenDocConfig = {}) {
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
          httpHeaders  : config.httpHeaders,
        })

        pdfLoadingTask.value.onProgress = loadingEvent.trigger

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

      bus.on('annotationlayerrendered', async (event: { source: PDFJSViewer.PDFPageView, error?: Error }) => {
        if (!event.error) {
          const source      = event.source
          const page        = source.pdfPage as PDFJS.PDFPageProxy
          const annotations = await page.getAnnotations() as PDFJSAnnotation[]

          for (const data of annotations) {
            if (data.noHTML && !source.annotationLayer.annotationStorage.has(data.id)) {
              const {
                pageWidth,
                pageHeight,
                pageX,
                pageY,
              } = source.viewport.rawDims as PDFJSRawDimension

              const width  = (data.rotation % 180 === 0) ? data.rect[2] - data.rect[0] : data.rect[3] - data.rect[1]
              const height = (data.rotation % 180 === 0) ? data.rect[3] - data.rect[1] : data.rect[2] - data.rect[0]

              const rect = normalizeRect([
                data.rect[0],
                page.view[3] - data.rect[1] + page.view[1],
                data.rect[2],
                page.view[3] - data.rect[3] + page.view[1],
              ])

              const div = document.createElement('div')

              div.classList.add('annotationWidget', data.subtype, data.fieldType)

              div.style.left   = `${(100 * (rect[0] - pageX)) / pageWidth}%`
              div.style.top    = `${(100 * (rect[1] - pageY)) / pageHeight}%`
              div.style.width  = `${(100 * width) / pageWidth}%`
              div.style.height = `${(100 * height) / pageHeight}%`

              source.annotationLayer.div.append(div)
              source.annotationLayer.annotationStorage.setValue(data.id, { div })
            }
          }
        }
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
    onLoading     : loadingEvent.on,
  }
}
