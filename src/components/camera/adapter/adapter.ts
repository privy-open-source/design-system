import { ComputedRef, Ref } from 'vue-demi'

export type MaskVariant = 'square' | 'round' | 'ektp' | 'none'

export type MirrorMode = boolean | 'preview' | 'all'

export interface ModelModifier {
  base64: boolean,
}

export interface AdapterMeta {
  /**
   * Auto take an image
   * It will start processing when camera started.
   */
  autoStart: boolean,
  /**
   * Default value for props `facingMode`
   */
  mask: MaskVariant,
  /**
   * Default value for props `mirror`
   */
  mirror: MirrorMode,
  /**
   * Default value for props `facingMode`
   */
  facingMode: ConstrainDOMString,
}

export interface CameraContext {
  video: Ref<HTMLVideoElement>,
  stream: Ref<MediaStream>,
  modifier: Ref<ModelModifier>,
  meta: ComputedRef<AdapterMeta>,
  toast: (message: string) => void,
}

export interface CameraResult {
  preview: string,
  result: string | string[] | globalThis.File | globalThis.File[],
}

export interface Adapter {
  meta?: Partial<AdapterMeta>,
  run: (context: CameraContext) => CameraResult | Promise<CameraResult>,
}

export function defineAdapter (adapter: Adapter): Adapter {
  return adapter
}
