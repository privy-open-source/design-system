import type * as PDFJS from 'pdfjs-dist'
import type * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer.mjs'

export async function importPdfJS (): Promise<typeof PDFJS>

export async function importPdfJSViewer (): Promise<typeof PDFJSViewer>

export async function getDocument (...params: Parameters<typeof PDFJS.getDocument>): Promise<ReturnType<typeof PDFJS.getDocument>>

export async function getCMAPUri (): Promise<string>

export async function getVersion (): Promise<string>

export async function createEventBus (): Promise<PDFJSViewer.EventBus>

export async function createViewer (...params: ConstructorParameters<typeof PDFJSViewer.PDFViewer>): Promise<PDFJSViewer.PDFViewer>

export async function createLinkService (...params: ConstructorParameters<typeof PDFJSViewer.PDFLinkService>): Promise<PDFJSViewer.PDFLinkService>

export type * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer.mjs'

export type * as PDFJS from 'pdfjs-dist'
