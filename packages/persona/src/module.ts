import {
  defineNuxtModule,
  installModule,
  createResolver,
  addPlugin,
  addComponentsDir,
} from '@nuxt/kit'
import preset from '@privyid/tailwind-preset'

export interface ModuleOptions {
  /**
   * Include font
   * @default true
   */
  font?: boolean,
  /**
   * Component prefix
   * @default 'p'
   */
  prefix?: string,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name     : '@privyid/persona',
    configKey: 'persona',
  },
  defaults: { font: true, prefix: 'p' },
  hooks   : {
    'vite:extendConfig' (config) {
      config.optimizeDeps?.exclude?.push('@privyid/persona')
      config.optimizeDeps?.include?.push(
        'scroll-into-view',
        'isomorphic-dompurify',
        '@testing-library/user-event',
      )
    },
  },
  async setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Add alias to unsupported ESM package
    nuxt.options.alias['@carbon/icons-vue/lib'] = '@carbon/icons-vue/es'

    // Registering postcss plugin
    nuxt.options.postcss.plugins['postcss-hexrgba']        = nuxt.options.postcss.plugins['postcss-hexrgba'] ?? {}
    nuxt.options.postcss.plugins['tailwindcss/nesting']    = nuxt.options.postcss.plugins['tailwindcss/nesting'] ?? {}
    nuxt.options.postcss.plugins.tailwindcss               = nuxt.options.postcss.plugins.tailwindcss ?? {}
    nuxt.options.postcss.plugins['postcss-lighten-darken'] = nuxt.options.postcss.plugins['postcss-lighten-darken'] ?? {}
    nuxt.options.postcss.plugins.autoprefixer              = nuxt.options.postcss.plugins.autoprefixer ?? {}

    // Add font CDN
    if (options.font) {
      nuxt.options.app.head.link?.push(
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel        : 'preconnect',
          href       : 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap' },
      )
    }

    // Install tailwindcss
    await installModule('@nuxtjs/tailwindcss', { config: { presets: [preset] } })

    // Add Plugin
    addPlugin({ src: resolve('./runtime/plugin') })

    // Add Components
    await addComponentsDir({
      path      : resolve('./components'),
      prefix    : options.prefix,
      extensions: ['vue'],
    })
  },
})
