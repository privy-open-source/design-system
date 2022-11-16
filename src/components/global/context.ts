import defu from 'defu'
import { shallowReactive, toRef } from 'vue-demi'

type Lang = 'id' | 'en'

/**
 * Simple vuex store for global configuaration
 */
export interface AppContext {
  /* Language setting */
  lang: Lang,
}

let appContext: AppContext

export function initAppContext (context?: Partial<AppContext>) {
  appContext = shallowReactive(defu(context, { lang: 'en' }) as AppContext)
}

export function useAppContext () {
  return appContext
}

export function setLang (lang: Lang) {
  appContext.lang = lang
}

export function useLang () {
  return toRef(appContext, 'lang')
}
