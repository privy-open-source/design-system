import type { Instance } from 'pspdfkit'
import {
  inject,
  type InjectionKey,
  type Ref,
} from 'vue-demi'

export interface PSPDFContext {
  instance: Ref<Instance>,
  contents: Map<string, HTMLElement>,
}

export const PSPDF_INSTANCE: InjectionKey<PSPDFContext> = Symbol('PdfViewer')

export function usePspdf () {
  return inject(PSPDF_INSTANCE)
}
