import { fileURLToPath } from 'node:url'
import { defineNuxtModule, installModule } from '@nuxt/kit'
import preset from '@privyid/tailwind-preset'

export interface ModuleOptions {
  /**
   * Include font, default: true
   */
  font: boolean,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name     : '@privyid/persona',
    configKey: 'persona',
  },
  defaults: { font: true },
  hooks   : {
    'components:dirs' (dirs) {
      // Add ./components dir to the list
      dirs.push({
        path      : fileURLToPath(new URL('components', import.meta.url)),
        prefix    : 'p',
        extensions: ['vue'],
      })
    },
  },
  async setup (options, nuxt) {
    nuxt.options.alias['@carbon/icons-vue/lib'] = '@carbon/icons-vue/es'

    if (options.font) {
      nuxt.options.head.link.push(
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel        : 'preconnect',
          href       : 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap' },
      )
    }

    await installModule('@nuxtjs/tailwindcss', { config: { presets: [preset] } })
  },
})
