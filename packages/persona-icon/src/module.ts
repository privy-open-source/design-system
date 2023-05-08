import {
  defineNuxtModule,
  addComponentsDir,
  createResolver,
} from '@nuxt/kit'

export default defineNuxtModule({
  meta: { name: '@privyid/icons' },
  async setup () {
    const { resolve } = createResolver(import.meta.url)

    await addComponentsDir({
      path      : resolve('../vue'),
      prefix    : 'pi',
      extensions: ['vue'],
    })
  },
})
