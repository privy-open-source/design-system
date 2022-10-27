import {
  createPopper,
  Instance as Popper,
  Placement,
} from '@popperjs/core'
import { tryOnMounted, tryOnUnmounted } from '@vueuse/shared'
import {
  shallowRef,
  Ref,
  watch,
} from 'vue-demi'

export type PopperParameters = Parameters<typeof createPopper>
export type PoppperOption = PopperParameters[2]

export type {
  Placement,
} from '@popperjs/core'

export function usePopper (reference: Ref<PopperParameters[0]>, menu: Ref<PopperParameters[1]>, placement: Ref<Placement>) {
  const popper = shallowRef<Popper>()

  function init () {
    popper.value = createPopper(reference.value, menu.value, {
      placement: placement.value,
      modifiers: [
        {
          name   : 'offset',
          options: { offset: [0, 6] },
        },
        { name: 'preventOverflow' },
        { name: 'arrow', options: { padding: 12 } },
      ],
    })
  }

  tryOnMounted(() => {
    if (reference.value)
      init()
  })

  watch(reference, (target) => {
    if (target) {
      if (popper.value) {
        popper.value.state.elements.reference = target
        popper.value.forceUpdate()
      } else
        init()
    }
  })

  watch(placement, async (value) => {
    if (popper.value)
      await popper.value.setOptions({ placement: value })
  })

  tryOnUnmounted(() => {
    if (popper.value !== undefined)
      popper.value.destroy()
  })

  return popper
}
