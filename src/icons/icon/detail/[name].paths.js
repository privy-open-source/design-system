import fse from 'fs-extra'
import path from 'node:path'

export default {
  async paths () {
    const meta = await fse.readJSON(path.resolve(__dirname, '../../../../packages/persona-icon/svg/meta.json'))

    return meta.map((item) => {
      return { params: { name: item.folder } }
    })
  },
}
