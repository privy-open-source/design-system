import type * as PDFJS from 'pdfjs-dist'
import type * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer'

let pdfjsLib: typeof PDFJS

let pdfjsViewer: typeof PDFJSViewer

async function importPdfJS () {
  if (!pdfjsLib) {
    const pdfjs = await import('pdfjs-dist')

    if (typeof window !== 'undefined' && 'Worker' in window)
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

    pdfjsLib = pdfjs
  }

  return pdfjsLib
}

async function importPdfJSViewer () {
  await importPdfJS()

  if (!pdfjsViewer)
    pdfjsViewer = await import('pdfjs-dist/web/pdf_viewer')

  return pdfjsViewer
}

export async function getDocument (...params: Parameters<typeof PDFJS['getDocument']>) {
  await importPdfJS()

  return pdfjsLib.getDocument(...params)
}

export async function getCMAPUri () {
  return `https://cdn.jsdelivr.net/npm/pdfjs-dist@${await getVersion()}/cmaps/`
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
