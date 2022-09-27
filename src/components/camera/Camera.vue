<template>
  <div class="camera">
    <video
      v-if="!isTaken && stream"
      ref="video"
      :srcObject.prop="stream"
      class="camera__video"
      autoplay />
    <div
      v-else-if="!isTaken"
      class="camera__fallback" />
    <img
      v-if="isTaken"
      :src="preview"
      alt="camera-preview">
    <span
      v-if="!enabled && !isTaken"
      class="camera__off-info">
      {{ cameraOffLabel }}
    </span>
    <div class="camera__controls">
      <p-button
        v-if="cameras.length > 1"
        color="secondary"
        size="sm"
        icon
        pill
        @click="toggle">
        <icon-rotate />
      </p-button>
      <!-- Main Button -->
      <p-button
        v-if="!enabled && !isTaken"
        data-testid="turn-on"
        class="camera__main-control"
        icon
        pill
        @click="turnOn()">
        <icon-camera />
      </p-button>
      <p-button
        v-else-if="!isTaken"
        data-testid="take"
        class="camera__main-control"
        icon
        pill
        @click="take()">
        <icon-camera />
      </p-button>
      <p-button
        v-else
        data-testid="retake"
        class="camera__main-control"
        icon
        pill
        @click="retake()">
        <icon-retake />
      </p-button>
      <!-- End Main Button -->
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
} from 'vue-demi'
import pButton from '../button/Button.vue'
import IconRotate from '@carbon/icons-vue/lib/renew/16'
import IconCamera from '@carbon/icons-vue/lib/camera/24'
import IconRetake from '@carbon/icons-vue/lib/reset/24'
import {
  templateRef,
  until,
  useDevicesList,
  usePermission,
  useUserMedia,
} from '@vueuse/core'
import { takePicture } from './utils/take-picture'
import shutterWav from './assets/shutter.wav'
import { useSound } from '@vueuse/sound'
import { dialog } from '../../core'
import { fromBase64 } from '../utils/base64'
import { useVModel } from '../input/use-input'

interface ModelModifier {
  base64: boolean,
}

export default defineComponent({
  components: {
    pButton,
    IconCamera,
    IconRetake,
    IconRotate,
  },
  props: {
    modelValue: {
      type   : [globalThis.File, String],
      default: '',
    },
    modelModifiers: {
      type   : Object as PropType<ModelModifier>,
      default: () => ({} as ModelModifier),
    },
    cameraOffLabel: {
      type   : String,
      default: 'Camera is off',
    },
  },
  setup (props) {
    const model   = useVModel(props)
    const isTaken = ref(false)
    const preview = ref('')

    const video      = templateRef<HTMLVideoElement>('video')
    const shutter    = useSound(shutterWav)
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

    function turnOn () {
      start()
    }

    function toggle () {
      camera.value = (camera.value + 1) % cameras.value.length
    }

    async function take () {
      const result = await takePicture(video.value)

      isTaken.value = true
      preview.value = result
      model.value   = props.modelModifiers.base64
        ? result
        : fromBase64(result)

      shutter.play()
      stop()
    }

    function retake () {
      isTaken.value = false
      preview.value = ''

      start()
    }

    onMounted(async () => {
      await until(permission).not.toBeUndefined()

      if (permission.value === 'prompt') {
        await dialog.alert({
          title      : 'Camera Access Required',
          text       : 'Privy need to access your internal camera to process this journey',
          confirm    : { text: 'Ok' },
          footerAlign: 'end',
        })
      }

      start()
    })

    onBeforeUnmount(() => {
      stop()
    })

    return {
      isTaken,
      take,
      retake,
      preview,
      enabled,
      turnOn,
      toggle,
      cameras,
      stream,
    }
  },
})
</script>

<style lang="postcss">
.camera {
  @apply bg-black w-full flex flex-col aspect-video relative;

  &__video,
  &__fallback {
    @apply flex-grow min-h-full;
  }

  &__off-info {
    @apply absolute bottom-20 text-white left-0 right-0 text-center text-sm;
  }

  &__controls {
    @apply py-3 flex w-full flex-shrink-0 justify-center items-center md:absolute bottom-0 gap-3;
  }
}
</style>
