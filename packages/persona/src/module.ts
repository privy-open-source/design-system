import { fileURLToPath } from 'node:url'
import { defineNuxtModule, installModule } from '@nuxt/kit'
import preset from '@privyid/tailwind-preset'

export default defineNuxtModule({
  meta: {
    name     : '@privyid/persona',
    configKey: 'persona',
  },
  defaults: {},
  hooks   : {
    'components:dirs' (dirs) {
      // Add ./components dir to the list
      dirs.push({
        path  : fileURLToPath(new URL('components', import.meta.url)),
        prefix: 'p',
      })
    },
  },
  async setup () {
    await installModule('@nuxtjs/tailwindcss', { config: { presets: [preset] } })
  },
})
