import { computed } from 'vue-demi'
import { defineAdapter, useOptionsProp } from './adapter'

/**
 * Filter options using simple .include search algorithm
 */
export default defineAdapter({
  setup ({ props, keyword }) {
    const options  = useOptionsProp(props)
    const filtered = computed(() => {
      return options.value.filter((item) => {
        return item.text
          .toLowerCase()
          .includes(keyword.value.toLowerCase())
      })
    })

    return filtered
  },
})
