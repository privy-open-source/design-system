import type { Ref } from 'vue-demi'
import { computed } from 'vue-demi'
import type { SelectItem, SelectProps } from '..'

export interface AdapterContext {
  props: SelectProps,
  keyword: Ref<string>,
  isOpen: Ref<boolean>,
  isLoading: Ref<boolean>,
  menuEl: Ref<HTMLDivElement>,
}

export interface Adapter {
  setup: (context: AdapterContext) => Ref<SelectItem[]>,
}

/**
 * normalizing props.options to SelectItem[]
 */
export function useOptionsProp (props: Pick<SelectProps, 'options'>) {
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
