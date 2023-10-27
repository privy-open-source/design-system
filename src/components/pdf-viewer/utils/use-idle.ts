import type { MaybeRef } from '@vueuse/core'
import {
  useEventListener,
} from '@vueuse/core'
import { ref } from 'vue-demi'

const TRACK_EVENTS = [
  'mousemove',
  'mousedown',
  'touchstart',
  'keydown',
  'scroll',
]

export function useIdle (target: MaybeRef<HTMLElement>, timeout = 5000) {
  const idle = ref(false)

  let timer: ReturnType<typeof setTimeout>

  function onActivities () {
    idle.value = false

    if (timer)
      clearTimeout(timer)

    timer = setTimeout(() => {
      idle.value = true
    }, timeout)
  }

  useEventListener(target, TRACK_EVENTS, onActivities, { passive: true })

  return idle
}
