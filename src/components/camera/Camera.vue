<template>
  <div
    v-p-aspect-ratio="4/3"
    class="camera"
    data-testid="camera"
    :data-deviceid="deviceId"
    :class="classNames">
    <video
      v-if="stream"
      ref="video"
      v-p-aspect-ratio="4/3"
      data-testid="camera-video"
      :srcObject.prop="stream"
      class="camera__video"
      autoplay
      muted
      playsinline
      @play="onStart" />

    <!-- Result -->
    <img
      v-if="isTaken && !stream"
      data-testid="camera-result"
      class="camera__result"
      :src="preview"
      alt="camera-result">

    <!-- Camera off -->
    <span
      v-if="!isActive && !isTaken"
      data-testid="camera-off"
      class="camera__off-info">
      Camera is off
    </span>

    <!-- Mask -->
    <div class="camera__mask-container">
      <div
        v-if="!isTaken"
        data-testid="camera-mask"
        class="camera__mask" />
    </div>

    <!-- Toast -->
    <transition name="slide-up">
      <div
        v-if="message"
        :key="message"
        class="camera__toast">
        <div
          data-testid="camera-toast"
          class="camera__toast-text">
          {{ message }}
        </div>
      </div>
    </transition>

    <!-- Control Button -->
    <div class="camera__controls">
      <p-button
        v-if="cameras.length > 1 && !isTaken"
        data-testid="camera-toggle"
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
        data-testid="camera-turn-on"
        class="camera__main-control"
        icon
        pill
        @click="turnOn()">
        <icon-camera />
      </p-button>
      <p-button
        v-else-if="isActive && !isTaken"
        data-testid="camera-take"
        class="camera__main-control"
        icon
        pill
        :disabled="isProcessing"
        @click="take()">
        <icon-camera />
      </p-button>
      <p-button
        v-else
        data-testid="camera-retake"
        class="camera__main-control"
        icon
        pill
        @click="retake()">
        <icon-retake />
      </p-button>
      <!-- End Main Button -->
    </div>

    <slot
      :cameras="cameras"
      :preview="preview"
      :stream="stream"
      :video="video"
      :toast="toast" />
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
  toRef,
} from 'vue-demi'
import pButton from '../button/Button.vue'
import IconRotate from '@carbon/icons-vue/lib/renew/16'
import IconCamera from '@carbon/icons-vue/lib/camera/24'
import IconRetake from '@carbon/icons-vue/lib/reset/24'
import shutterWav from './assets/shutter.wav'
import { useSound } from '@vueuse/sound'
import { useVModel } from '../input'
import CaptureAdapter from './adapter/capture'
import {
  Adapter,
  AdapterMeta,
  MaskVariant,
  ModelModifier,
} from './adapter/adapter'
import {
  usePermission,
  useDevicesList,
  useUserMedia,
  until,
} from '@vueuse/core'
import * as dialog from '../dialog'
import defu from 'defu'
import { pAspectRatio } from '../aspect-ratio'

export default defineComponent({
  components: {
    pButton,
    IconCamera,
    IconRetake,
    IconRotate,
  },
  directives: { pAspectRatio },
  props     : {
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
      default: undefined,
    },
    mask: {
      type   : String as PropType<MaskVariant>,
      default: undefined,
    },
    adapter: {
      type   : Object as PropType<Adapter>,
      default: CaptureAdapter,
    },
    facingMode: {
      type   : String as PropType<ConstrainDOMString>,
      default: undefined,
    },
    silent: {
      type   : Boolean,
      default: false,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: [
    'start',
    'change',
    'result',
    'update:modelValue',
  ],
  setup (props, { emit }) {
    const model        = useVModel(props)
    const modifier     = toRef(props, 'modelModifiers')
    const isProcessing = ref(false)
    const isTaken      = ref(false)
    const preview      = ref('')
    const message      = ref('')
    const shutter      = useSound(shutterWav)

    const video      = ref<HTMLVideoElement>()
    const permission = usePermission('camera', { controls: true })
    const camera     = ref(0)

    const meta: ComputedRef<AdapterMeta> = computed(() => {
      return defu({
        mirror    : props.mirror,
        mask      : props.mask,
        facingMode: props.facingMode,
      }, props.adapter.meta, { autoStart: false })
    })

    const { videoInputs: cameras } = useDevicesList({
      requestPermissions: true,
      constraints       : { video: { facingMode: meta.value.facingMode } },
    })

    const deviceId = computed(() => {
      return cameras.value?.at(camera.value)?.deviceId
    })

    const { stream, start, stop, enabled: isActive } = useUserMedia({
      videoDeviceId: deviceId,
      audioDeviceId: false,
    })

    const classNames = computed(() => {
      const result: string[] = []

      if (meta.value.mirror)
        result.push('camera--mirror')

      if (meta.value.mask)
        result.push(`camera__mask--${meta.value.mask}`)
      else
        result.push('camera__mask--none')

      return result
    })

    async function turnOn () {
      if (permission.state.value === 'denied') {
        await dialog.alert({
          title      : 'Camera Access Blocked',
          text       : 'Privy need to access your internal camera to process this journey',
          confirm    : { text: 'Ok' },
          footerAlign: 'end',
        })
      }

      if (permission.state.value === 'prompt') {
        await dialog.alert({
          title      : 'Camera Access Required',
          text       : 'Privy need to access your internal camera to process this journey',
          confirm    : { text: 'Ok' },
          footerAlign: 'end',
        })
      }

      await start()

      // Trigger video play if browser ignore autoplays attribute
      if (typeof video.value?.play === 'function')
        await video.value.play()
    }

    function toggle () {
      camera.value = (camera.value + 1) % cameras.value.length
    }

    function toast (text: string) {
      message.value = text
    }

    async function take () {
      isProcessing.value = true

      const output = await props.adapter.run({
        video,
        toast,
        stream,
        meta,
        modifier,
      })

      preview.value      = output.preview
      model.value        = output.result
      isTaken.value      = true
      isProcessing.value = false
      isActive.value     = false

      emit('result', output.result)
      emit('change', output.result)

      if (!props.silent)
        shutter.play()
    }

    async function retake () {
      isActive.value = true
      isTaken.value  = false
      preview.value  = ''
      message.value  = ''
    }

    function onStart () {
      emit('start', stream.value)

      if (meta.value.autoStart)
        take()
    }

    onMounted(async () => {
      if (permission.isSupported) {
        await until(permission.state).not.toBeUndefined()
        await turnOn()
      }
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
      toast,
      deviceId,
    }
  },
})
</script>

<style lang="postcss">
.camera {
  @apply bg-black w-full flex flex-col select-none relative overflow-hidden;

  &__video {
    @apply flex-grow min-h-full max-w-full h-auto object-cover;
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
    @apply absolute top-1/2 left-1/2 shadow-mask -translate-x-1/2 -translate-y-1/2;

    &--none &-container {
      @apply hidden;
    }

    &--square & {
      @apply aspect-compat-square w-2/3 md:w-1/2;
    }

    &--round & {
      @apply aspect-compat-square rounded-full w-1/2;
    }

    &--card & {
      @apply aspect-compat-[85.60/53.98] w-2/3 rounded-md;
    }
  }

  &__result {
    @apply max-w-full h-full object-cover;
  }

  &__off-info {
    @apply absolute bottom-20 text-white left-0 right-0 text-center text-sm;
  }

  &__controls {
    @apply py-3 flex w-full flex-shrink-0 justify-center items-center absolute bottom-0 space-x-3;
  }

  &__toast {
    @apply absolute bottom-20 left-0 right-0 text-center text-white px-4;

    &-text {
      @apply bg-black bg-opacity-80 px-4 py-1 text-sm rounded shadow-md inline-block max-w-full truncate;
    }
  }
}
</style>
