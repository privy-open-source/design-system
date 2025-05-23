/* eslint-disable unicorn/prefer-module */
import { type BuildContext } from 'unbuild'
import {
  extname,
  basename,
  resolve,
} from 'node:path'
import fse from 'fs-extra'

export async function createResolver (context: BuildContext) {
  const meta: Record<string, string> = {}

  for (const file of context.buildEntries) {
    const ext  = extname(file.path)
    const name = basename(file.path, ext)

    if (ext === '.vue')
      meta[`P${name}`] = file.path
  }

  await fse.ensureFile(resolve(__dirname, '../dist/components/meta.json'))
  await fse.writeJSON(resolve(__dirname, '../dist/components/meta.json'), meta, { spaces: 2 })
}
