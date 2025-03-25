import type * as PDFJS from 'pdfjs-dist'
import type * as PDFJSViewer from 'pdfjs-dist/legacy/web/pdf_viewer.mjs'
import { withBase } from 'ufo'
import { getCDN } from '../../global/store'

let pdfjsLib: typeof PDFJS

let pdfjsViewer: typeof PDFJSViewer

async function importPdfJS () {
  if (!pdfjsLib) {
    const pdfjs = await import('pdfjs-dist')

    if (typeof window !== 'undefined' && 'Worker' in window)
      pdfjs.GlobalWorkerOptions.workerSrc = withBase(`pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`, getCDN())

    pdfjsLib = pdfjs
  }

  return pdfjsLib
}

async function importPdfJSViewer () {
  await importPdfJS()

  if (!pdfjsViewer)
    pdfjsViewer = await import('pdfjs-dist/legacy/web/pdf_viewer.mjs')

  return pdfjsViewer
}

export async function getDocument (...params: Parameters<typeof PDFJS['getDocument']>) {
  await importPdfJS()

  return pdfjsLib.getDocument(...params)
}

export async function getCMAPUri () {
  return withBase(`pdfjs-dist@${await getVersion()}/cmaps/`, getCDN())
}

export async function getVersion () {
  await importPdfJS()

  return pdfjsLib.version
}

export async function createEventBus () {
  await importPdfJSViewer()

  return new pdfjsViewer.EventBus()
}

export async function createViewer (...params: ConstructorParameters<typeof PDFJSViewer['PDFViewer']>) {
  await importPdfJSViewer()

  return new pdfjsViewer.PDFViewer(...params)
}

export async function createLinkService (...params: ConstructorParameters<typeof PDFJSViewer['PDFLinkService']>) {
  await importPdfJSViewer()

  return new pdfjsViewer.PDFLinkService(...params)
}

export type * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer.mjs'

export type * as PDFJS from 'pdfjs-dist'

export function normalizeRect (rect: number[]) {
  const r = [...rect] // clone rect

  if (rect[0] > rect[2]) {
    r[0] = rect[2]
    r[2] = rect[0]
  }

  if (rect[1] > rect[3]) {
    r[1] = rect[3]
    r[3] = rect[1]
  }

  return r
}

export interface PDFJSAnnotation {
  id: string,
  annotationFlags: number,
  borderStyle?: {
    width: number,
    rawWidth: number,
    style: number,
    dashArray: number[],
    horizontalCornerRadius: number,
    verticalCornerRadius: number,
  },
  color?: Uint8ClampedArray,
  backgroundColor?: Uint8ClampedArray,
  borderColor?: Uint8ClampedArray,
  rotation: 0 | 90 | 180 | 270,
  contentsObj: {
    str: string,
    dir: 'ltr' | 'rtl',
  },
  hasAppearance: boolean,
  modificationDate?: Date,
  rect: [
    number,
    number,
    number,
    number,
  ],
  subtype: string,
  hasOwnCanvas: boolean,
  noRotate: boolean,
  noHTML: boolean,
  isEditable: boolean,
  structParent: number,
  annotationType: number,
  fieldName: string,
  actions?: string,
  fieldValue?: string,
  defaultFieldValue?: string,
  alternativeText: string,
  defaultAppearanceData?: {
    fontSize: number,
    fontName: string,
    fontColor: Uint8ClampedArray,
  },
  fieldType: string,
  fieldFlags: number,
  password: boolean,
  readOnly: boolean,
  required: boolean,
  hidden: boolean,
}

export interface PDFJSRawDimension {
  pageWidth: number,
  pageHeight: number,
  pageX: number,
  pageY: number,
}
