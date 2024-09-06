import PersonaModule from '../src/module'
import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules   : ['@nuxtjs/tailwindcss', PersonaModule],
  alias     : { '@privyid/persona': fileURLToPath(new URL('../dist/', import.meta.url)) },
  typescript: {
    tsConfig: {
      compilerOptions: {
        strict          : false,
        strictNullChecks: true,
      },
    },
  },
})
