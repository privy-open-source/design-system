import { createPopper, Instance as Popper } from "@popperjs/core"
import { tryOnMounted, tryOnUnmounted } from "@vueuse/shared"
import { ref, Ref } from "vue-demi"

export type PopperParameters = Parameters<typeof createPopper>
export type PoppperOption    = PopperParameters[2]

export function usePopper (reference: Ref<PopperParameters[0]>, menu: Ref<PopperParameters[1]>, options: PoppperOption = {}) {
  const popper = ref<Popper>()

  tryOnMounted(() => {
    popper.value = createPopper(reference.value, menu.value, options)
  })

  tryOnUnmounted(() => {
    if (popper.value)
      popper.value.destroy()
  })

  return popper
}
