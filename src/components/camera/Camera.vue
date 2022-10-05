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
      playsinline
      @play="onStart" />

    <!-- Result -->
    <img
      v-if="isTaken && !stream"
      class="camera__result"
      :src="preview"
      alt="camera-result">

    <!-- Camera off -->
    <span
      v-if="!isActive && !isTaken"
      class="camera__off-info">
      Camera is off
    </span>

    <!-- Mask -->
    <div class="camera__mask-container">
      <div
        v-if="!isTaken"
        class="camera__mask" />
    </div>

    <!-- Notify -->
    <transition name="slide-up">
      <div
        v-if="message"
        :key="message"
        class="camera__notify">
        <span class="camera__notify-text">
          {{ message }}
        </span>
      </div>
    </transition>

    <!-- Control Button -->
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
        v-if="!isActive && !isTaken"
        data-testid="turn-on"
        class="camera__main-control"
        icon
        pill
        @click="turnOn()">
        <icon-camera />
      </p-button>
      <p-button
        v-else-if="isActive && !isTaken"
        data-testid="take"
        class="camera__main-control"
        icon
        pill
        :disabled="isProcessing"
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
  ComputedRef,
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
import shutterWav from './assets/shutter.wav'
import { useSound } from '@vueuse/sound'
import { useVModel } from '../input/use-input'
import CameraAdapter from './adapter/camera'
import { Adapter, MaskVariant } from './adapter/adapter'
import {
  usePermission,
  useDevicesList,
  useUserMedia,
} from '@vueuse/core'
import { until } from '@vueuse/shared'
import { dialog } from '../../core'
import { flipVertical } from './utils/flip-image'
import { fromBase64 } from '../utils/base64'
import defu from 'defu'

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
      type: [
        globalThis.File,
        String,
        Array,
      ] as PropType<string | globalThis.File | string[] | globalThis.File[]>,
      default: '',
    },
    modelModifiers: {
      type   : Object as PropType<ModelModifier>,
      default: () => ({} as ModelModifier),
    },
    mirror: {
      type   : [Boolean, String] as PropType<boolean | 'preview' | 'all'>,
      default: false,
    },
    mask: {
      type   : String as PropType<MaskVariant>,
      default: undefined,
    },
    adapter: {
      type   : Object as PropType<Adapter>,
      default: CameraAdapter,
    },
    facingMode: {
      type   : String as PropType<ConstrainDOMString>,
      default: undefined,
    },
    muted: {
      type   : Boolean,
      default: false,
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
    const model        = useVModel(props)
    const isProcessing = ref(false)
    const isTaken      = ref(false)
    const preview      = ref('')
    const message      = ref('')
    const shutter      = useSound(shutterWav)

    const video      = ref<HTMLVideoElement>()
    const permission = usePermission('camera')
    const camera     = ref(0)

    const cameraOptions: ComputedRef<Adapter['meta']> = computed(() => {
      return defu({
        mirror    : props.mirror,
        mask      : props.mask,
        facingMode: props.facingMode,
      }, props.adapter.meta)
    })

    const { videoInputs: cameras } = useDevicesList({ constraints: { video: { facingMode: cameraOptions.value.facingMode } } })

    const deviceId = computed(() => {
      return cameras.value?.at(camera.value)?.deviceId
    })

    const { stream, start, stop, enabled: isActive } = useUserMedia({
      videoDeviceId: deviceId,
      audioDeviceId: false,
    })

    const classNames = computed(() => {
      const result: string[] = []

      if (cameraOptions.value.mirror)
        result.push('camera--mirror')

      if (cameraOptions.value.mask)
        result.push(`camera__mask--${cameraOptions.value.mask}`)
      else
        result.push('camera__mask--none')

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

    function toggle () {
      camera.value = (camera.value + 1) % cameras.value.length
    }

    function notify (text: string) {
      message.value = text
    }

    async function take () {
      isProcessing.value = true

      const isMirrored = cameraOptions.value.mirror && cameraOptions.value.mirror !== 'preview'
      const result     = await props.adapter.run({
        video,
        notify,
        stream,
      })

      let value: typeof props.modelValue = result

      if (isMirrored && cameraOptions.value.transformable !== false) {
        value = Array.isArray(result)
          ? await Promise.all(result.map((image) => flipVertical(image)))
          : await flipVertical(result)
      }

      preview.value = Array.isArray(value) ? value.at(0) : value

      if (!props.modelModifiers.base64 && cameraOptions.value.transformable !== false) {
        value = Array.isArray(value)
          ? value.map((image) => fromBase64(image))
          : fromBase64(value)
      }

      model.value        = value
      isTaken.value      = true
      isProcessing.value = false
      isActive.value     = false

      emit('result', value)
      emit('change', value)

      if (!props.muted)
        shutter.play()
    }

    async function retake () {
      isActive.value = true
      isTaken.value  = false
      preview.value  = ''
      message.value  = ''
    }

    function onStart () {
      if (cameraOptions.value.autoStart)
        take()
    }

    onMounted(async () => {
      await until(permission).not.toBeUndefined()
      await turnOn()
    })

    onBeforeUnmount(() => {
      stop()
    })

    return {
      classNames,
      cameras,
      video,
      stream,
      toggle,
      isActive,
      isTaken,
      isProcessing,
      message,
      take,
      retake,
      preview,
      turnOn,
      onStart,
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

  &__mask-container {
    @apply absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden pointer-events-none;
  }

  &__mask {
    @apply absolute top-1/2 left-1/2 shadow-[0_0_0_999px_rgba(0,0,0,0.5)] -translate-x-1/2 -translate-y-1/2;

    &--none &-container {
      @apply hidden;
    }

    &--square & {
      @apply aspect-square w-2/3 md:w-1/2;
    }

    &--circle & {
      @apply aspect-square rounded-full w-1/2;
    }

    &--ektp & {
      @apply aspect-[8.56/5.98] w-2/3 rounded-md;
    }
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

  &__notify {
    @apply absolute bottom-20 left-0 right-0 text-center text-white;

    &-text {
      @apply bg-black bg-opacity-80 px-4 py-1 text-sm rounded shadow-md;
    }
  }
}
</style>
