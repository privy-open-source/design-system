import {
  ref,
  type InjectionKey,
  type Ref,
} from 'vue-demi'

interface PopoverContext {
  hide: () => void,
  show: () => void,
  toggle: () => void,
  isShow: Ref<boolean>,
}

export const POPOVER_CONTEXT: InjectionKey<PopoverContext> = Symbol('POPOVER_CONTEXT')

export function usePopoverPromise<R = any> () {
  const promise = ref<Promise<R>>()
  const resolve = ref<(result: R) => void>()
  const reject  = ref<(error?: Error) => void>()
  const isShow  = ref(false)

  function bind () {
    return {
      modelValue: isShow.value,
      'onUpdate:modelValue' (value: boolean) {
        if (resolve.value && !value)
          finish()

        isShow.value = value
      },
    }
  }

  async function start (): Promise<R | undefined> {
    if (!promise.value) {
      promise.value = new Promise<R>((_resolve, _reject) => {
        resolve.value = _resolve
        reject.value  = _reject
      })
    }

    let result: R | undefined

    try {
      isShow.value = true
      result       = await promise.value
    } finally {
      promise.value = undefined
      resolve.value = undefined
      reject.value  = undefined
      isShow.value  = false
    }

    return result
  }

  function finish (result?: R | Error) {
    if (resolve.value && reject.value) {
      if (result instanceof Error)
        reject.value(result)
      else
        resolve.value(result)
    }
  }

  return {
    start,
    finish,
    bind,
  }
}
