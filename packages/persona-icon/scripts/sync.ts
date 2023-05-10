/* eslint-disable unicorn/prefer-module */
/* eslint-disable unicorn/prefer-top-level-await */

import 'dotenv/config'
import { EOL } from 'node:os'
import { createHash } from 'node:crypto'
import { Api } from 'figma-api'
import type { ComponentMetadata } from 'figma-api/lib/api-types'
import {
  writeFile,
  ensureFile,
  writeJSON,
  remove,
} from 'fs-extra'
import {
  resolve,
  join,
} from 'node:path'
import { kebabCase, chunk } from 'lodash-es'
import { optimize } from 'svgo'
import download from 'download'
import ora from 'ora'
import { ESLint } from 'eslint'
import { ObjectData, MetaData } from './types'
import { fixSvg } from './fix-svg'
import { createFont } from './create-font'

const TOKEN      = process.env.FIGMA_TOKEN ?? ''
const FILE_ID    = process.env.FIGMA_FILE_ID ?? ''
const SVG_DIR    = resolve(__dirname, '../svg')
const VUE_DIR    = resolve(__dirname, '../vue')
const META_FILE  = resolve(SVG_DIR, 'meta.json')
const CHUNK_SIZE = 300

const api     = new Api({ personalAccessToken: TOKEN })
const spinner = ora()
const eslint  = new ESLint({
  fix       : true,
  extensions: ['.vue'],
})

function getObjectData (components: ComponentMetadata[]): Map<string, ObjectData> {
  const result: Map<string, ObjectData> = new Map()

  for (const component of components) {
    const split    = component.containing_frame?.name.split('/') ?? []
    const names    = split[1].split(',')
    const variant  = kebabCase(component.containing_frame?.pageName)
    const category = kebabCase(split[0])
    const name     = kebabCase(names[0])
    const aliases  = names.slice(1).map((alias) => kebabCase(alias))
    const folder   = variant === 'outline' ? name : `${name}-${variant}`
    const id       = component.node_id
    const [,size]  = component.name.split('=')
    const filename = join(folder, size)
    const filepath = `${filename}.svg`

    result.set(id, {
      id,
      name,
      folder,
      variant,
      category,
      filename,
      filepath,
      aliases,
    })
  }

  return result
}

function getMetadata (objects: Iterable<ObjectData>): MetaData[] {
  const map: Map<string, MetaData> = new Map()

  for (const object of objects) {
    let metadata = map.get(object.folder)

    if (metadata) {
      metadata.files.push({
        name: object.filename,
        path: object.filepath,
        hash: object.filehash,
      })
    } else {
      metadata = {
        name    : object.name,
        aliases : object.aliases,
        category: object.category,
        folder  : object.folder,
        variant : object.variant,
        files   : [
          {
            name: object.filename,
            path: object.filepath,
            hash: object.filehash,
          },
        ],
      }
    }

    map.set(object.folder, metadata)
  }

  return [...map.values()]
}

function toVue (svg: string): string {
  return `<template>${EOL}${svg}${EOL}</template>${EOL}`
}

async function lintFile (file: string) {
  const results = await eslint.lintFiles(file)

  await ESLint.outputFixes(results)
}

async function main () {
  spinner.start('Opening figma files')

  const response   = await api.getFileComponents(FILE_ID)
  const components = response.meta?.components ?? []

  spinner.start('Get Object data')

  const objects = getObjectData(components)

  spinner.start('Get Download URL')

  const queue                          = [...objects.values()]
  const images: Record<string, string> = {}

  await Promise.all(chunk(queue, CHUNK_SIZE).map(async (batch) => {
    const result = await api.getImage(FILE_ID, {
      ids   : batch.map((o) => o.id).join(','),
      format: 'svg',
      scale : 1,
    })

    Object.assign(images, result.images)
  }))

  spinner.start('Downloading file')

  const urls  = Object.entries(images)
  const total = urls.length

  let count = 0

  await remove(SVG_DIR)
  await remove(VUE_DIR)

  await Promise.all(
    urls.map(async ([id, url]) => {
      const object = objects.get(id)

      if (object && url) {
        spinner.start(`[${count}/${total}] - Downloading ${object.filename}`)

        const buffer = await download(url)
        const svg    = optimize(fixSvg(buffer.toString())).data

        await ensureFile(resolve(SVG_DIR, object.filepath))
        await writeFile(resolve(SVG_DIR, object.filepath), svg)

        await ensureFile(resolve(VUE_DIR, `${object.filename}.vue`))
        await writeFile(resolve(VUE_DIR, `${object.filename}.vue`), toVue(svg))

        object.filehash = createHash('SHA256')
          .update(svg)
          .digest()
          .toString('hex')

        spinner.start(`[${++count}/${total}] - Success download ${object.filename}`)
      }
    }),
  )

  spinner.start('Generate font')

  await createFont()

  spinner.start('Lint result files')

  await lintFile(VUE_DIR)

  spinner.start('Create metadata')

  await ensureFile(META_FILE)
  await writeJSON(META_FILE, getMetadata(objects.values()), { spaces: 2 })

  spinner.succeed('Done')
  spinner.stop()
}

void main()
