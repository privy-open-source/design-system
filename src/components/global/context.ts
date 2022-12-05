import defu from 'defu'
import { reactive, toRef } from 'vue-demi'

type Lang = 'id' | 'en'

/**
 * Simple vuex-like-store for global configuaration
 */
export interface AppContext {
  /* Language setting */
  lang: Lang,
}

let appContext: AppContext = reactive({ lang: 'en' })

export function initAppContext (context?: Partial<AppContext>) {
  appContext = reactive(defu(context, { lang: 'en' }) as AppContext)
}

export function useAppContext () {
  return appContext
}

export function setLang (lang: Lang) {
  appContext.lang = lang
}

export function getLang () {
  return appContext.lang
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
  return toRef(appContext, 'lang')
}
