<template>
  <div
    class="signature-draw signature-draw--desktop">
    <canvas
      ref="canvas"
      class="signature-draw__canvas"
      :width="width"
      :height="height" />
    <Caption
      v-if="isBlank"
      class="signature-draw__placeholder">
      {{ placeholder }}
    </Caption>
    <div
      v-if="!isBlank"
      class="signature-draw__control">
      <Button
        variant="link"
        size="xs"
        class="signature-draw__clear"
        @click="reset()">
        <span>{{ resetLabel }}</span>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { templateRef } from '@vueuse/core'
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
} from './utils/canvas'
import useDraw from './utils/use-draw'
import { useVModel } from '../input/use-input'
import { createLines } from './utils/smooth-line'
import Caption from '../caption/Caption.vue'
import Button from '../button/Button.vue'

export default defineComponent({
  components: { Caption, Button },
  props     : {
    modelValue: {
      type   : String,
      default: undefined,
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

        model.value = canvas.value.toDataURL()
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

          isBlank.value = false
          model.value   = canvas.value.toDataURL()
        }
      },
    })

    onMounted(() => {
      if (model.value && model.value.startsWith('data:image/png')) {
        placeImage(canvas.value, model.value)

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
        @apply bg-white touch-none cursor-crosshair border rounded border-dashed;
      }
    }

    &__placeholder {
      @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center;
    }

    &__clear {
      @apply absolute right-1 top-1;
    }
  }
  </style>
