import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addComponentsDir,
  extendViteConfig,
  addPluginTemplate,
} from '@nuxt/kit'
import path from 'pathe'

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
  /**
   * Use local pdf worker
   * @default false
   */
  useLocalPdfWorker?: boolean,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name         : '@privyid/persona',
    configKey    : 'persona',
    compatibility: { nuxt: '>=3.0.0' },
  },
  defaults: {
    font             : true,
    prefix           : 'p',
    useLocalPdfWorker: false,
  },
  async setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Add font CDN
    if (options.font) {
      nuxt.options.app.head.link?.push(
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel        : 'preconnect',
          href       : 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap' },
      )
    }

    // Add Components
    await addComponentsDir({
      path      : resolve('./components'),
      pathPrefix: false,
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
        '@jill64/universal-sanitizer',
        'scroll-into-view',
        'webfontloader',
        'zxcvbn',
        'pdfjs-dist',
        'pdfjs-dist/web/pdf_viewer',
        'vuedraggable',
      )
    })

    // Use local pdf worker
    if (options.useLocalPdfWorker) {
      nuxt.hook('nitro:config', async (nitroConfig) => {
        // eslint-disable-next-line align-assignments/align-assignments
        nitroConfig.publicAssets ||= []

        // eslint-disable-next-line unicorn/prefer-module
        const pdfjsDir                 = path.dirname(require.resolve('pdfjs-dist'))
        const { default: { version } } = await import('pdfjs-dist/package.json')
        const pdfjsBaseUrl             = `_persona/pdjs-dist@${version}`

        const assetsMaxAge = 60 * 60 * 24 * 30

        nitroConfig.publicAssets.push(
          {
            baseURL: `${pdfjsBaseUrl}/build`,
            dir    : pdfjsDir,
            maxAge : assetsMaxAge,
          },
          {
            baseURL: `${pdfjsBaseUrl}/cmaps`,
            dir    : path.join(pdfjsDir, '../cmaps'),
            maxAge : assetsMaxAge,
          },
        )
      })

      addPluginTemplate({
        filename   : 'persona-local-pdf-worker.mjs',
        getContents: () => `
          import { setCDN } from '@privyid/persona/core'

          export default defineNuxtPlugin({
            name: 'persona-local-pdf-worker',
            dependsOn: ['persona-setup'],
            setup () {
              setCDN('/_persona/')
            },
          })
        `,
      })
    }
  },
})
