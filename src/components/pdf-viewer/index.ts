import { InjectionKey, Ref } from 'vue-demi'

export interface PdfViewerContext {
  page: Ref<number>,
  scale: Ref<number>,
  totalPage: Readonly<Ref<number>>,

  zoomIn: () => void,
  zoomOut: () => void,
}

export const PDF_VIEWER_CONTEXT: InjectionKey<PdfViewerContext> = Symbol('PdfViewer')

export type LayoutVariant = 'fixed' | 'fit'
