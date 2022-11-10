import { shallowReactive } from 'vue-demi'

/**
 * This is context for global app.
 * Main purpose is handle cross compability for different environment.
 * example: Vitepress and Nuxt 3 have different router,
 *  in Vitepress use `router.go()`
 *  but in Nuxt 3 use `navigateTo()`
 */
export interface AppContext {
  /**
   * redirect to URL
   */
  toURL: (url: string) => void | Promise<void>,
  /**
   * Get current URL
   */
  getURL: () => string,
}

let appContext: AppContext

export function initAppContext (context: AppContext) {
  appContext = shallowReactive(context)
}

export function useAppContext () {
  return appContext
}
