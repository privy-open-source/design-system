import { computed } from 'vue'
import { useEventListener } from '@vueuse/core'
import { tryOnMounted, watchDebounced } from '@vueuse/shared'
import {
  getCurrentInstance,
  ref,
  watch,
  WatchSource,
} from 'vue-demi'
import { SelectItem } from '../use-select'
import { defineAdapter } from './adapter'

export type LoadFn = (keyword: string, page: number, perPage: number) => Promise<SelectItem[]>

export interface AsyncHandler {
  load: LoadFn
  watch: WatchSource
}

export default function defineAsyncAdapter (handler: LoadFn | AsyncHandler) {
  return defineAdapter({
    setup ({ isLoading, keyword }) {
      const options  = ref([])
      const page     = ref(1)
      const isFinish = ref(false)
      const isTyping = ref(false)

      const vm      = getCurrentInstance()
      const menuDiv = ref<HTMLDivElement>()

      const loadFn = computed(() => {
        return typeof handler !== 'function' ? handler.load : handler
      })

      function load () {
        isLoading.value = true

        loadFn
          .value(keyword.value, page.value, 20)
          .then((result) => {
            if (result && result.length > 0) {
              options.value.push(...result)
              page.value++
            } else isFinish.value = true
          })
          .finally(() => {
            isLoading.value = false
          })
      }

      function reset () {
        isFinish.value = false
        page.value     = 1
        options.value  = []
      }

      watch(keyword, () => {
        isTyping.value = true

        reset()
      })

      watchDebounced(
        keyword,
        () => {
          isTyping.value = false

          load()
        },
        { debounce: 500 },
      )

      watch(isTyping, (value) => {
        // syncRef isTyping to isLoading
        isLoading.value = value
      })

      if (typeof handler !== 'function' && handler.watch) {
        watch(handler.watch, () => {
          reset()
          load()
        })
      }

      tryOnMounted(() => {
        menuDiv.value = (vm.proxy.$el as HTMLElement).querySelector('.dropdown__menu')

        load()
      })

      useEventListener(menuDiv, 'scroll', (event) => {
        const target   = event.target as HTMLDivElement
        const isBottom = (target.scrollTop + target.offsetHeight) >= target.scrollHeight

        if (isBottom && !isLoading.value && !isFinish.value)
          load()
      }, { passive: true })

      return options
    },
  })
}
