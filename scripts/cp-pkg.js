/* eslint-disable unicorn/prefer-top-level-await */
import minimist from 'minimist'
import fse from 'fs-extra'
import path from 'node:path'

async function main () {
  const argv                = minimist(process.argv.slice(2))
  const [packageName, dest] = argv._

  const baseDir     = path.resolve(process.cwd(), 'node_modules', packageName)
  const packageJSON = await fse.readJSON(path.join(baseDir, 'package.json'))
  const destDir     = path.resolve(process.cwd(), dest, `${packageName}@${packageJSON.version}`)

  await fse.copy(baseDir, destDir)
}

main()
