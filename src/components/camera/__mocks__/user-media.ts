import { vi } from 'vitest'
import {
  nextTick,
  ref,
} from 'vue-demi'

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

export function useUserMedia () {
  const start = vi.fn(async () => {
    enabled.value = true
  })

  const stop = vi.fn(() => {
    enabled.value = false
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
  return permission
}
