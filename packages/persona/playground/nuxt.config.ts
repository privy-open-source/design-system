import { defineNuxtConfig } from 'nuxt'
import PersonaModule from '..'
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  modules: [PersonaModule],
  alias  : { '@privyid/persona': fileURLToPath(new URL('../dist/', import.meta.url)) },
})
