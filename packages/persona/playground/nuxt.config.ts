import PersonaModule from '..'
import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [PersonaModule],
  alias  : { '@privyid/persona': fileURLToPath(new URL('../dist/', import.meta.url)) },
})
