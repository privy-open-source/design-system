export default async function loadFont (font: string): Promise<void> {
  const WebFont = await import('webfontloader')

  return await new Promise<void>((resolve, reject) => {
    WebFont.load({
      google: { families: [font] },
      fontactive (_familyName, _fvd) {
        resolve()
      },
      fontinactive () {
        reject(new Error('FONTLOADER_TIMEOUT'))
      },
    })
  })
}
