/* eslint-disable no-console */
/* eslint-disable unicorn/no-await-expression-member */
/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable unicorn/prefer-module */
import { resolve } from 'node:path'
import { readJSON } from 'fs-extra'
import { name } from '../package.json'
import type { MetaData } from './types'
import { ofetch } from 'ofetch'
import ohash from 'ohash'
import minimist from 'minimist'
import {
  groupBy,
  sortBy,
  startCase,
} from 'lodash'

const argv      = minimist(process.argv.slice(2))
const META_FILE = resolve(__dirname, '../svg/meta.json')

type CompareMeta = MetaData['files'][number]

function getFilesData (metadata: MetaData[]): Record<string, CompareMeta> {
  return Object.fromEntries(
    metadata.flatMap((item) => item.files)
      .map((item) => [item.name, item]),
  )
}

async function getMeta (version: string): Promise<MetaData[]> {
  try {
    return await (
      version === 'local'
        ? readJSON(META_FILE)
        : ofetch(`https://unpkg.io/${name}@${version}/svg/meta.json`, { responseType: 'json' })
    )
  } catch {
    return []
  }
}

async function main () {
  const sourceMeta = getFilesData(await getMeta(argv.from ?? 'latest'))
  const targetMeta = getFilesData(await getMeta(argv.to ?? 'local'))
  const diffs      = ohash.diff(sourceMeta, targetMeta)
  const changelogs = groupBy(sortBy(diffs, ['type', 'key']), 'type')

  if (Object.keys(changelogs).length > 0) {
    for (const [type, items] of Object.entries(changelogs)) {
      console.log(`\n### ${startCase(type)}\n`)

      const logs = groupBy(items, (item) => item.key.split('/').at(0))

      for (const [group, items] of Object.entries(logs)) {
        if (items.length === 4)
          console.log(`- ${group}`)
        else {
          for (const item of items)
            console.log(`- ${(item.key as string).replace('.hash', '')}`)
        }
      }
    }
  } else
    console.log('Nothing Changed')
}

void main()
