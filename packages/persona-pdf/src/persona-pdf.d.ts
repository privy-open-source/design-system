import type * as PDFJS from 'pdfjs-dist'
import type * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer.mjs'

export function importPdfJS (): Promise<typeof PDFJS>

export function importPdfJSViewer (): Promise<typeof PDFJSViewer>

export function getDocument (...params: Parameters<typeof PDFJS.getDocument>): Promise<ReturnType<typeof PDFJS.getDocument>>

export function getCMAPUri (): Promise<string>

export function getVersion (): Promise<string>

export function createEventBus (): Promise<PDFJSViewer.EventBus>

export function createViewer (...params: ConstructorParameters<typeof PDFJSViewer.PDFViewer>): Promise<PDFJSViewer.PDFViewer>

export function createLinkService (...params: ConstructorParameters<typeof PDFJSViewer.PDFLinkService>): Promise<PDFJSViewer.PDFLinkService>

export type * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer.mjs'

export type * as PDFJS from 'pdfjs-dist'
