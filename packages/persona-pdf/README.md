# persona-pdf

> PDFjs wrapper for Persona

Lastest (v4) PDF.js use *Top-level Await* which is not avaiable on older browser.
This library wrap, and rebundle PDF.js to support non-TLA usage.

## Installation

```sh
yarn add @privyid/persona-pdf
```

## Usage

### Get total pages

```ts
import { getDocument } from '@privyid/persona-pdf'

const loadingTask = await getDocument('http://url-document.com/file.pdf')
const pdf         = await loadingTask.promise

console.log(pdf.numPages)
```

### Extract text

```ts
import { getDocument } from '@privyid/persona-pdf'

const loadingTask = await getDocument('url')
const doc         = await loadingTask.promise

const page        = await doc.getPage(1)
const textContent = await page.getTextContent()
const contents    = textContent.items.map((item) => item.str).join(' ')
```

### Render page as an image (base-64)

```ts
import { getDocument } from '@privyid/persona-pdf'

const loadingTask = await getDocument('http://url-document.com/file.pdf')
const pdf         = await loadingTask.promise

const page     = await pdf.getPage(1)
const viewport = page.getViewport({ scale: 1})

const canvas  = document.createElement('canvas')
const context = canvas.getContext('2d')!

canvas.width  = viewport.width
canvas.height = viewport.height

await page.render({
  canvasContext: context,
  viewport     : viewport,
}).promise

const result = canvas.toDataURL()

console.log(result)
```

### Create PDF Viewer

```ts
import {
  getDocument,
  createEventBus,
  createLinkService,
  createViewer,
} from '@privyid/persona-pdf'

const container = document.querySelector('#pdf-container')
const viewer    = document.querySelector('#pdf-viewer')

const eventBus    = await createEventBus()
const linkService = await createLinkService({ eventBus })
const pdfViewer   = await createViewer({
  container,
  viewer,
  eventBus,
  linkService,
})

linkService.setViewer(viewer)

const loadingTask = await getDocument('http://url-document.com/file.pdf')
const pdf         = await loadingTask.promise

pdfViewer.setDocument(pdf)
linkService.setDocument(pdf)
```

### Access the PDF.js API

```ts
import { importPdfJS, importPdfJSViewer } from '@privyid/persona-pdf'

const pdfjsLib       = await importPdfJS()
const pdfjsViewerLib = await importPdfJSViewer()

console.log(pdfjsLib.version)

```

## License

[MIT License](/LICENSE)
