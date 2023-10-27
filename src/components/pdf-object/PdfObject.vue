<template>
  <div
    ref="object"
    data-testid="pdf-object"
    class="pdf-object"
    tabindex="0"
    :data-x="x"
    :data-y="y"
    :data-page="page"
    :data-width="width"
    :data-height="height"
    @keydown.up.stop.prevent="move($event, 0, -1)"
    @keydown.down.stop.prevent="move($event, 0, 1)"
    @keydown.left.stop.prevent="move($event, -1, 0)"
    @keydown.right.stop.prevent="move($event, 1, 0)">
    <div class="pdf-object__container">
      <slot />
      <PdfObjectDebugger v-if="debug" />
    </div>
    <div
      v-show="resizable"
      class="pdf-object__resize resize-handle" />
  </div>
</template>

<script lang="ts">
import { autoUpdate } from '@floating-ui/dom'
import {
  syncRef,
  templateRef,
  until,
  useVModel,
} from '@vueuse/core'
import {
  defineComponent,
  inject,
  onMounted,
  provide,
  ref,
  toRef,
  watchEffect,
} from 'vue-demi'
import useDrag from './utils/use-drag'
import useResize from './utils/use-resize'
import {
  PDF_OBJECTS_CONTEXT,
  PDF_OBJECT_CONTEXT,
  useObjectModel,
  usePage,
  focus,
} from '.'
import { computePosition, getPosition } from './utils/position'
import type { ObjectPosition } from './utils/overlap'
import { getEmptyPosition } from './utils/overlap'
import PdfObjectDebugger from './PdfObjectDebugger.vue'
import { clamp } from 'lodash-es'

export default defineComponent({
  components: { PdfObjectDebugger },
  props     : {
    x: {
      type   : Number,
      default: undefined,
    },
    y: {
      type   : Number,
      default: undefined,
    },
    page: {
      type   : Number,
      default: undefined,
    },
    width: {
      type   : Number,
      default: 198,
    },
    height: {
      type   : Number,
      default: 106,
    },
    minWidth: {
      type   : Number,
      default: undefined,
    },
    minHeight: {
      type   : Number,
      default: undefined,
    },
    maxWidth: {
      type   : Number,
      default: undefined,
    },
    maxHeight: {
      type   : Number,
      default: undefined,
    },
    moveable: {
      type   : Boolean,
      default: true,
    },
    resizable: {
      type   : Boolean,
      default: true,
    },
    autofocus: {
      type   : Boolean,
      default: false,
    },
    debug: {
      type   : Boolean,
      default: false,
    },
  },
  emits: [
    'update:x',
    'update:y',
    'update:page',
    'update:width',
    'update:height',
  ],
  setup (props) {
    const object = templateRef<HTMLDivElement>('object')
    const {
      root,
      scale,
      objects,
    } = inject(PDF_OBJECTS_CONTEXT)

    const vX      = useVModel(props, 'x')
    const vY      = useVModel(props, 'y')
    const vPage   = useVModel(props, 'page')
    const vWidth  = useVModel(props, 'width')
    const vHeight = useVModel(props, 'height')

    const {
      id,
      x,
      y,
      page,
      width,
      height,
      minHeight,
      minWidth,
      maxHeight,
      maxWidth,
      ratio,
    } = useObjectModel(props)

    const isDragged = ref(false)
    const lastX     = ref()
    const lastY     = ref()
    const lastPage  = ref()
    const pageEl    = usePage(page)

    const moveable = useDrag(object, {
      onstart () {
        const { left, top } = object.value.getBoundingClientRect()

        isDragged.value = true
        lastX.value     = x.value
        lastY.value     = y.value
        lastPage.value  = page.value

        x.value = left
        y.value = top
      },
      onmove (event) {
        x.value += event.dx
        y.value += event.dy
      },
      onend (event) {
        if (event.relatedTarget) {
          const result = getPosition({
            reference: event.relatedTarget as HTMLElement,
            container: root.value,
            object   : object.value,
            scale    : scale.value,
          })

          x.value    = result.x
          y.value    = result.y
          page.value = result.page
        } else {
          // Back to last valid coordinate
          x.value    = lastX.value
          y.value    = lastY.value
          page.value = lastPage.value
        }

        isDragged.value = false
      },
    })

    const resizable = useResize(object, {
      minHeight: minHeight,
      minWidth : minWidth,
      maxHeight: maxHeight,
      maxWidth : maxWidth,
      scale    : scale,
      ratio    : ratio,
      reference: pageEl,
      onmove (event) {
        if (event.rect && scale.value) {
          width.value  = event.rect.width / scale.value
          height.value = event.rect.height / scale.value
        }
      },
    })

    watchEffect((onCleanup) => {
      if (object.value) {
        if (pageEl.value && root.value) {
          object.value.style.display = 'block'
          object.value.style.width   = `${width.value}px`
          object.value.style.height  = `${height.value}px`

          if (isDragged.value) {
            object.value.style.position  = 'fixed'
            object.value.style.transform = `translate(${x.value}px, ${y.value}px) scale(${scale.value})`
            object.value.style.zIndex    = '50'
          } else {
            const cleanup = autoUpdate(pageEl.value, object.value, () => {
              const { left, top } = computePosition({
                reference: pageEl.value,
                container: root.value,
                x        : x.value,
                y        : y.value,
                scale    : scale.value,
              })

              object.value.style.position  = 'absolute'
              object.value.style.transform = `translate(${left}px, ${top}px) scale(${scale.value})`
              object.value.style.zIndex    = '10'
            }, { ancestorScroll: false, animationFrame: true })

            onCleanup(cleanup)
          }
        } else
          object.value.style.display = 'none'
      }
    })

    function move (event: KeyboardEvent, dx: number, dy: number) {
      if (props.moveable) {
        const pageWidth  = pageEl.value.clientWidth
        const pageHeight = pageEl.value.clientHeight

        const maxX = Math.floor((pageWidth / scale.value) - width.value)
        const maxY = Math.floor((pageHeight / scale.value) - height.value)

        const ax = (event.metaKey || event.ctrlKey) ? maxX : (event.shiftKey ? 10 : 1)
        const ay = (event.metaKey || event.ctrlKey) ? maxY : (event.shiftKey ? 10 : 1)

        const x1 = x.value + dx * ax
        const y1 = y.value + dy * ay

        x.value = clamp(x1, 0, maxX)
        y.value = clamp(y1, 0, maxY)
      }
    }

    function autoPosition () {
      const otherObjects = [...objects.values()].filter((obj) => {
        return obj.id !== id
          && Number.isFinite(obj.x)
          && Number.isFinite(obj.y)
          && obj.page === page.value
      })

      const size = {
        width : width.value,
        height: height.value,
      }

      const offside = {
        width : pageEl.value.clientWidth / scale.value,
        height: pageEl.value.clientHeight / scale.value,
      }

      const center = getEmptyPosition({
        size   : size,
        offside: offside,
        objects: otherObjects as ObjectPosition[],
      })

      x.value = center.x
      y.value = center.y
    }

    syncRef(x, vX)
    syncRef(y, vY)
    syncRef(page, vPage)
    syncRef(width, vWidth)
    syncRef(height, vHeight)

    syncRef(moveable, toRef(props, 'moveable'), { direction: 'rtl', immediate: true })
    syncRef(resizable, toRef(props, 'resizable'), { direction: 'rtl', immediate: true })

    onMounted(async () => {
      await until(pageEl).toBeTruthy()

      if (!Number.isFinite(x.value) || !Number.isFinite(y.value))
        autoPosition()

      if (props.autofocus)
        focus(object.value)
    })

    // Provide some data for debug
    provide(PDF_OBJECT_CONTEXT, {
      id,
      x,
      y,
      page,
      width,
      height,
      minHeight,
      minWidth,
      maxHeight,
      maxWidth,
      ratio,
    })

    return {
      move,
      focus,
    }
  },
})
</script>

<style lang="postcss">
.pdf-object {
  @apply origin-top-left left-0 top-0 select-none touch-none outline-none;

  &__container {
    @apply overflow-visible relative border-2 border-dashed border-subtle rounded w-full h-full;
    @apply dark:border-dark-subtle;

    &,
    & > * {
      @apply touch-none pointer-events-none;
    }

    button,
    input,
    textarea,
    a {
      @apply pointer-events-auto;
    }
  }

  &__resize {
    @apply absolute w-3 h-3 bottom-0 right-0 translate-x-1/2 translate-y-1/2 bg-subtle rounded-full;
    @apply dark:bg-dark-subtle;
  }
}
</style>
