import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addComponentsDir,
  extendViteConfig,
} from '@nuxt/kit'

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
    name         : '@privyid/persona',
    configKey    : 'persona',
    compatibility: { nuxt: '>=3.0.0' },
  },
  defaults: { font: true, prefix: 'p' },
  async setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Add alias to unsupported ESM package
    nuxt.options.alias['@carbon/icons-vue/lib'] = '@carbon/icons-vue/es'

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

    // Add Components
    await addComponentsDir({
      path      : resolve('./components'),
      prefix    : options.prefix,
      extensions: ['vue'],
    })

    // Add Plugin
    addPlugin({ src: resolve('./runtime/plugin') })

    // Extend vite config
    extendViteConfig((config) => {
      config.optimizeDeps?.exclude?.push('@privyid/persona')
      config.optimizeDeps?.include?.push(
        '@testing-library/user-event',
        'interactjs',
        'sanitize-html',
        'scroll-into-view',
        'webfontloader',
        'zxcvbn',
        'pdfjs-dist',
        'pdfjs-dist/web/pdf_viewer',
      )
    })
  },
})
