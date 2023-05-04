/* eslint-disable unicorn/prefer-module */
/* eslint-disable unicorn/prefer-top-level-await */
import { readJSON } from 'fs-extra'
import { resolve } from 'node:path'
import { MetaData } from './types'
import { unionBy } from 'lodash-es'
import console from 'signale'

const META_FILE = resolve(__dirname, '../icons/meta.json')

async function main () {
  const meta: MetaData[] = await readJSON(META_FILE)
  const uniq             = unionBy(meta, 'name')

  if (uniq.length !== meta.length) {
    for (const a of uniq) {
      const check = meta.filter((b) => a.name === b.name || b.aliases.includes(a.name))

      if (check.length > 1)
        console.warn('Name conflict detected', a.name, check)
    }
  }
}

void main()
