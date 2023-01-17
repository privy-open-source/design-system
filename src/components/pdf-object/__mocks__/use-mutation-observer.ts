import {
  MaybeElementRef,
  tryOnMounted,
  UseMutationObserverOptions,
} from '@vueuse/core'

export function useMutationObserver (_target: MaybeElementRef, handle: MutationCallback, _options?: UseMutationObserverOptions) {
  tryOnMounted(() => {
    handle(
      [{ type: 'childList' } as unknown as MutationRecord],
      {} as unknown as MutationObserver,
    )
  })
}
