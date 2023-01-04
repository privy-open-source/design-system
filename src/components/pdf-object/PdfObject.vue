<template>
  <div
    ref="object"
    class="pdf-object"
    tabindex="0"
    :data-x="x"
    :data-y="y"
    :data-page="page"
    :data-width="width"
    :data-height="height"
    @keydown.up.prevent="move(0, -1)"
    @keydown.down.prevent="move(0, 1)"
    @keydown.left.prevent="move(-1, 0)"
    @keydown.right.prevent="move(1, 0)">
    <div class="pdf-object__container">
      <slot />
    </div>
    <div
      v-show="resizeable"
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
  ref,
  toRef,
  watchEffect,
} from 'vue-demi'
import useDrag from './utils/use-drag'
import {
  PDF_OBJECTS_CONTEXT,
  useObjectModel,
  usePage,
  focus,
} from '.'
import { computePosition, getPosition } from './utils/position'
import { getEmptyPosition, ObjectPosition } from './utils/overlap'
import { useResize } from './utils/use-resize'

export default defineComponent({
  props: {
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
    ratio: {
      type   : Number,
      default: undefined,
    },
    moveable: {
      type   : Boolean,
      default: true,
    },
    resizeable: {
      type   : Boolean,
      default: true,
    },
    autofocus: {
      type   : Boolean,
      default: true,
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
        move(event.dx, event.dy)
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

    const resizeable = useResize(object, {
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
              object.value.style.zIndex    = 'auto'
            }, { ancestorScroll: false })

            onCleanup(cleanup)
          }
        } else
          object.value.style.display = 'none'
      }
    })

    function move (dx: number, dy: number) {
      x.value += dx
      y.value += dy
    }

    function autoPosition () {
      const otherObjects = [...objects.values()].filter((obj) => {
        return obj.id !== id.value
          && Number.isFinite(obj.x)
          && Number.isFinite(obj.y)
          && obj.page === page.value
      })

      const objectBoundary = {
        width : width.value,
        height: height.value,
      }

      const pageBoundary = {
        width : pageEl.value.clientWidth / scale.value,
        height: pageEl.value.clientHeight / scale.value,
      }

      const center = getEmptyPosition(
        objectBoundary,
        pageBoundary,
        otherObjects as ObjectPosition[],
      )

      x.value = center.x
      y.value = center.y
    }

    syncRef(vX, x)
    syncRef(vY, y)
    syncRef(vPage, page)
    syncRef(vWidth, width)
    syncRef(vHeight, height)

    syncRef(moveable, toRef(props, 'moveable'), { direction: 'rtl', immediate: true })
    syncRef(resizeable, toRef(props, 'resizeable'), { direction: 'rtl', immediate: true })

    onMounted(async () => {
      await until(pageEl).toBeTruthy()

      if (!Number.isFinite(x.value) || !Number.isFinite(y.value))
        autoPosition()

      if (props.autofocus)
        focus(object.value)
    })

    return { move }
  },
})
</script>

<style lang="postcss">
.pdf-object {
  @apply origin-top-left left-0 top-0 select-none touch-none outline-none;

  &__container {
    @apply overflow-visible relative border-2 border-dashed border-subtle rounded w-full h-full;

    &,
    & > * {
      @apply touch-none pointer-events-none;
    }
  }

  &__resize {
    @apply absolute w-3 h-3 bottom-0 right-0 translate-x-1/2 translate-y-1/2 bg-gray-20 rounded-full;
  }
}
</style>
