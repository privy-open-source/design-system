/* eslint-disable unicorn/prefer-module */
/* eslint-disable unicorn/prefer-top-level-await */

import 'dotenv/config'
import { Api, Node } from 'figma-api'
import {
  exists,
  writeFile,
  ensureFile,
  readFile,
  writeJSON,
} from 'fs-extra'
import { resolve } from 'node:path'
import { kebabCase } from 'lodash-es'
import { optimize } from 'svgo'
import download from 'download'
import { Signale } from 'signale'
import yaml from 'yaml'
import ohash from 'ohash'
import onClose from 'close-with-grace'
import { LockData, MetaData } from './types'

const TOKEN     = process.env.FIGMA_TOKEN ?? ''
const FILE_ID   = process.env.FIGMA_FILE_ID ?? ''
const CANVAS_ID = process.env.FIGMA_CANVAS_ID ?? ''
const OUT_DIR   = resolve(__dirname, '../icons')
const LOCK_FILE = resolve(__dirname, '../sync.lock')
const META_FILE = resolve(OUT_DIR, 'meta.json')

const api     = new Api({ personalAccessToken: TOKEN })
const console = new Signale({ interactive: true, scope: 'sync' })

async function main () {
  console.await('Opening figma files')

  const figma    = await api.getFile(FILE_ID, { ids: [CANVAS_ID] })
  const canvas   = figma.document.children.find((node) => node.id === CANVAS_ID) as Node<'CANVAS'>
  const compsets = canvas.children.filter((node) => node.type === 'COMPONENT_SET') as Array<Node<'COMPONENT_SET'>>

  let lockData: Record<string, LockData> = {}
  const metaData: MetaData[]             = []

  async function stop () {
    await ensureFile(LOCK_FILE)
    await writeFile(LOCK_FILE, yaml.stringify(lockData))
    await writeJSON(META_FILE, metaData, { spaces: 2 })
  }

  onClose({ delay: 100 }, stop)

  if (await exists(LOCK_FILE)) {
    // eslint-disable-next-line unicorn/no-await-expression-member
    lockData = yaml.parse((await readFile(LOCK_FILE)).toString()) ?? {}
  }

  let count = 0

  for (const node of compsets) {
    if (node.type === 'COMPONENT_SET') {
      const [category, names]  = node.name.split('/')
      const [name, ...aliases] = names.split(',')
      const folder             = `${kebabCase(category)}/${kebabCase(name)}`
      const hash               = ohash.hash(node)

      const ids = new Map<string, string>(node.children.map((node: Node<'COMPONENT'>) => {
        const id      = node.id
        const [,size] = node.name.split('=')

        return [id, size]
      }))

      if (lockData[folder]?.hash === hash)
        console.await(`[%d/%d] - Skip ${folder}, already downloaded`, count, compsets.length)
      else {
        console.await(`[%d/%d] - Downloading ${folder}`, count, compsets.length)

        const images = await api.getImage(FILE_ID, {
          format: 'svg',
          scale : 1,
          ids   : [...ids.keys()].join(','),
        })

        const queue = Object.entries(images.images)

        while (queue.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const [id, url] = queue.pop()!
          const name      = ids.get(id)

          if (url && name) {
            try {
              const result = await download(url)
              const svg    = optimize(result.toString()).data
              const dst    = resolve(OUT_DIR, folder, `${name}.svg`)

              await ensureFile(dst)
              await writeFile(dst, svg)

              console.success(`[%d/%d] - Success download ${folder}/${name}`, count, compsets.length)
            } catch (error) {
              console.error(`[%d/%d] - Fail download ${folder}/${name}, ${(error as Error).message}`, count, compsets.length)
              queue.push([id, url])
            }
          }
        }

        lockData[folder] = {
          id  : node.id,
          name: folder,
          hash: hash,
        }
      }

      metaData.push({
        name    : kebabCase(name),
        category: kebabCase(category),
        aliases : aliases.map((alias) => kebabCase(alias)),
        files   : [...ids.values()],
      })

      count++
    }
  }

  await stop()
}

void main()
