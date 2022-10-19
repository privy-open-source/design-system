<template>
  <div
    class="cropper"
    :class="classNames">
    <div
      class="cropper__preview">
      <canvas
        ref="canvas"
        class="cropper__canvas" />
      <div
        ref="parent"
        class="cropper__image-container"
        @wheel.prevent="onMouseWheel">
        <img
          ref="target"
          :src="preview"
          alt="cropper-preview"
          tabindex="0"
          class="cropper__image"
          :style="imgStyle"
          :width="imgWidth"
          :height="imgHeight"
          crossorigin="anonymous"
          @load="onImageLoaded"
          @keydown.up.prevent="move(0, -1)"
          @keydown.down.prevent="move(0, 1)"
          @keydown.left.prevent="move(-1, 0)"
          @keydown.right.prevent="move(1, 0)">
      </div>
      <div
        v-if="!noCrop"
        class="cropper__mask"
        :style="maskStyle" />
    </div>
    <div class="cropper__control">
      <div class="cropper__control-bar">
        <p-button
          size="xs"
          variant="link"
          icon
          pill
          @click="zoomOut">
          <IconZoomOut />
        </p-button>
        <input
          v-model="scale"
          class="cropper__slider"
          min="0.5"
          max="2"
          step="0.1"
          type="range">
        <p-button
          size="xs"
          variant="link"
          icon
          pill
          @click="zoomIn">
          <IconZoomIn />
        </p-button>
        <p-button
          size="xs"
          variant="link"
          icon
          pill
          @click="rotate(-90)">
          <IconRotateLeft />
        </p-button>
        <p-button
          size="xs"
          variant="link"
          icon
          pill
          @click="rotate(90)">
          <IconRotateRight />
        </p-button>
      </div>

      <p-button
        class="flex-shrink-0"
        size="xs"
        variant="link"
        @click="reset()">
        Reset
      </p-button>

      <slot name="control" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  templateRef,
  useClamp,
  watchDebounced,
} from '@vueuse/core'
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  StyleValue,
  toRef,
  watch,
} from 'vue-demi'
import { usePinch } from './utils/use-pinch'
import pButton from '../button/Button.vue'
import IconRotateLeft from '@carbon/icons-vue/lib/rotate--counterclockwise/16'
import IconRotateRight from '@carbon/icons-vue/lib/rotate--clockwise/16'
import IconZoomIn from '@carbon/icons-vue/lib/zoom--in/16'
import IconZoomOut from '@carbon/icons-vue/lib/zoom--out/16'
import { cropImage } from './utils/crop-image'
import { useVModel } from '../input/use-input'
import { ModelModifier } from '../camera/adapter/adapter'
import { fromBase64 } from '../utils/base64'
import {
  useRatio,
  useRatioHeight,
  useRatioWidth,
} from './utils/use-ratio'
import { createSpinner } from '../avatar/utils/create-image'

export default defineComponent({
  components: {
    pButton,
    IconRotateLeft,
    IconRotateRight,
    IconZoomIn,
    IconZoomOut,
  },
  props: {
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
    rounded: {
      type   : Boolean,
      default: false,
    },
    noCrop: {
      type   : Boolean,
      default: false,
    },
    noAutoCrop: {
      type   : Boolean,
      default: false,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: [
    'update:modelValue',
    'change',
    'result',
  ],
  setup (props, { emit }) {
    const model   = useVModel(props)
    const x       = ref(0)
    const y       = ref(0)
    const angle   = ref(0)
    const scale   = useClamp(1, 0.5, 2)
    const preview = ref(createSpinner(512, 512))
    const ratio   = useRatio(props)
    const width   = useRatioWidth(props)
    const height  = useRatioHeight(props)
    const rounded = toRef(props, 'rounded')
    const src     = toRef(props, 'src')
    const canvas  = templateRef<HTMLCanvasElement>('canvas')
    const parent  = templateRef<HTMLDivElement>('parent')
    const target  = templateRef<HTMLImageElement>('target')

    const classNames = computed(() => {
      const result: string[] = []

      if (props.rounded)
        result.push('cropper--rounded')

      return result
    })

    const imgStyle = computed<StyleValue>(() => {
      return { transform: `rotate(${angle.value}deg) translate(${x.value}px, ${y.value}px) scale(${scale.value})` }
    })

    const maskStyle = computed<StyleValue>(() => {
      return {
        aspectRatio: `${ratio.value}`,
        width      : width.value ? `${width.value}px` : '66.666667%',
      }
    })

    function fit () {
      if (parent.value && target.value) {
        const w = angle.value % 180 === 0 ? target.value.width : target.value.height
        const h = angle.value % 180 === 0 ? target.value.height : target.value.width

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

    function crop () {
      if (parent.value && target.value && canvas.value) {
        const pWidth = (parent.value.clientWidth * 2 / 3)
        const w      = width.value ?? pWidth
        const h      = height.value ?? (w / ratio.value)
        const mScale = w / pWidth // mobile scale, responsive scale to fix crop ratio on mobile.

        const result = cropImage({
          canvas : canvas.value,
          image  : target.value,
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

    function onMouseWheel (event: WheelEvent) {
      if (target.value)
        target.value.focus()

      if (event.deltaY > 0)
        zoomIn()
      else
        zoomOut()
    }

    function onImageLoaded () {
      if (!props.noCrop && !props.noAutoCrop)
        crop()
    }

    usePinch(target, {
      onpinch (event) {
        scale.value = event.scale
        // angle.value += event.da

        move(event.dx, event.dy)
      },
      onmove (event) {
        move(event.dx, event.dy)
      },
    })

    watch(src, (value) => {
      if (preview.value && preview.value.startsWith('blob'))
        URL.revokeObjectURL(preview.value)

      preview.value = value instanceof globalThis.File
        ? URL.createObjectURL(value)
        : value
    })

    watchDebounced([
      src,
      width,
      height,
      ratio,
      rounded,
      x,
      y,
      scale,
      angle,
    ], () => {
      if (!props.noCrop && !props.noAutoCrop)
        crop()
    }, { debounce: 500 })

    onMounted(() => {
      if (props.src) {
        preview.value = props.src instanceof globalThis.File
          ? URL.createObjectURL(props.src)
          : props.src
      }
    })

    onBeforeUnmount(() => {
      if (preview.value && preview.value.startsWith('blob'))
        URL.revokeObjectURL(preview.value)
    })

    return {
      classNames,
      preview,
      imgStyle,
      maskStyle,
      scale,
      angle,
      reset,
      onMouseWheel,
      onImageLoaded,
      rotate,
      zoomIn,
      zoomOut,
      move,
      crop,
      model,
    }
  },
})
</script>

<style lang="postcss">
.cropper {
  @apply bg-white w-full aspect-square;

  &__canvas {
    @apply hidden;
  }

  &__preview {
    background-image: url("./assets/ps-neutral.png");

    @apply flex w-full overflow-hidden h-auto relative aspect-square select-none;
  }

  &__mask {
    @apply pointer-events-none touch-none select-none;
    @apply border border-white border-dashed box-border shadow-mask absolute top-0 left-0 right-0 bottom-0 m-auto max-w-[66.666667%];
  }

  &__image {
    -webkit-touch-callout: none;

    @apply touch-none h-auto origin-center object-contain select-none outline-none;

    &-container {
      @apply w-full h-full absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center;
    }
  }

  &__control {
    @apply p-2 gap-2 flex justify-between max-w-full overflow-hidden;

    &-bar {
      @apply flex flex-grow max-w-md gap-2;
    }
  }

  &__slider {
    @apply flex-grow w-full;
  }

  &--rounded {
    .cropper__mask {
      @apply rounded-full
    }
  }
}
</style>
