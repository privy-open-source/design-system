<template>
  <div
    class="camera"
    :class="classNames">
    <video
      v-if="!isTaken && stream"
      ref="video"
      :srcObject.prop="stream"
      class="camera__video"
      muted
      autoplay
      playsinline />
    <div
      v-else-if="!isTaken"
      class="camera__fallback" />
    <img
      v-if="isTaken"
      class="camera__result"
      :src="preview"
      alt="camera-result">
    <span
      v-if="!enabled && !isLoading && !isTaken"
      class="camera__off-info">
      {{ cameraOffLabel }}
    </span>
    <div class="camera__mask-wrapper">
      <div
        v-if="!isTaken"
        class="camera__mask" />
    </div>
    <div class="camera__controls">
      <p-button
        v-if="cameras.length > 1 && !isTaken"
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
import useLoading from '../overlay/utils/use-loading'
import useVideoSize from './utils/use-video-size'

interface ModelModifier {
  base64: boolean,
}

type MaskVariant = 'square' | 'circle' | 'ektp'

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
    mirror: {
      type   : Boolean,
      default: false,
    },
    mask: {
      type   : String as PropType<MaskVariant>,
      default: undefined,
    },
    cameraOffLabel: {
      type   : String,
      default: 'Camera is off',
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: [
    'change',
    'result',
    'update:modelValue',
  ],
  setup (props, { emit }) {
    const model     = useVModel(props)
    const isLoading = useLoading()
    const isTaken   = ref(false)
    const preview   = ref('')

    const video      = templateRef<HTMLVideoElement>('video')
    const videoSize  = useVideoSize(video)
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

    const classNames = computed(() => {
      const result: string[] = []

      if (props.mask)
        result.push(`camera--mask-${props.mask}`)
      else
        result.push('camera--no-mask')

      if (props.mirror)
        result.push('camera--mirror')

      if (videoSize.height.value > videoSize.width.value)
        result.push('camera--portrait')
      else
        result.push('camera--landscape')

      return result
    })

    async function turnOn () {
      await start()
    }

    function toggle () {
      camera.value = (camera.value + 1) % cameras.value.length
    }

    async function take () {
      const result = await takePicture(video.value, props.mirror)
      const value  = props.modelModifiers.base64
        ? result
        : fromBase64(result)

      isTaken.value = true
      preview.value = result
      model.value   = value

      emit('result', value)
      emit('change', value)

      shutter.play()
      stop()
    }

    async function retake () {
      isTaken.value   = false
      preview.value   = ''
      isLoading.value = true

      await start()

      isLoading.value = false
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
      classNames,
      isLoading,
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
  @apply bg-black w-full flex flex-col aspect-video relative select-none;

  &__video,
  &__fallback {
    @apply flex-grow min-h-full;
  }

  &__result {
    @apply max-w-full h-auto;
  }

  &__off-info {
    @apply absolute bottom-20 text-white left-0 right-0 text-center text-sm;
  }

  &__controls {
    @apply py-3 flex w-full flex-shrink-0 justify-center items-center absolute bottom-0 gap-3;
  }

  &--no-mask {
    .camera__mask {
      @apply hidden;
    }
  }

  &--mirror {
    .camera__video {
      @apply -scale-x-100;
    }
  }

  &__mask-wrapper {
    @apply absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden pointer-events-none;
  }

  &__mask {
    @apply absolute top-1/2 left-1/2 shadow-[0_0_0_999px_rgba(0,0,0,0.5)] -translate-x-1/2 -translate-y-1/2;
  }

  &--mask-square {
    .camera__mask {
      @apply  aspect-square w-1/2;
    }
  }

  &--mask-circle {
    .camera__mask {
      @apply aspect-square rounded-full w-1/2;
    }
  }

  &--mask-ektp {
    &.camera--portrait {
      .camera__mask {
        @apply aspect-[8.56/5.98] w-2/3 rounded-md;
      }
    }

    &.camera--portrait {
      .camera__mask {
        @apply aspect-[5.98/8.56] w-[calc(100%-5rem)] rounded-md;
      }
    }
  }
}
</style>
