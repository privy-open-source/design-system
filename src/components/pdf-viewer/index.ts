import type {
  InjectionKey,
  Ref,
} from 'vue-demi'
import {
  inject,
  ref,
} from 'vue-demi'
import { noop } from 'lodash-es'

export type LayoutVariant = 'fixed' | 'fit'

export interface PdfViewerContext {
  page: Ref<number>,
  scale: Ref<number>,
  totalPage: Readonly<Ref<number>>,

  zoomIn: () => void,
  zoomOut: () => void,
  next: () => void,
  prev: () => void,
  first: () => void,
  last: () => void,
}

export const PDF_VIEWER_CONTEXT: InjectionKey<PdfViewerContext> = Symbol('PdfViewer')

export function usePdfContext () {
  return inject(PDF_VIEWER_CONTEXT, () => {
    const page      = ref(1)
    const scale     = ref(1)
    const totalPage = ref(0)

    return {
      page,
      scale,
      totalPage,
      zoomIn : noop,
      zoomOut: noop,
      next   : noop,
      prev   : noop,
      first  : noop,
      last   : noop,
    }
  }, true)
}
