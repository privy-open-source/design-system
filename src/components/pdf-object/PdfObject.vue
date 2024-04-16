<template>
  <div
    ref="object"
    data-testid="pdf-object"
    class="pdf-object"
    tabindex="0"
    :data-x="objectX"
    :data-y="objectY"
    :data-page="objectPage"
    :data-width="objectWidth"
    :data-height="objectHeight"
    @keydown.up.stop.prevent="move($event, 0, -1)"
    @keydown.down.stop.prevent="move($event, 0, 1)"
    @keydown.left.stop.prevent="move($event, -1, 0)"
    @keydown.right.stop.prevent="move($event, 1, 0)">
    <div class="pdf-object__container">
      <slot />
      <PdfObjectDebugger v-if="debug" />
    </div>
    <div
      v-show="isResizable"
      class="pdf-object__resize resize-handle" />
  </div>
</template>

<script lang="ts" setup>
import { autoUpdate } from '@floating-ui/dom'
import {
  syncRef,
  until,
  useVModel,
} from '@vueuse/core'
import {
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

const props = defineProps({
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
})

defineEmits<{
  'update:x': [number],
  'update:y': [number],
  'update:page': [number],
  'update:width': [number],
  'update:height': [number],
}>()

const object = ref<HTMLDivElement>()
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
  x: objectX,
  y: objectY,
  page: objectPage,
  width: objectWidth,
  height: objectHeight,
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
const pageEl    = usePage(objectPage)

const isMoveable = useDrag(object, {
  onstart () {
    const { left, top } = object.value.getBoundingClientRect()

    isDragged.value = true
    lastX.value     = objectX.value
    lastY.value     = objectY.value
    lastPage.value  = objectPage.value

    objectX.value = left
    objectY.value = top
  },
  onmove (event) {
    objectX.value += event.dx
    objectY.value += event.dy
  },
  onend (event) {
    if (event.relatedTarget) {
      const result = getPosition({
        reference: event.relatedTarget as HTMLElement,
        container: root.value,
        object   : object.value,
        scale    : scale.value,
      })

      objectX.value    = result.x
      objectY.value    = result.y
      objectPage.value = result.page
    } else {
      // Back to last valid coordinate
      objectX.value    = lastX.value
      objectY.value    = lastY.value
      objectPage.value = lastPage.value
    }

    isDragged.value = false
  },
})

const isResizable = useResize(object, {
  minHeight: minHeight,
  minWidth : minWidth,
  maxHeight: maxHeight,
  maxWidth : maxWidth,
  scale    : scale,
  ratio    : ratio,
  reference: pageEl,
  onmove (event) {
    if (event.rect && scale.value) {
      objectWidth.value  = event.rect.width / scale.value
      objectHeight.value = event.rect.height / scale.value
    }
  },
})

watchEffect((onCleanup) => {
  if (object.value) {
    if (pageEl.value && root.value) {
      object.value.style.display = 'block'
      object.value.style.width   = `${objectWidth.value}px`
      object.value.style.height  = `${objectHeight.value}px`

      if (isDragged.value) {
        object.value.style.position  = 'fixed'
        object.value.style.transform = `translate(${objectX.value}px, ${objectY.value}px) scale(${scale.value})`
        object.value.style.zIndex    = '50'
      } else {
        const cleanup = autoUpdate(pageEl.value, object.value, () => {
          const { left, top } = computePosition({
            reference: pageEl.value,
            container: root.value,
            x        : objectX.value,
            y        : objectY.value,
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

    const maxX = Math.floor((pageWidth / scale.value) - objectWidth.value)
    const maxY = Math.floor((pageHeight / scale.value) - objectHeight.value)

    const ax = (event.metaKey || event.ctrlKey) ? maxX : (event.shiftKey ? 10 : 1)
    const ay = (event.metaKey || event.ctrlKey) ? maxY : (event.shiftKey ? 10 : 1)

    const x1 = objectX.value + dx * ax
    const y1 = objectY.value + dy * ay

    objectX.value = clamp(x1, 0, maxX)
    objectY.value = clamp(y1, 0, maxY)
  }
}

function autoPosition () {
  const otherObjects = [...objects.values()].filter((obj) => {
    return obj.id !== id
      && Number.isFinite(obj.x)
      && Number.isFinite(obj.y)
      && obj.page === objectPage.value
  })

  const size = {
    width : objectWidth.value,
    height: objectHeight.value,
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

  objectX.value = center.x
  objectY.value = center.y
}

syncRef(objectX, vX)
syncRef(objectY, vY)
syncRef(objectPage, vPage)
syncRef(objectWidth, vWidth)
syncRef(objectHeight, vHeight)

syncRef(isMoveable, toRef(props, 'moveable'), { direction: 'rtl', immediate: true })
syncRef(isResizable, toRef(props, 'resizable'), { direction: 'rtl', immediate: true })

onMounted(async () => {
  await until(pageEl).toBeTruthy()

  if (!Number.isFinite(objectX.value) || !Number.isFinite(objectY.value))
    autoPosition()

  if (props.autofocus)
    focus(object.value)
})

// Provide some data for debug
provide(PDF_OBJECT_CONTEXT, {
  id,
  x     : objectX,
  y     : objectY,
  page  : objectPage,
  width : objectWidth,
  height: objectHeight,
  minHeight,
  minWidth,
  maxHeight,
  maxWidth,
  ratio,
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
