#!/usr/bin/env node

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
  writeJson,
  readJson,
  remove,
  exists,
} from 'fs-extra'
import {
  resolve,
  join,
} from 'node:path'
import { kebabCase, chunk } from 'lodash-es'
import type { Config } from 'svgo'
import { optimize } from 'svgo'
import ora from 'ora'
import { ESLint } from 'eslint'
import type { ObjectData, MetaData } from './types'
import pAll from 'p-all'
import ohash from 'ohash'
import minimist from 'minimist'
import { ofetch } from 'ofetch'
import Sharp from 'sharp'

const argv       = minimist(process.argv.slice(2))
const TOKEN      = process.env.FIGMA_TOKEN ?? ''
const FILE_ID    = process.env.FIGMA_FILE_ID ?? ''
const SVG_DIR    = resolve(__dirname, '../svg')
const VUE_DIR    = resolve(__dirname, '../vue')
const PNG_DIR    = resolve(__dirname, '../png')
const META_FILE  = resolve(SVG_DIR, 'meta.json')
const LOCK_FILE  = resolve(__dirname, '../sync-lock.json')
const FORCE_SYNC = argv.f || argv.force
const CHUNK_SIZE = 300

const api     = new Api({ personalAccessToken: TOKEN })
const spinner = ora()
const eslint  = new ESLint({
  fix       : true,
  extensions: ['.vue'],
})

const svgoConfig: Config = {
  plugins: [
    {
      name  : 'addClassesToSVGElement',
      params: { className: 'persona-ilustration' },
    },
    {
      name  : 'addAttributesToSVGElement',
      params: { attributes: [{ focusable: 'false' }] },
    },
    {
      name  : 'preset-default',
      params: { overrides: { removeViewBox: false } },
    },
    {
      name  : 'prefixIds',
      params: {
        delim           : '_',
        prefix          : (_, info) => info.path ? ohash.hash(info.path) : '',
        prefixClassNames: false,
        prefixIds       : true,
      },
    },
  ],
}

async function getLockData (): Promise<Map<string, ObjectData>> {
  let data: Record<string, ObjectData> = {}

  if (!FORCE_SYNC && await exists(LOCK_FILE)) {
    try {
      data = await readJson(LOCK_FILE)
    } catch {}
  }

  return new Map(Object.entries(data))
}

function getObjectData (components: ComponentMetadata[]): Map<string, ObjectData> {
  const result: Map<string, ObjectData> = new Map()

  for (const component of components) {
    if (!component.containing_frame?.name)
      continue

    if (component.containing_frame?.pageName === 'Illustration') {
      const { type } = Object.fromEntries(component.name.split(',').map((i) => i.trim().split('=')))

      const hash     = ohash.hash(component)
      const split    = component.containing_frame?.name.split('/') ?? []
      const names    = split[1].split(',')
      const variant  = kebabCase(component.containing_frame?.pageName)
      const category = kebabCase(split[0])
      const name     = kebabCase(names[0])
      const aliases  = names.slice(1).map((alias) => kebabCase(alias))
      const folder   = name
      const id       = component.node_id
      const filename = join(folder, kebabCase(type))
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
        component,
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

async function cleanup (objects: Map<string, ObjectData>, lockObjects: Map<string, ObjectData>) {
  for (const oldObject of lockObjects.values()) {
    const newObject = objects.get(oldObject.id)

    if (!newObject || newObject.filename !== oldObject.filename) {
      await remove(resolve(SVG_DIR, `${oldObject.filename}.svg`))
      await remove(resolve(VUE_DIR, `${oldObject.filename}.vue`))
      await remove(resolve(PNG_DIR, `${oldObject.filename}.png`))
      await remove(resolve(PNG_DIR, `${oldObject.filename}@2x.png`))
    }
  }
}

async function main () {
  spinner.start('Opening figma file')

  const response   = await api.getFileComponents(FILE_ID)
  const components = response.meta?.components ?? []

  spinner.start('Get Object data')

  const lockObjects = await getLockData()
  const objects     = getObjectData(components)

  spinner.start('Get Download URL')

  const images: Record<string, string> = {}
  const queue: ObjectData[]            = []

  for (const id of objects.keys()) {
    const object = objects.get(id)

    if (object) {
      if (object.hash === lockObjects.get(object.id)?.hash)
        object.filehash = lockObjects.get(object.id)?.filehash
      else
        queue.push(object)
    }
  }

  await pAll(chunk(queue, CHUNK_SIZE).map((batch) => {
    return async () => {
      const result = await api.getImage(FILE_ID, {
        ids   : batch.map((o) => o.id).join(','),
        format: 'svg',
        scale : 1,
      })

      Object.assign(images, result.images)
    }
  }), { concurrency: 10 })

  spinner.start('Downloading file')

  const urls  = Object.entries(images)
  const total = urls.length

  let count = 0

  await pAll(
    urls.map(([id, url]) => {
      return async () => {
        const object = objects.get(id)

        if (object && url) {
          spinner.start(`[${count}/${total}] - Downloading ${object.filename}`)

          const res = await ofetch(url, { responseType: 'text', retry: 3 })
          const svg = optimize(res, { path: object.filepath, ...svgoConfig }).data

          await ensureFile(resolve(SVG_DIR, object.filepath))
          await writeFile(resolve(SVG_DIR, object.filepath), svg)

          await ensureFile(resolve(VUE_DIR, `${object.filename}.vue`))
          await writeFile(resolve(VUE_DIR, `${object.filename}.vue`), toVue(svg))
          await lintFile(resolve(VUE_DIR, `${object.filename}.vue`))

          await ensureFile(resolve(PNG_DIR, `${object.filename}.png`))
          await Sharp(resolve(SVG_DIR, object.filepath))
            .toFormat('png')
            .toFile(resolve(PNG_DIR, `${object.filename}.png`))

          await Sharp(resolve(SVG_DIR, object.filepath), { density: 144 })
            .toFormat('png')
            .toFile(resolve(PNG_DIR, `${object.filename}@2x.png`))

          object.filehash = createHash('SHA256')
            .update(svg)
            .digest()
            .toString('hex')

          spinner.start(`[${++count}/${total}] - Success download ${object.filename}`)
        }
      }
    }),
    { concurrency: 25 },
  )

  spinner.start('Cleanup')

  await cleanup(objects, lockObjects)

  spinner.start('Create metadata')

  await ensureFile(META_FILE)
  await writeJson(META_FILE, getMetadata(objects.values()), { spaces: 2 })

  spinner.start('Create lockfile')

  await ensureFile(LOCK_FILE)
  await writeJson(LOCK_FILE, Object.fromEntries(objects), { spaces: 2 })

  spinner.succeed('Done')
  spinner.stop()
}

void main()
