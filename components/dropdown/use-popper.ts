import { createPopper, Instance as Popper } from '@popperjs/core'
import { tryOnMounted, tryOnUnmounted } from '@vueuse/shared'
import { shallowRef, Ref } from 'vue-demi'

export type PopperParameters = Parameters<typeof createPopper>
export type PoppperOption = PopperParameters[2]

export function usePopper (reference: Ref<PopperParameters[0]>, menu: Ref<PopperParameters[1]>, options: PoppperOption = {}) {
  const popper = shallowRef<Popper>()

  tryOnMounted(() => {
    popper.value = createPopper(reference.value, menu.value, options)
  })

  tryOnUnmounted(() => {
    if (popper.value != null)
      popper.value.destroy()
  })

  return popper
}
