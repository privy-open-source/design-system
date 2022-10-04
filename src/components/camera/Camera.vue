<template>
  <camera-preview
    v-model="isActive"
    :mirror="!!mirror">
    <template #default="{ cameras, toggle, turnOn, video, stream }">
      <img
        v-if="isTaken && !stream"
        class="camera__result"
        :src="preview"
        alt="camera-result">
      <span
        v-if="!isActive && !isTaken"
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
          v-if="!isActive && !isTaken"
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
          @click="take(video)">
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
    </template>
  </camera-preview>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
} from 'vue-demi'
import pButton from '../button/Button.vue'
import IconRotate from '@carbon/icons-vue/lib/renew/16'
import IconCamera from '@carbon/icons-vue/lib/camera/24'
import IconRetake from '@carbon/icons-vue/lib/reset/24'
import { takePicture } from './utils/take-picture'
import shutterWav from './assets/shutter.wav'
import { useSound } from '@vueuse/sound'
import { fromBase64 } from '../utils/base64'
import { useVModel } from '../input/use-input'
import CameraPreview from './CameraPreview.vue'

interface ModelModifier {
  base64: boolean,
}

type MaskVariant = 'square' | 'circle' | 'ektp'

export default defineComponent({
  components: {
    CameraPreview,
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
      type   : [Boolean, String] as PropType<boolean | 'preview' | 'all'>,
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
    const model    = useVModel(props)
    const isTaken  = ref(false)
    const isActive = ref(false)
    const preview  = ref('')
    const shutter  = useSound(shutterWav)

    function take (video: HTMLVideoElement) {
      const isMirrored = props.mirror && props.mirror !== 'preview'
      const result     = takePicture(video, isMirrored)
      const value      = props.modelModifiers.base64
        ? result
        : fromBase64(result)

      isActive.value = false
      isTaken.value  = true
      preview.value  = result
      model.value    = value

      emit('result', value)
      emit('change', value)

      shutter.play()
    }

    async function retake () {
      isActive.value = true
      isTaken.value  = false
      preview.value  = ''
    }

    return {
      isActive,
      isTaken,
      take,
      retake,
      preview,
    }
  },
})
</script>

<style lang="postcss">
.camera {
  &__result {
    @apply max-w-full h-auto;
  }

  &__off-info {
    @apply absolute bottom-20 text-white left-0 right-0 text-center text-sm;
  }

  &__controls {
    @apply py-3 flex w-full flex-shrink-0 justify-center items-center absolute bottom-0 gap-3;
  }
}
</style>
