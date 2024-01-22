<template>
  <div
    data-testid="cropper"
    class="cropper"
    :class="classNames">
    <div
      class="cropper__preview">
      <canvas
        ref="canvas"
        data-testid="cropper-canvas"
        class="cropper__canvas" />
      <div
        ref="parent"
        data-testid="cropper-container"
        class="cropper__image-container"
        @wheel.prevent="onMouseWheel">
        <img
          ref="image"
          data-testid="cropper-preview"
          alt="cropper-preview"
          tabindex="0"
          class="cropper__image"
          :src="preview"
          :class="imgClass"
          :style="imgStyle"
          :width="imgWidth"
          :height="imgHeight"
          @load="onImageLoaded"
          @keydown.up.prevent="move(0, -1)"
          @keydown.down.prevent="move(0, 1)"
          @keydown.left.prevent="move(-1, 0)"
          @keydown.right.prevent="move(1, 0)">
      </div>
      <div
        v-if="!noCrop"
        v-p-aspect-ratio.fixed="aspectRatio"
        data-testid="cropper-mask"
        class="cropper__mask"
        :style="maskStyle" />
    </div>
    <div class="cropper__control">
      <div class="cropper__control-bar">
        <p-button
          data-testid="cropper-zoom-out"
          size="xs"
          variant="link"
          icon
          pill
          @click="zoomOut()">
          <IconZoomOut />
        </p-button>
        <p-input-range
          v-model="scale"
          data-testid="cropper-zoom-slider"
          class="cropper__slider"
          min="0.5"
          max="2"
          step="0.1" />
        <p-button
          data-testid="cropper-zoom-in"
          size="xs"
          variant="link"
          icon
          pill
          @click="zoomIn()">
          <IconZoomIn />
        </p-button>
        <p-button
          data-testid="cropper-rotate-left"
          size="xs"
          variant="link"
          icon
          pill
          @click="rotate(-90)">
          <IconRotateLeft />
        </p-button>
        <p-button
          data-testid="cropper-rotate-right"
          size="xs"
          variant="link"
          icon
          pill
          @click="rotate(90)">
          <IconRotateRight />
        </p-button>
      </div>

      <p-button
        data-testid="cropper-reset"
        class="cropper__control__reset"
        size="xs"
        variant="link"
        @click="reset()">
        Reset
      </p-button>

      <slot
        name="control"
        :scale="scale"
        :angle="angle"
        :crop="crop"
        :zoom-in="zoomIn"
        :zoom-out="zoomOut"
        :fit="fit"
        :rotate="rotate"
        :reset="reset" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watchDebounced, useThrottleFn } from '@vueuse/core'
import { useClamp } from '@vueuse/math'
import type {
  PropType,
  StyleValue,
  VNode,
} from 'vue-demi'
import {
  computed,
  ref,
  toRef,
} from 'vue-demi'
import { usePinch } from './utils/use-pinch'
import pButton from '../button/Button.vue'
import pInputRange from '../input-range/InputRange.vue'
import IconRotateLeft from '@privyid/persona-icon/vue/rotate-left/20.vue'
import IconRotateRight from '@privyid/persona-icon/vue/rotate-right/20.vue'
import IconZoomIn from '@privyid/persona-icon/vue/zoom-in/20.vue'
import IconZoomOut from '@privyid/persona-icon/vue/zoom-out/20.vue'
import { cropImage } from './utils/crop-image'
import { useVModel } from '../input'
import type { ModelModifier } from '../camera/adapter/adapter'
import { fromBase64 } from '../utils/base64'
import {
  useRatio,
  useRatioHeight,
  useRatioWidth,
} from './utils/use-ratio'
import { vPAspectRatio } from '../aspect-ratio'
import { usePreview } from '.'

const props = defineProps({
  modelValue: {
    type   : [String, globalThis.File],
    default: '',
  },
  modelModifiers: {
    type   : Object as PropType<ModelModifier>,
    default: () => ({} as ModelModifier),
  },
  src: {
    type   : [String, globalThis.File],
    default: undefined,
  },
  ratio: {
    type   : Number,
    default: undefined,
  },
  width: {
    type   : [String, Number],
    default: undefined,
  },
  height: {
    type   : [String, Number],
    default: undefined,
  },
  imgWidth: {
    type   : [String, Number],
    default: 512,
  },
  imgHeight: {
    type   : [String, Number],
    default: 512,
  },
  imgClass: {
    type: [
      String,
      Array,
      Object,
    ],
    default: undefined,
  },
  rounded: {
    type   : Boolean,
    default: false,
  },
  noCrop: {
    type   : Boolean,
    default: false,
  },
  noAutocrop: {
    type   : Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'update:modelValue': [string | File],
  'change': [string | File],
  'result': [string | File],
  'load': [],
}>()

const model       = useVModel(props)
const x           = ref(0)
const y           = ref(0)
const angle       = ref(0)
const scale       = useClamp(1, 0.5, 2)
const aspectRatio = useRatio(props)
const width       = useRatioWidth(props)
const height      = useRatioHeight(props)
const rounded     = toRef(props, 'rounded')
const src         = toRef(props, 'src')
const preview     = usePreview(src)
const canvas      = ref<HTMLCanvasElement>()
const parent      = ref<HTMLDivElement>()
const image       = ref<HTMLImageElement>()

const classNames = computed(() => {
  const result: string[] = []

  if (props.noCrop)
    result.push('cropper--no-crop')

  if (props.rounded)
    result.push('cropper--rounded')

  return result
})

const imgStyle = computed<StyleValue>(() => {
  return { transform: `rotate(${angle.value}deg) translate(${x.value}px, ${y.value}px) scale(${scale.value})` }
})

const maskStyle = computed<StyleValue>(() => {
  return {
    aspectRatio: `${aspectRatio.value}`,
    width      : width.value ? `${width.value}px` : '66.666667%',
  }
})

function fit () {
  if (parent.value && image.value) {
    const w = angle.value % 180 === 0 ? image.value.width : image.value.height
    const h = angle.value % 180 === 0 ? image.value.height : image.value.width

    scale.value = Math.min(parent.value.clientWidth / w, parent.value.clientHeight / h)
  }

  x.value = 0
  y.value = 0
}

function zoomIn () {
  scale.value += 0.1
}

function zoomOut () {
  scale.value -= 0.1
}

function rotate (degress: number) {
  angle.value = ((Math.trunc(angle.value / 90) * 90) + degress) % 360

  fit()
}

function move (dx: number, dy: number) {
  /**
   * Translate top and left movement by any rotation's angle using formula:
   *  x' = x cos(θ) + y sin(θ)
   *  y' = −x sin(θ) + y cos(θ)
   *
   * See: https://math.stackexchange.com/questions/1350137/transformation-of-axes-by-rotation
   */
  const COS0 = Math.cos(angle.value * Math.PI / 180)
  const SIN0 = Math.sin(angle.value * Math.PI / 180)

  const x1 = (dx * COS0 + dy * SIN0)
  const y1 = (dy * COS0 - dx * SIN0)

  x.value += x1
  y.value += y1
}

function reset () {
  angle.value = 0

  fit()
}

function crop (): string {
  if (parent.value && image.value && canvas.value) {
    const mWidth = (parent.value.clientWidth * 2 / 3)
    const w      = width.value ?? mWidth
    const h      = height.value ?? (w / aspectRatio.value)
    const mScale = (mWidth > 0) && (w > mWidth) ? (w / mWidth) : 1 // mobile scale, responsive scale to fix crop ratio on mobile.

    const result = cropImage({
      canvas : canvas.value,
      image  : image.value,
      width  : w,
      height : h,
      x      : x.value,
      y      : y.value,
      angle  : angle.value,
      scale  : scale.value * mScale,
      rounded: props.rounded,
    })

    const value = props.modelModifiers.base64
      ? result
      : fromBase64(result)

    model.value = value

    emit('change', value)
    emit('result', value)

    return result
  }
}

const onMouseWheel = useThrottleFn((event: WheelEvent) => {
  if (image.value)
    image.value.focus()

  scale.value += event.deltaY * 0.01
}, 1000 / 30 /* Limit 30 Fps */)

function onImageLoaded () {
  emit('load')
  fit()

  if (!props.noCrop && !props.noAutocrop)
    crop()
}

usePinch(image, {
  onpinch (event) {
    scale.value = event.scale
    // angle.value += event.da

    move(event.dx, event.dy)
  },
  onmove (event) {
    move(event.dx, event.dy)
  },
})

watchDebounced([
  src,
  width,
  height,
  aspectRatio,
  rounded,
  x,
  y,
  scale,
  angle,
], () => {
  if (!props.noCrop && !props.noAutocrop)
    crop()
}, { debounce: 500 })

defineExpose({
  zoomIn,
  zoomOut,
  rotate,
  crop,
  reset,
  move,
  fit,
  canvas,
  image,
})

defineSlots<{
  'control'(props: {
    scale: number,
    angle: number,
    crop : () => void,
    zoomIn: () => void,
    zoomOut: () => void,
    rotate: (deg: number) => void,
    fit: () => void,
    reset: () => void,
  }): VNode[],
}>()
</script>

<style lang="postcss">
.cropper {
  @apply bg-default w-full aspect-compat-square;
  @apply dark:bg-dark-default;

  &__canvas {
    @apply hidden;
  }

  &__preview {
    @apply bg-[url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAGklEQVR4AWNYJYoK92ihwpGiAF0AXcMIUQAAbIfSgRmCFqkAAAAASUVORK5CYII=)];
    @apply flex w-full overflow-hidden h-auto relative aspect-compat-square select-none;
  }

  &__mask {
    @apply pointer-events-none touch-none select-none border border-default border-dashed box-border shadow-mask absolute inset-0 m-auto max-w-[66.666667%];
    @apply dark:border-dark-default;
  }

  &__image {
    -webkit-touch-callout: none;

    @apply touch-none h-auto origin-center object-contain select-none outline-none;

    &-container {
      @apply w-full h-full absolute inset-0 flex items-center justify-center;
    }
  }

  &__control {
    @apply p-2 space-x-2 flex justify-between max-w-full overflow-hidden;

    &-bar {
      @apply flex grow max-w-md space-x-2;
    }

    &__reset {
      @apply shrink-0;
    }
  }

  &__slider {
    @apply grow w-full;
  }

  &--rounded {
    .cropper__mask {
      @apply rounded-full
    }
  }
}
</style>
