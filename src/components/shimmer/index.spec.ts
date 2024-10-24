import { renderToString } from '@vue/test-utils'
import { vBindOnce } from '.'
import { uniqueId } from 'lodash-es'

describe('v-bind-once', () => {
  it('should bind attribute on ssr', async () => {
    const uid     = uniqueId('shimmer')
    const content = await renderToString({
      template  : '<div v-bind-once:id="uid" />',
      directives: { bindOnce: vBindOnce },
      setup () {
        return { uid }
      },
    })

    expect(content).toBe(`<div id="${uid}"></div>`)
  })

  it('should not bind attribute on ssr if value is empty', async () => {
    const content = await renderToString({
      template  : '<div v-bind-once:id />',
      directives: { bindOnce: vBindOnce },
    })

    expect(content).toBe('<div></div>')
  })
})
