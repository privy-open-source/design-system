import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-10-03',
  modules          : ['@nuxtjs/tailwindcss', '../src/module'],
  alias            : { '@privyid/persona': fileURLToPath(new URL('../dist/', import.meta.url)) },
  typescript       : {
    includeWorkspace: true,
    tsConfig        : {
      compilerOptions: {
        strict          : false,
        strictNullChecks: true,
      },
    },
  },
  persona: { useLocalPdfWorker: true },
})
