import {
  Ref,
  effectScope,
  ref,
  toRef,
} from 'vue-demi'

type Lang = 'id' | 'en'

/**
 * Simple vuex-like-store for global configuration
 */
export interface State {
  /* Language setting */
  lang: Lang,
}

let globalState: Ref<State>

export function createStore (): Ref<State> {
  const scope = effectScope(true)
  const state = scope.run(() => ref<State>({ lang: 'en' }))

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

export function useStore () {
  return globalState
}

export function setLang (lang: Lang) {
  globalState.value.lang = lang
}

export function getLang () {
  return globalState?.value.lang ?? 'en'
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
