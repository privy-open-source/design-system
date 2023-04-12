import PersonaModule from '..'
import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'
import preset from '@privyid/tailwind-preset'

export default defineNuxtConfig({
  modules   : [['@nuxtjs/tailwindcss', { config: { presets: [preset] } }], PersonaModule],
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
