/* eslint-disable no-console */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable unicorn/prefer-top-level-await */
import { readJSON } from 'fs-extra'
import { resolve } from 'node:path'
import type { MetaData } from './types'

const META_FILE = resolve(__dirname, '../svg/meta.json')

async function main () {
  const meta: MetaData[] = await readJSON(META_FILE)

  for (const object of meta) {
    if (object.files.length > 4)
      console.log('Unormally detect', object)
  }
}

void main()
