import defu from 'defu'
import { vi } from 'vitest'
import type { Adapter, AdapterMeta } from '../adapter/adapter'
import type { ComputedRef } from 'vue-demi'
import {
  computed,
  ref,
} from 'vue-demi'

export const video = document.createElement('video')

export async function runAdapter (adapter: Adapter, meta: Partial<AdapterMeta & { base64: boolean }> = {}) {
  return await adapter.run({
    toast   : vi.fn(),
    video   : ref(video),
    stream  : ref(),
    modifier: ref({ base64: meta.base64 }),
    meta    : computed(() => {
      return defu({
        mirror    : meta.mirror,
        mask      : meta.mask,
        facingMode: meta.facingMode,
      }, adapter.meta, { autoStart: false })
    }) as ComputedRef<AdapterMeta>,
  })
}
