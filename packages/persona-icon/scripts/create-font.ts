/* eslint-disable unicorn/prefer-module */
import webfont from 'webfont'
import {
  writeFile,
  ensureFile,
} from 'fs-extra'
import {
  resolve,
  join,
  dirname,
  basename,
} from 'node:path'
import { createHash } from 'node:crypto'
import type { Result } from 'webfont/dist/src/types/Result'
import { EOL } from 'node:os'

const SVG_DIR  = resolve(__dirname, '../svg/')
const FONT_DIR = resolve(__dirname, '../font/')

export async function createFont () {
  const result = await webfont({
    files            : join(SVG_DIR, '**', '16.svg'),
    fontName         : 'Persona Icon',
    templateClassName: 'pi',
    fixedWidth       : true,
    normalize        : true,
    fontHeight       : 1000,
    round            : 10e12,
    sort             : true,
    glyphTransformFn (obj) {
      return Object.assign(obj, { name: basename(dirname((obj as any).path)) })
    },
  })

  if (result.ttf) {
    await ensureFile(resolve(FONT_DIR, 'persona-icon.ttf'))
    await writeFile(resolve(FONT_DIR, 'persona-icon.ttf'), result.ttf)
  }

  if (result.woff) {
    await ensureFile(resolve(FONT_DIR, 'persona-icon.woff'))
    await writeFile(resolve(FONT_DIR, 'persona-icon.woff'), result.woff)
  }

  if (result.woff2) {
    await ensureFile(resolve(FONT_DIR, 'persona-icon.woff2'))
    await writeFile(resolve(FONT_DIR, 'persona-icon.woff2'), result.woff2)
  }

  if (result.eot) {
    await ensureFile(resolve(FONT_DIR, 'persona-icon.eot'))
    await writeFile(resolve(FONT_DIR, 'persona-icon.eot'), result.eot)
  }

  if (result.svg) {
    await ensureFile(resolve(FONT_DIR, 'persona-icon.svg'))
    await writeFile(resolve(FONT_DIR, 'persona-icon.svg'), result.svg)
  }

  await createCss(result)
}

function hash (buffer: Buffer | string, length = 4) {
  return createHash('shake256', { outputLength: length })
    .update(buffer)
    .digest('hex')
}

function toCode (unicode: string) {
  return unicode.codePointAt(0)?.toString(16).padStart(4, '0') ?? ''
}

async function createCss (result: Result) {
  let css = `@font-face {
  font-family: 'Persona Icon';
  src: url('../font/persona-icon.eot?${hash(result.eot ?? '')}');
  src: url('../font/persona-icon.eot?${hash(result.eot ?? '')}#iefix') format('embedded-opentype'),
       url('../font/persona-icon.woff2?${hash(result.woff2 ?? '')}') format('woff2'),
       url('../font/persona-icon.woff?${hash(result.woff ?? '')}') format('woff'),
       url('../font/persona-icon.ttf?${hash(result.ttf ?? '')}') format('truetype'),
       url('../font/persona-icon.svg?${hash(result.svg ?? '')}#${encodeURIComponent('Persona Icon')}') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^="pi-"]:before, [class*=" pi-"]:before {
  font-family: "Persona Icon";
  font-style: normal;
  font-weight: normal;
  display: inline-block;
  text-decoration: inherit;
  width: 1em;
  text-align: center;
  font-variant: normal;
  text-transform: none;
  line-height: 1em;
  vertical-align: middle;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}${EOL}${EOL}`

  for (const glyph of (result.glyphsData ?? [])) {
    const name    = glyph.metadata?.name
    const content = glyph.metadata?.unicode?.at(0)

    if (name && content)
      css += `.pi-${name}::before { content: '\\${toCode(content)}' }${EOL}`
  }

  css += EOL

  await ensureFile(resolve(FONT_DIR, 'persona-icon.css'))
  await writeFile(resolve(FONT_DIR, 'persona-icon.css'), css)
}
