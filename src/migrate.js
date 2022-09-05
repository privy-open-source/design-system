const fs   = require('fs-extra')
const path = require('node:path')
const glob = require('glob')

function main () {
  glob(path.resolve(__dirname, './components/**/guide.md'), async (error, files) => {
    if (error) {
      console.error(error)

      return
    }

    for (const file of files) {
      const name = path.basename(path.dirname(file))

      await fs.move(file, path.resolve(__dirname, './styleguide', name, 'index.md'))
    }
  })
}

main()
