import { defineNuxtPlugin, useRouter } from '#imports'
import type { State } from '@privyid/persona/core'
import {
  initStore,
  installRouter,
} from '@privyid/persona/core'

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const store  = initStore()

  installRouter({
    getURL () {
      return router.currentRoute.value.fullPath
    },
    async toURL (url: string) {
      return await router.push(url)
    },
  })

  // SSR Store & Hydrate
  if (process.server)
    nuxtApp.payload.persona = store.value
  else if (nuxtApp.payload?.persona)
    store.value = nuxtApp.payload.persona as State
})
