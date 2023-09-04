import {
  MaybeRef,
  useElementBounding,
  useWindowSize,
} from '@vueuse/core'
import {
  computed,
  Ref,
  ref,
  unref,
  watchEffect,
} from 'vue-demi'

export interface StickyOptions {
  offsetTop: MaybeRef<number>,
}

export function useSticky (target: Ref<HTMLElement>, options: Partial<StickyOptions> = {}) {
  const enable = ref(false)

  const offsetTop = computed(() => unref(options.offsetTop) ?? 0)
  const parent    = computed(() => unref(target)?.parentElement)

  const {
    top,
    height,
  } = useElementBounding(parent)

  const {
    top: targetTop,
    width,
    left,
  } = useElementBounding(target)

  const { height: windowHeight } = useWindowSize()

  watchEffect((onCleanup) => {
    if (enable.value && target.value) {
      if (top.value - offsetTop.value >= 0) {
        target.value.style.setProperty('height', `${windowHeight.value - targetTop.value}px`)
        target.value.style.setProperty('width', '100%')
      } else {
        parent.value.style.setProperty('min-height', `${height.value}px`)

        target.value.style.setProperty('position', 'fixed')
        target.value.style.setProperty('top', `${offsetTop.value}px`)
        target.value.style.setProperty('left', `${left.value}px`)
        target.value.style.setProperty('width', `${width.value}px`)
        target.value.style.setProperty('height', `${windowHeight.value - offsetTop.value}px`)
      }

      onCleanup(() => {
        parent.value.style.removeProperty('min-height')

        target.value.style.removeProperty('position')
        target.value.style.removeProperty('top')
        target.value.style.removeProperty('left')
        target.value.style.removeProperty('width')
        target.value.style.removeProperty('height')
      })
    }
  })

  return enable
}
