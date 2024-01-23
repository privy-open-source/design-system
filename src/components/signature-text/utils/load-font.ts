import PQueue from '../../global/utils/queue'

const queue      = new PQueue()
const loadedFont = new Set<string>()

export default async function loadFont (font: string): Promise<void> {
  return await queue.add(async () => {
    if (!loadedFont.has(font)) {
      const WebFont = await import('webfontloader')

      return await new Promise((resolve, reject) => {
        WebFont.load({
          google: { families: [font] },
          fontactive () {
            loadedFont.add(font)

            resolve()
          },
          fontinactive () {
            reject(new Error('FONTLOADER_TIMEOUT'))
          },
        })
      })
    }
  })
}
