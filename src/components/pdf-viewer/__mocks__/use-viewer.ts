import type * as PDFJS from 'pdfjs-dist'
import { vi } from 'vitest'
import { createEventHook } from '@vueuse/core'
import { reactive, toRefs } from 'vue-demi'

export const loadEvent = createEventHook<PDFJS.PDFDocumentProxy>()

export const errorEvent = createEventHook<Error>()

export const readyEvent = createEventHook()

export const loadingEvent = createEventHook<PDFJS.OnProgressParameters>()

export const context = reactive({
  page          : 1,
  scale         : 1,
  totalPage     : 0,
  loading       : true,
  error         : undefined,
  ready         : false,
  pdfDoc        : undefined,
  pdfEventBus   : undefined,
  pdfViewer     : undefined,
  pdfLoadingTask: undefined,
  pdfLinkService: undefined,
  pdfJS         : undefined,
})

export const openDoc = vi.fn((src: string, password?: string) => {
  if (src) {
    context.loading = true

    setTimeout(() => {
      if (src.includes('error')) {
        context.error = new Error('Doc not loaded')

        void errorEvent.trigger(context.error)
      } else if (src.includes('protected') && !password) {
        context.error      = new Error('Doc not loaded')
        context.error.name = 'PasswordException'

        void errorEvent.trigger(context.error)
      } else {
        void loadingEvent.trigger({ total: 100, loaded: 10 })

        context.ready     = true
        context.totalPage = 5

        void loadingEvent.trigger({ total: 100, loaded: 100 })
        void loadEvent.trigger({} as unknown as PDFJS.PDFDocumentProxy)
        void readyEvent.trigger({})
      }

      context.loading = false
    }, 1)
  }
})

export const closeDoc = vi.fn()

export function useViewer () {
  return {
    ...toRefs(context),
    openDoc,
    closeDoc,
    onLoaded : loadEvent.on,
    onError  : errorEvent.on,
    onReady  : readyEvent.on,
    onLoading: loadingEvent.on,
  }
}
