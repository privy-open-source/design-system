import type PSPDFKIT from 'pspdfkit'

type RectangleAnnotation = typeof PSPDFKIT.Annotations.RectangleAnnotation

type Rect = typeof PSPDFKIT.Geometry.Rect

type ViewState = typeof PSPDFKIT.ViewState

type Color = typeof PSPDFKIT.Color

let pspdfkitLib: typeof PSPDFKIT

export async function importPSPDFKit (): Promise<typeof PSPDFKIT> {
  if (!pspdfkitLib) {
    const { default: PSPDFKit } = await import('pspdfkit')

    if (!Object.isFrozen(PSPDFKit.Options)) {
      PSPDFKit.Options.SELECTION_OUTLINE_PADDING  = () => 0
      PSPDFKit.Options.SELECTION_STROKE_WIDTH     = 2
      PSPDFKit.Options.DISABLE_KEYBOARD_SHORTCUTS = true
    }

    pspdfkitLib = PSPDFKit
  }

  return pspdfkitLib
}

export async function importRectangleAnnotation (): Promise<typeof PSPDFKIT.Annotations.RectangleAnnotation> {
  await importPSPDFKit()

  return pspdfkitLib.Annotations.RectangleAnnotation
}

export async function importList (): Promise<typeof PSPDFKIT.Immutable.List> {
  await importPSPDFKit()

  return pspdfkitLib.Immutable.List
}

export async function getVersion () {
  await importPSPDFKit()

  return pspdfkitLib.version
}

export async function createViewer (...params: Parameters<typeof PSPDFKIT.load>) {
  await importPSPDFKit()

  return await pspdfkitLib.load(...params)
}

export async function destroyViewer (...params: Parameters<typeof PSPDFKIT.unload>) {
  await importPSPDFKit()

  return pspdfkitLib.unload(...params)
}

export async function generateInstantId () {
  await importPSPDFKit()

  return pspdfkitLib.generateInstantId()
}

export async function createRectangleAnnotation (...params: ConstructorParameters<RectangleAnnotation>): Promise<InstanceType<RectangleAnnotation>> {
  await importPSPDFKit()

  return new pspdfkitLib.Annotations.RectangleAnnotation(...params)
}

export async function createRect (...params: ConstructorParameters<Rect>): Promise<InstanceType<Rect>> {
  await importPSPDFKit()

  return new pspdfkitLib.Geometry.Rect(...params)
}

export async function createViewState (...params: ConstructorParameters<ViewState>): Promise<InstanceType<ViewState>> {
  await importPSPDFKit()

  return new pspdfkitLib.ViewState(...params)
}

export async function createColor (...params: ConstructorParameters<Color>): Promise<InstanceType<Color>> {
  await importPSPDFKit()

  return new pspdfkitLib.Color(...params)
}
