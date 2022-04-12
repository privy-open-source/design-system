
import { ref, Ref, createApp, h } from "vue-demi"
import ToastContainer from "./ToastContainer.vue"

export type ToastTypeVariant = 'info' | 'success' | 'warn' | 'error'

export type ToastStyleVariant = 'simple' | 'filled'

export interface ToastOption {
  type?: ToastTypeVariant,
  variant?: ToastStyleVariant,
  title: string,
  text: string,
  duration?: number,
  toastClass?: string | string[],
}

const instance: Ref<InstanceType<typeof ToastContainer>> = ref()

function useToast () {
  if (!instance.value) {
    const target = document.createElement('div')
    const app    = createApp({
      name  : 'ToastContainer',
      render: () => h(ToastContainer, { ref: instance })
    })

    document.body.appendChild(target)
    app.mount(target)
  }

  function add (option: ToastOption) {
    instance.value.add(option)
  }

  return {
    instance,
    add,
  }
}

export default function showToast (option: ToastOption) {
  useToast().add(option)
}
