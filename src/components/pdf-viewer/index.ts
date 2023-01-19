import {
  inject,
  InjectionKey,
  ref,
  Ref,
} from 'vue-demi'

export type LayoutVariant = 'fixed' | 'fit'

export interface PdfViewerContext {
  page: Ref<number>,
  scale: Ref<number>,
  totalPage: Readonly<Ref<number>>,
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
    }
  }, true)
}
