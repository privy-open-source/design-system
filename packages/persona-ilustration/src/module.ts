import {
  defineNuxtModule,
  addComponentsDir,
  createResolver,
} from '@nuxt/kit'

export interface ModuleOptions {
  /**
   * Enable auto-import Icon's component
   * @default true
   */
  component: boolean,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name         : '@privyid/persona-ilustration',
    configKey    : 'personaIlustration',
    compatibility: { nuxt: '>=3.0.0' },
  },
  defaults: { component: true },
  async setup (options) {
    const { resolve } = createResolver(import.meta.url)

    if (options.component) {
      await addComponentsDir({
        path      : resolve('../vue'),
        prefix    : 'pil',
        extensions: ['vue'],
      })
    }
  },
})
