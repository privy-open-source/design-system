import {
  defineNuxtPlugin,
  useRouter,
  useRuntimeConfig,
} from '#imports'
import type { State } from '@privyid/persona/core'
import {
  initStore,
  installRouter,
  setCDN,
} from '@privyid/persona/core'
import { joinURL, isRelative } from 'ufo'

export default defineNuxtPlugin({
  name : 'persona-plugin',
  setup: (nuxtApp) => {
    const router = useRouter()
    const store  = initStore()
    const config = useRuntimeConfig()

    installRouter({
      getURL () {
        return router.currentRoute.value.fullPath
      },
      async toURL (url: string) {
        return await router.push(url)
      },
    })

    // Set CDN to self host
    if (config.public.persona.cdnURL) {
      const cdnURL = isRelative(config.public.persona.cdnURL)
        ? joinURL(config.app.baseURL, config.public.persona.cdnURL)
        : config.public.persona.cdnURL

      setCDN(cdnURL)
    }

    // SSR Store & Hydrate
    if (import.meta.server)
      nuxtApp.payload.persona = store.value
    else if (nuxtApp.payload?.persona)
      store.value = nuxtApp.payload.persona as State
  },
})
