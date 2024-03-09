let pdfjsLib

let pdfjsViewer

export async function importPdfJS () {
  if (!pdfjsLib) {
    const { __main__ } = await import('pdfjs-dist')
    const pdfjs        = await __main__()

    if (typeof window !== 'undefined' && 'Worker' in window)
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

    pdfjsLib = pdfjs
  }

  return pdfjsLib
}

export async function importPdfJSViewer () {
  await importPdfJS()

  if (!pdfjsViewer) {
    await import('pdfjs-dist/web/pdf_viewer.css')

    const { __main__ } = await import('pdfjs-dist/web/pdf_viewer.mjs')
    pdfjsViewer        = await __main__()
  }

  return pdfjsViewer
}

export async function getDocument (...params) {
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

export async function createViewer (...params) {
  await importPdfJSViewer()

  return new pdfjsViewer.PDFViewer(...params)
}

export async function createLinkService (...params) {
  await importPdfJSViewer()

  return new pdfjsViewer.PDFLinkService(...params)
}
