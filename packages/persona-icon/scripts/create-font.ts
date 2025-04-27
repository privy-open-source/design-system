import {
  writeFile,
  ensureFile,
  createWriteStream,
  createReadStream,
  readFile,
} from 'fs-extra'
import {
  resolve,
  join,
  dirname,
  basename,
} from 'node:path'
import { createHash } from 'node:crypto'
import { EOL } from 'node:os'
import { fileURLToPath } from 'node:url'
import glob from 'fast-glob'
import type { Glyph, SVGIconStream } from 'svgicons2svgfont'
import { SVGIcons2SVGFontStream } from 'svgicons2svgfont'
import svg2ttf from 'svg2ttf'
import ttf2woff from 'ttf2woff'
import ttf2woff2 from 'ttf2woff2'
import ttf2eot from 'ttf2eot'

const SVG_DIR  = fileURLToPath(new URL('../svg/', import.meta.url))
const FONT_DIR = fileURLToPath(new URL('../font/', import.meta.url))

function withDirname (a: string, b: string) {
  const dirA = basename(dirname(a))
  const dirB = basename(dirname(b))

  return dirA.localeCompare(dirB)
}

async function createSVG () {
  await ensureFile(join(FONT_DIR, 'persona-icon.svg'))

  const icons  = await glob('./**/16.svg', { cwd: SVG_DIR })
  const glyphs = await new Promise<Glyph[]>((resolve, reject) => {
    const fontStream = new SVGIcons2SVGFontStream({
      fontName  : 'Persona Icon',
      fixedWidth: true,
      normalize : true,
      fontHeight: 1000,
      round     : 10e12,
    })

    fontStream.pipe(createWriteStream(join(FONT_DIR, 'persona-icon.svg')))
      .on('finish', () => {
        resolve(fontStream.glyphs)
      })
      .on('error', (error) => {
        reject(error)
      })

    let unicode = 0xEA_00

    for (const icon of icons.toSorted(withDirname)) {
      const glyph: SVGIconStream = createReadStream(join(SVG_DIR, icon)) as any

      glyph.metadata = {
        name   : basename(dirname(icon)),
        unicode: [String.fromCodePoint(++unicode)],
      }

      fontStream.write(glyph)
    }

    fontStream.end()
  })

  await ensureFile(join(FONT_DIR, 'persona-icon.json'))
  await writeFile(join(FONT_DIR, 'persona-icon.json'), JSON.stringify(glyphs, undefined, 2))

  const buffer = await readFile(join(FONT_DIR, 'persona-icon.svg'))

  return { glyphs, buffer }
}

async function createTtf (svg: Buffer) {
  const result = svg2ttf(svg.toString('utf8'))
  const output = Buffer.from(result.buffer)

  await ensureFile(resolve(FONT_DIR, 'persona-icon.ttf'))
  await writeFile(resolve(FONT_DIR, 'persona-icon.ttf'), output)

  return output
}

async function createWoff (ttf: Buffer) {
  const result = ttf2woff(ttf)

  await ensureFile(resolve(FONT_DIR, 'persona-icon.woff'))
  await writeFile(resolve(FONT_DIR, 'persona-icon.woff'), result)

  return result
}

async function createWoff2 (ttf: Buffer) {
  const result = ttf2woff2(ttf)

  await ensureFile(resolve(FONT_DIR, 'persona-icon.woff2'))
  await writeFile(resolve(FONT_DIR, 'persona-icon.woff2'), result)

  return result
}

async function createEot (ttf: Buffer) {
  const result = ttf2eot(ttf)

  await ensureFile(resolve(FONT_DIR, 'persona-icon.eot'))
  await writeFile(resolve(FONT_DIR, 'persona-icon.eot'), result)

  return result
}

export async function createFont () {
  const {
    glyphs,
    buffer: svg,
  } = await createSVG()

  const ttf   = await createTtf(svg)
  const woff  = await createWoff(ttf)
  const woff2 = await createWoff2(ttf)
  const eot   = await createEot(ttf)

  await createCss({
    glyphs,
    svg,
    ttf,
    eot,
    woff,
    woff2,
  })
}

function hash (buffer: Buffer | string, length = 4) {
  return createHash('shake256', { outputLength: length })
    .update(buffer)
    .digest('hex')
}

function toCode (unicode: string) {
  return unicode.codePointAt(0)?.toString(16).padStart(4, '0') ?? ''
}

interface CreateCSS {
  glyphs: Glyph[],
  svg: Buffer,
  ttf: Buffer,
  eot: Buffer,
  woff: Buffer,
  woff2: Buffer,
}

async function createCss (input: CreateCSS) {
  let css = `@font-face {
  font-family: 'Persona Icon';
  src: url('../font/persona-icon.eot?${hash(input.eot)}');
  src: url('../font/persona-icon.eot?${hash(input.eot)}#iefix') format('embedded-opentype'),
       url('../font/persona-icon.woff2?${hash(input.woff2)}') format('woff2'),
       url('../font/persona-icon.woff?${hash(input.woff)}') format('woff'),
       url('../font/persona-icon.ttf?${hash(input.ttf)}') format('truetype'),
       url('../font/persona-icon.svg?${hash(input.svg ?? '')}#${encodeURIComponent('Persona Icon')}') format('svg');
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

  for (const glyph of (input.glyphs ?? [])) {
    const name    = glyph.name
    const content = glyph.unicode?.at(0)

    if (name && content)
      css += `.pi-${name}::before { content: '\\${toCode(content)}' }${EOL}`
  }

  css += EOL

  await ensureFile(resolve(FONT_DIR, 'persona-icon.css'))
  await writeFile(resolve(FONT_DIR, 'persona-icon.css'), css)
}
