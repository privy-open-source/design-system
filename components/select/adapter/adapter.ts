import { computed, Ref } from 'vue-demi'
import { SelectItem, SelectProps } from '../use-select'

export interface AdapterContext {
  props: SelectProps,
  keyword: Ref<string>,
  isOpen: Ref<boolean>,
  isLoading: Ref<boolean>,
}

export interface Adapter {
  setup: (context: AdapterContext) => Ref<SelectItem[]>,
}

/**
 * normalizing props.options to SelectItem[]
 */
export function useOptionsProp (props: SelectProps) {
  return computed(() => {
    if (Array.isArray(props.options)) {
      return props.options.map((item: SelectItem | string) => {
        if (typeof item === 'string') {
          return {
            text : item,
            value: item,
          }
        }

        return item
      })
    }

    return []
  })
}

export function defineAdapter (adapter: Adapter): Adapter {
  return adapter
}
