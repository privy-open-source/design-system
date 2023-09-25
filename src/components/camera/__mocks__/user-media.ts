import { vi } from 'vitest'
import {
  nextTick,
  ref,
  watch,
} from 'vue-demi'
import type { UseUserMediaOptions } from '@vueuse/core'

export function useDevicesList () {
  return {
    videoInputs: ref([
      {
        deviceId: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        kind    : 'videoinput',
        label   : 'Front Camera',
        groupId : 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      },
      {
        deviceId: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        kind    : 'videoinput',
        label   : 'Rear Camera',
        groupId : 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      },
    ] as MediaDeviceInfo[]),
  }
}

export const enabled = ref(false)

export async function cameraOn () {
  enabled.value = true

  await nextTick()
}

export function useUserMedia (opts: UseUserMediaOptions) {
  const start = vi.fn(async () => {
    enabled.value = true
  })

  const stop = vi.fn(() => {
    enabled.value = false
  })

  watch(opts.constraints, async () => {
    await stop()
    await start()
  })

  return {
    stream: enabled,
    enabled,
    start,
    stop,
  }
}

export const permission = ref<PermissionState>('granted')

export async function setPermission (value: PermissionState) {
  permission.value = value

  await nextTick()
}

export function usePermission () {
  return { state: permission, isSupported: true }
}
