import { tryOnMounted } from '@vueuse/shared'
import type { SelectItem } from '..'
import { defineAdapter } from './adapter'
import { onFinishTyping, onStartTyping } from '../utils/use-on-typing'
import { ref, watch } from 'vue-demi'
import { onScrollBottom } from '../utils/use-on-scroll'
import defu from 'defu'

export type LoadFn = (keyword: string, page: number, perPage: number, value: unknown) => Promise<SelectItem[]>

export type WatchDeps = Parameters<typeof watch>[0]

export interface AsyncAdapterOptions {
  /**
   * Default perPage
   * @default 20
   */
  perPage: number,
  /**
   * Typing debounce time
   * @default 500
   */
  debounceTime: number,
}

export default function defineAsyncAdapter (loadFn: LoadFn, deps?: WatchDeps, opts?: Partial<AsyncAdapterOptions>) {
  const config = defu(opts, { perPage: 20, debounceTime: 500 })

  return defineAdapter({
    setup ({ isLoading, keyword, menuEl, props }) {
      const options  = ref([])
      const page     = ref(1)
      const isFinish = ref(false)
      const isTyping = ref(false)

      function load () {
        isLoading.value = true

        loadFn(keyword.value, page.value, config.perPage, props.modelValue)
          .then((result) => {
            if (Array.isArray(result) && result.length > 0) {
              options.value = [...options.value, ...result]
              page.value    = page.value + 1
            } else if (!Array.isArray(result) || result.length < config.perPage)
              isFinish.value = true
          })
          .catch(console.error)
          .finally(() => {
            isLoading.value = false
          })
      }

      function reset () {
        isFinish.value = false
        page.value     = 1
        options.value  = []
      }

      if (deps !== undefined) {
        watch(deps, () => {
          keyword.value = ''

          reset()
          load()
        })
      }

      tryOnMounted(() => {
        load()
      })

      onStartTyping(keyword, () => {
        isTyping.value = true

        reset()
      })

      onFinishTyping(keyword, () => {
        isTyping.value = false

        load()
      }, config.debounceTime)

      watch(isTyping, (value) => {
        isLoading.value = value
      })

      onScrollBottom(menuEl, () => {
        if (!isLoading.value && !isFinish.value)
          load()
      })

      return options
    },
  })
}
