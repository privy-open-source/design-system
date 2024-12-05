import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addComponentsDir,
  extendViteConfig,
} from '@nuxt/kit'
import { join as joinPath } from 'pathe'
import { defu } from 'defu'
import { joinURL } from 'ufo'
import { version as PDFJS_VERSION } from 'pdfjs-dist/legacy/build/pdf.mjs'
import { version as PSPDFKIT_VERSION } from 'pspdfkit/package.json'

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

export interface ModulePublicRuntimeConfig {
  persona: {
    cdnURL: string,
  },
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name         : '@privyid/persona',
    configKey    : 'persona',
    compatibility: { nuxt: '>=3.4.0' },
  },
  defaults: {
    font             : true,
    prefix           : 'p',
    useLocalPdfWorker: false,
  },
  async setup (options, nuxt) {
    const { resolve, resolvePath } = createResolver(import.meta.url)

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
    addPlugin({ src: resolve('./runtime/plugins/persona') })

    // Extend vite config
    extendViteConfig((config) => {
      config.optimizeDeps = {
        ...config.optimizeDeps,
        exclude: [...config.optimizeDeps?.exclude ?? [], '@privyid/persona'],
        include: [
          ...config.optimizeDeps?.include ?? [],
          '@testing-library/user-event',
          'interactjs',
          '@jill64/universal-sanitizer',
          'scroll-into-view',
          'webfontloader',
          'zxcvbn',
          'pdfjs-dist',
          'pdfjs-dist/web/pdf_viewer',
          'vuedraggable',
        ],
      }
    })

    // Use local pdf worker
    if (options.useLocalPdfWorker) {
      nuxt.options.runtimeConfig.public.persona = defu(
        { cdnURL: './_persona' },
        nuxt.options.runtimeConfig.public.persona,
      )

      nuxt.hook('nitro:config', async (nitroConfig) => {
        // eslint-disable-next-line align-assignments/align-assignments
        nitroConfig.publicAssets ||= []

        const baseURL      = '_persona'
        const pdfjsDir     = joinPath(await resolvePath('pdfjs-dist'), '../../')
        const pdfjsBaseURL = joinURL(baseURL, `pdfjs-dist@${PDFJS_VERSION}`)

        const pspdfDir     = joinPath(await resolvePath('pspdfkit'), '../../')
        const pspdfBaseURL = joinURL(baseURL, `pspdfkit@${PSPDFKIT_VERSION}`)

        const assetsMaxAge = 60 * 60 * 24 * 30 // 1 month

        nitroConfig.publicAssets.push(
          {
            baseURL: joinURL(pdfjsBaseURL, 'build'),
            dir    : joinPath(pdfjsDir, 'build'),
            maxAge : assetsMaxAge,
          },
          {
            baseURL: joinURL(pdfjsBaseURL, 'legacy'),
            dir    : joinPath(pdfjsDir, 'legacy'),
            maxAge : assetsMaxAge,
          },
          {
            baseURL: joinURL(pdfjsBaseURL, 'cmaps'),
            dir    : joinPath(pdfjsDir, 'cmaps'),
            maxAge : assetsMaxAge,
          },
          {
            baseURL: joinURL(pspdfBaseURL, 'dist'),
            dir    : joinPath(pspdfDir, 'dist'),
            maxAge : assetsMaxAge,
          },
        )
      })
    }
  },
})
