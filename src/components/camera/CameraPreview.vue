<template>
  <div
    class="camera"
    :class="classNames">
    <video
      v-if="stream"
      ref="video"
      :srcObject.prop="stream"
      class="camera__video"
      muted
      autoplay
      playsinline />
    <slot
      :enabled="enabled"
      :stream="stream"
      :video="video"
      :toggle="toggle"
      :turn-on="turnOn"
      :turn-off="turnOff"
      :cameras="cameras" />
  </div>
</template>

<script lang="ts">
import {
  until,
  useDevicesList,
  usePermission,
  useUserMedia,
  syncRef,
} from '@vueuse/core'
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue-demi'
import { dialog } from '../../core'
import { useVModel } from '../input/use-input'

export default defineComponent({
  props: {
    modelValue: {
      type   : Boolean,
      default: false,
    },
    mirror: {
      type   : Boolean,
      default: false,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue'],
  setup (props) {
    const model      = useVModel(props)
    const video      = ref<HTMLVideoElement>()
    const permission = usePermission('camera')
    const camera     = ref(0)

    const { videoInputs: cameras } = useDevicesList()

    const deviceId = computed(() => {
      return cameras.value?.at(camera.value)?.deviceId
    })

    const { stream, start, stop, enabled } = useUserMedia({
      videoDeviceId: deviceId,
      audioDeviceId: false,
    })

    const classNames = computed(() => {
      const result: string[] = []

      if (props.mirror)
        result.push('camera--mirror')

      return result
    })

    async function turnOn () {
      if (permission.value === 'denied') {
        await dialog.alert({
          title      : 'Camera Access Blocked',
          text       : 'Privy need to access your internal camera to process this journey',
          confirm    : { text: 'Ok' },
          footerAlign: 'end',
        })
      }

      if (permission.value === 'prompt') {
        await dialog.alert({
          title      : 'Camera Access Required',
          text       : 'Privy need to access your internal camera to process this journey',
          confirm    : { text: 'Ok' },
          footerAlign: 'end',
        })
      }

      await start()
    }

    function turnOff () {
      stop()
    }

    function toggle () {
      camera.value = (camera.value + 1) % cameras.value.length
    }

    onMounted(async () => {
      await until(permission).not.toBeUndefined()
      await turnOn()
    })

    onBeforeUnmount(() => {
      stop()
    })

    syncRef(enabled, model)

    return {
      classNames,
      cameras,
      enabled,
      video,
      stream,
      toggle,
      turnOn,
      turnOff,
    }
  },
})
</script>

<style lang="postcss">
.camera {
  @apply bg-black w-full flex flex-col aspect-video select-none relative;

  &__video {
    @apply flex-grow min-h-full max-w-full h-auto;
  }

  &--mirror {
    .camera__video {
      @apply -scale-x-100;
    }
  }
}
</style>
