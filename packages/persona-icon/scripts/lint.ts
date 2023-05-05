/* eslint-disable unicorn/prefer-module */
/* eslint-disable unicorn/prefer-top-level-await */
import { readJSON } from 'fs-extra'
import { resolve } from 'node:path'
import { MetaData } from './types'
import console from 'signale'

const META_FILE = resolve(__dirname, '../icons/meta.json')

async function main () {
  const meta: MetaData[] = await readJSON(META_FILE)

  for (const object of meta) {
    if (object.files.length > 4)
      console.log('Unormally detect', object)
  }
}

void main()
