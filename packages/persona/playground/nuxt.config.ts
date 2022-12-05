import PersonaModule from '..'
import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [PersonaModule],
  alias  : {
    '@privyid/persona/core'     : fileURLToPath(new URL('../../../src/core/', import.meta.url)),
    '@privyid/persona/directive': fileURLToPath(new URL('../../../src/directive/', import.meta.url)),
  },
})
