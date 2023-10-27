<template>
  <div
    class="signature-draw signature-draw--desktop"
    data-testid="signature-draw-desktop">
    <canvas
      ref="canvas"
      class="signature-draw__canvas"
      data-testid="signature-draw-canvas"
      :width="width"
      :height="height" />
    <Caption
      v-if="isBlank"
      class="signature-draw__placeholder"
      data-testid="signature-draw-placeholder">
      {{ placeholder }}
    </Caption>
    <div
      v-if="!isBlank"
      class="signature-draw__control">
      <Button
        data-testid="signature-draw-reset"
        variant="link"
        size="xs"
        class="signature-draw__reset"
        pill
        @click="reset()">
        <span>{{ resetLabel }}</span>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { templateRef } from '@vueuse/core'
import type { PropType } from 'vue-demi'
import {
  defineComponent,
  onMounted,
  ref,
  watch,
} from 'vue-demi'
import {
  clearAll,
  drawLine,
  placeImage,
  replaceColor,
  toDataURL,
} from './utils/canvas'
import useDraw from './utils/use-draw'
import { useVModel } from '../input'
import { createLines } from './utils/smooth-line'
import Caption from '../caption/Caption.vue'
import Button from '../button/Button.vue'
import type { ModelModifier } from '../dropzone'
import { usePreview } from '../cropper'
import { fromBase64 } from '../utils/base64'

export default defineComponent({
  components: { Caption, Button },
  props     : {
    modelValue: {
      type   : [String, globalThis.File],
      default: '',
    },
    modelModifiers: {
      type   : Object as PropType<ModelModifier>,
      default: () => ({} as ModelModifier),
    },
    width: {
      type   : Number,
      default: 430,
    },
    height: {
      type   : Number,
      default: 230,
    },
    color: {
      type   : String,
      default: '#000000',
    },
    placeholder: {
      type   : String,
      default: '',
    },
    resetLabel: {
      type   : String,
      default: 'Reset',
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue'],
  setup (props) {
    const model   = useVModel(props)
    const preview = usePreview(model, '')
    const isBlank = ref(true)

    const canvas = templateRef<HTMLCanvasElement>('canvas')
    const lines  = createLines(15)

    function reset () {
      clearAll(canvas.value)

      isBlank.value = true
      model.value   = ''
    }

    function setColor (color: string) {
      if (!isBlank.value) {
        replaceColor(canvas.value, color)

        model.value = toDataURL(canvas.value)
      }
    }

    watch(() => props.color, setColor)

    useDraw(canvas, {
      onstart (event) {
        for (const line of lines)
          line.start(event.pageX, event.pageY)
      },
      onmove (event) {
        for (const line of lines) {
          const coordinate = line.move(event.pageX, event.pageY)
          const options    = { color: props.color }

          drawLine(canvas.value, coordinate, options)
        }

        const result = toDataURL(canvas.value)
        const value  = props.modelModifiers.base64 ? result : fromBase64(result)

        isBlank.value = false
        model.value   = value
      },
    })

    onMounted(() => {
      if (model.value && preview.value) {
        placeImage(canvas.value, preview.value)

        isBlank.value = false
      }
    })

    return {
      model,
      reset,
      isBlank,
      setColor,
    }
  },
})
</script>

<style lang="postcss">
  .signature-draw {
    @apply relative inline-block;

    &--desktop {
      .signature-draw__canvas {
        @apply bg-default touch-none cursor-crosshair border rounded border-dashed;
      }
    }

    &__placeholder {
      @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center text-muted;
    }

    &__reset {
      @apply absolute right-1 top-1 bg-default;
      &.btn--variant-link.btn--default {
        @apply dark:text-dark-subtlest hover:dark:text-dark-on-emphasis;
      }
    }
  }
  </style>
