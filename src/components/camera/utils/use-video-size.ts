import {
  MaybeRef,
  unrefElement,
  useResizeObserver,
} from '@vueuse/core'
import { ref, watch } from 'vue-demi'

export default function useVideoSize (target: MaybeRef<HTMLVideoElement>) {
  const width  = ref(0)
  const height = ref(0)

  useResizeObserver(target, ([entry]) => {
    width.value  = (entry.target as HTMLVideoElement).videoWidth
    height.value = (entry.target as HTMLVideoElement).videoHeight
  })

  watch(() => unrefElement(target), (video) => {
    width.value  = video.videoWidth
    height.value = video.videoHeight
  })

  return { width, height }
}
