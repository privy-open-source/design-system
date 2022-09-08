import { tryOnMounted } from '@vueuse/shared'
import { SelectItem } from '../use-select'
import { defineAdapter } from './adapter'
import { onFinishTyping, onStartTyping } from '../utils/use-on-typing'
import {
  getCurrentInstance,
  ref,
  watch,
} from 'vue-demi'
import { onScrollBottom } from '../utils/use-on-scroll'

export type LoadFn = (keyword: string, page: number, perPage: number) => Promise<SelectItem[]>

export type WatchDeps = Parameters<typeof watch>[0]

export default function defineAsyncAdapter (loadFn: LoadFn, deps?: WatchDeps) {
  return defineAdapter({
    setup ({ isLoading, keyword }) {
      const options  = ref([])
      const page     = ref(1)
      const isFinish = ref(false)
      const isTyping = ref(false)

      const vm      = getCurrentInstance()
      const menuDiv = ref<HTMLDivElement>()

      function load () {
        isLoading.value = true

        loadFn(keyword.value, page.value, 20)
          .then((result) => {
            if (Array.isArray(result) && result.length > 0) {
              options.value.push(...result)
              page.value++
            } else
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
        if (vm?.proxy?.$el) {
          menuDiv.value = (vm.proxy.$el as HTMLElement)
            .querySelector('.dropdown__menu')
        }

        load()
      })

      onStartTyping(keyword, () => {
        isTyping.value = true

        reset()
      })

      onFinishTyping(keyword, () => {
        isTyping.value = false

        load()
      })

      watch(isTyping, (value) => {
        isLoading.value = value
      })

      onScrollBottom(menuDiv, () => {
        if (!isLoading.value && !isFinish.value)
          load()
      })

      return options
    },
  })
}
