import Fuse from 'fuse.js'
import {
  computed,
  Ref,
  shallowRef,
  watch,
} from 'vue-demi'
import { SelectItem } from '../use-select'
import { defineAdapter, useOptionsProp } from './adapter'

export default defineAdapter({
  setup ({ props, keyword }) {
    const fuse: Ref<Fuse<SelectItem>> = shallowRef()

    const normalizeOptions = useOptionsProp(props)
    const filteredOptions  = computed(() => {
      if (!keyword.value)
        return normalizeOptions.value

      return fuse.value.search(keyword.value).map((result) => {
        return result.item
      })
    })

    watch(normalizeOptions, (items) => {
      fuse.value = new Fuse(items, { keys: ['text', 'value'] })
    }, { immediate: true })

    return filteredOptions
  },
})
