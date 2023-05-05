/* eslint-disable unicorn/prefer-module */
/* eslint-disable unicorn/prefer-top-level-await */

import 'dotenv/config'
import { Api, Node } from 'figma-api'
import {
  writeFile,
  ensureFile,
  writeJSON,
  remove,
} from 'fs-extra'
import { resolve, join } from 'node:path'
import { kebabCase, chunk } from 'lodash-es'
import { optimize } from 'svgo'
import download from 'download'
import ohash from 'ohash'
import ora from 'ora'
import { ObjectData, MetaData } from './types'

const TOKEN      = process.env.FIGMA_TOKEN ?? ''
const FILE_ID    = process.env.FIGMA_FILE_ID ?? ''
const CANVAS_ID  = process.env.FIGMA_CANVAS_ID ?? ''
const OUT_DIR    = resolve(__dirname, '../icons')
const META_FILE  = resolve(OUT_DIR, 'meta.json')
const CHUNK_SIZE = 300

const api     = new Api({ personalAccessToken: TOKEN })
const spinner = ora()

function getObjectData (composets: Array<Node<'COMPONENT_SET'>>): Map<string, ObjectData> {
  const result: Map<string, ObjectData> = new Map()

  for (const node of composets) {
    const split    = node.name.split('/')
    const names    = split[2].split(',')
    const variant  = kebabCase(split[0])
    const category = kebabCase(split[1])
    const name     = kebabCase(names[0])
    const aliases  = names.slice(1).map((alias) => kebabCase(alias))
    const folder   = join(variant, name)
    const icons    = node.children as Array<Node<'COMPONENT'>>

    for (const icon of icons) {
      const id       = icon.id
      const hash     = ohash.hash(icon)
      const [,size]  = icon.name.split('=')
      const filename = join(folder, size)
      const filepath = `${filename}.svg`

      result.set(id, {
        id,
        hash,
        name,
        folder,
        variant,
        category,
        filename,
        filepath,
        aliases,
      })
    }
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
          },
        ],
      }
    }

    map.set(object.folder, metadata)
  }

  return [...map.values()]
}

async function main () {
  spinner.start('Opening figma files')

  const figma    = await api.getFile(FILE_ID, { ids: [CANVAS_ID] })
  const canvas   = figma.document.children.find((node) => node.id === CANVAS_ID) as Node<'CANVAS'>
  const compsets = canvas.children.filter((node) => node.type === 'COMPONENT_SET') as Array<Node<'COMPONENT_SET'>>

  spinner.start('Get Object data')

  const objects = getObjectData(compsets)

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

  await remove(OUT_DIR)
  await Promise.all(
    urls.map(async ([id, url]) => {
      const object = objects.get(id)

      if (object && url) {
        spinner.start(`[${count}/${total}] - Downloading ${object.filename}`)

        const buffer = await download(url)
        const svg    = optimize(buffer.toString()).data

        await ensureFile(resolve(OUT_DIR, object.filepath))
        await writeFile(resolve(OUT_DIR, object.filepath), svg)

        spinner.start(`[${++count}/${total}] - Success ${object.filename}`)
      }
    }),
  )

  spinner.start('Create metadata')

  await ensureFile(META_FILE)
  await writeJSON(META_FILE, getMetadata(objects.values()), { spaces: 2 })

  spinner.succeed('Done')
  spinner.stop()
}

void main()
