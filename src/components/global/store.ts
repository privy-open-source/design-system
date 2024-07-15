import type { Ref } from 'vue-demi'
import {
  effectScope,
  ref,
  toRef,
} from 'vue-demi'
import type { LiteralUnion } from 'type-fest'

type Lang = LiteralUnion<'id' | 'en', string>

const LANG_DEFAULT = 'en'
const CDN_DEFAULT  = 'https://unpkg.com/'

/**
 * Simple vuex-like-store for global configuration
 */
export interface State {
  /**
   * Language
   */
  lang: Lang,
  /**
   * PDFJS & PSPDFKIT CDN base url
   */
  cdnURL: string,
  /**
   * PSPDF Global config
   */
  pspdfkit: {
    /**
     * License Key
     */
    licenseKey?: string,
  },
}

let globalState: Ref<State>

export function createStore (): Ref<State> {
  const scope = effectScope(true)
  const state = scope.run(() => ref<State>({
    lang    : LANG_DEFAULT,
    cdnURL  : CDN_DEFAULT,
    pspdfkit: {},
  }))

  return state
}

export function setStore (state: Ref<State>) {
  globalState = state
}

export function initStore (): Ref<State> {
  const store = createStore()

  setStore(store)

  return store
}

export function destroyStore () {
  globalState = undefined
}

export function useStore () {
  return globalState
}

export function setLang (lang: Lang) {
  globalState.value.lang = lang
}

export function getLang () {
  return globalState?.value.lang ?? LANG_DEFAULT
}

export function getCDN () {
  return globalState?.value.cdnURL ?? CDN_DEFAULT
}

export function setCDN (url: string) {
  globalState.value.cdnURL = url
}

export function getPSPDFLicenseKey () {
  return globalState?.value.pspdfkit?.licenseKey
}

export function setPSPDFLicenseKey (licenseKey: string) {
  globalState.value.pspdfkit.licenseKey = licenseKey
}

/**
 * Return reactive global lang setting
 * @example
 * const lang = useLang()
 *
 * // set lang
 * lang.value = 'en'
 *
 * // get lang
 * console.log(lang.value)
 */
export function useLang () {
  return toRef(globalState.value, 'lang')
}
