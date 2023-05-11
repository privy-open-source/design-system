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
  /**
   * Enable fonticon
   * @default false
   */
  fonticon: boolean,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name         : '@privyid/icon',
    configKey    : 'personaIcon',
    compatibility: { nuxt: '>=3.0.0' },
  },
  defaults: {
    component: true,
    fonticon : false,
  },
  async setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    if (options.component) {
      await addComponentsDir({
        path      : resolve('../vue'),
        prefix    : 'pi',
        extensions: ['vue'],
      })
    }

    if (options.fonticon)
      nuxt.options.css.push(resolve('../font/persona-icon.css'))
  },
})
