import { renderToString } from '@vue/test-utils'
import { vBindOnce, genId } from '.'

describe('genId', () => {
  it('should generate uniq id', () => {
    const a = genId()
    const b = genId()

    expect(a).not.toBe(b)
  })
})

describe('v-bind-once', () => {
  it('should bind attribute on ssr', async () => {
    const uid     = genId()
    const content = await renderToString({
      template  : '<span v-bind-once:id="uid" />',
      directives: { bindOnce: vBindOnce },
      setup () {
        return { uid }
      },
    })

    expect(content).toBe(`<span id="${uid}"></span>`)
  })

  it('should not bind attribute on ssr if value is empty', async () => {
    const content = await renderToString({
      template  : '<span v-bind-once:id />',
      directives: { bindOnce: vBindOnce },
    })

    expect(content).toBe('<span></span>')
  })
})
