import type { HTMLAttributes } from 'vue-demi'

export interface AdditionalAttr extends HTMLAttributes {
  [key: string]: unknown,
}
