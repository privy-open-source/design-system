import type { RouteLocationRaw } from 'vue-router'
/**
 * Universal router which compatible in many enviroment
 */
interface RouterCompat {
  /**
   * redirect to URL
   */
  toURL: (url: RouteLocationRaw) => unknown | Promise<unknown>,
  /**
    * Get current URL
    */
  getURL: () => string,
}

let appRouter: RouterCompat

/**
 * Init router compat
 * @param router RouterInstance
 */
export function installRouter (router: RouterCompat) {
  appRouter = router
}

/**
 * Use Router Compat
 */
export function useRouter (): RouterCompat {
  return appRouter
}
