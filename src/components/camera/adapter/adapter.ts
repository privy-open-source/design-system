import { Ref } from 'vue-demi'

export interface CameraContext {
  video: Ref<HTMLVideoElement>,
  stream: Ref<MediaStream>,
  notify: (message: string) => void,
}

export type MaskVariant = 'square' | 'circle' | 'ektp' | 'none'

export type MirrorMode = boolean | 'preview' | 'all'

export interface Adapter {
  meta?: {
    transformable?: boolean,
    /**
     * Auto take an image
     * It will start processing when camera started.
     */
    autoStart?: boolean,
    /**
     * If prop mask not set, it will use this
     */
    mask?: MaskVariant,
    /**
     * If prop mirror not set, it will use this
     */
    mirror?: MirrorMode,
    /**
     * If prop facingMode not set, it will use this
     */
    facingMode?: ConstrainDOMString,
  },
  run: (context: CameraContext) => string | string[] | Promise<string | string[]>,
}

export function defineAdapter (adapter: Adapter): Adapter {
  return adapter
}
