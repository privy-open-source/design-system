import { defineNuxtPlugin, useRouter } from '#imports'
import { initAppContext, installRouter } from '@privyid/persona/core'

export default defineNuxtPlugin(() => {
  const router = useRouter()

  initAppContext()
  installRouter({
    getURL () {
      return router.currentRoute.value.fullPath
    },
    toURL (url: string) {
      return router.push(url)
    },
  })
})
