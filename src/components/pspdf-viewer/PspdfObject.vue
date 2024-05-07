<template>
  <div
    ref="content"
    data-testid="pdf-object"
    class="pdf-object"
    tabindex="0"
    :data-x="objectX"
    :data-y="objectY"
    :data-page="objectPage"
    :data-width="objectWidth"
    :data-height="objectHeight">
    <div class="pdf-object__container">
      <slot />
      <PdfObjectDebugger v-if="debug && isSelected" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  provide,
  watch,
  onMounted,
  onBeforeUnmount,
  inject,
} from 'vue-demi'
import PdfObjectDebugger from '../pdf-object/PdfObjectDebugger.vue'
import {
  syncRef,
  useVModel,
  watchIgnorable,
} from '@vueuse/core'
import {
  PDF_OBJECTS_CONTEXT,
  PDF_OBJECT_CONTEXT,
  useObjectModel,
} from '../pdf-object'
import type { List, AnnotationsUnion } from 'pspdfkit'
import PSPDFKit from 'pspdfkit'
import { usePspdf } from '.'
import type { ObjectPosition } from '../pdf-object/utils/overlap'
import { getEmptyPosition } from '../pdf-object/utils/overlap'

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

const content = ref<HTMLDivElement>()
const vX      = useVModel(props, 'x')
const vY      = useVModel(props, 'y')
const vPage   = useVModel(props, 'page')
const vWidth  = useVModel(props, 'width')
const vHeight = useVModel(props, 'height')

const { instance, contents } = usePspdf()
const { objects }            = inject(PDF_OBJECTS_CONTEXT)
const objectId               = ref<string>()
const isSelected             = ref(false)

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

const { ignoreUpdates } = watchIgnorable([
  objectX,
  objectY,
  objectWidth,
  objectHeight,
], () => {
  updateAnnotation()
})

watch(objectPage, async (value, oldValue) => {
  if (value !== oldValue) {
    await removeAnnotation()
    await createAnnotation()
  }
})

async function createAnnotation () {
  if (objectPage.value > -1 && objectPage.value < instance.value.totalPageCount) {
    objectId.value = PSPDFKit.generateInstantId()

    contents.set(objectId.value, content.value)

    await instance.value.create(
      new PSPDFKit.Annotations.RectangleAnnotation({
        id         : objectId.value,
        pageIndex  : objectPage.value - 1,
        boundingBox: new PSPDFKit.Geometry.Rect({
          left  : objectX.value * 0.75,
          top   : objectY.value * 0.75,
          width : objectWidth.value * 0.75,
          height: objectHeight.value * 0.75,
        }),
        strokeColor: PSPDFKit.Color.TRANSPARENT,
        fillColor  : PSPDFKit.Color.TRANSPARENT,
        customData : {
          minWidth : minWidth.value * 0.75,
          minHeight: minHeight.value * 0.75,
          maxWidth : maxWidth.value * 0.75,
          maxHeight: maxHeight.value * 0.75,
        },
      }),
    )
  }
}

async function updateAnnotation () {
  const objects = await instance.value.getAnnotations(objectPage.value - 1)
  const object  = objects.find((o) => o.id === objectId.value)

  if (object) {
    await instance.value.update(
      object.set('boundingBox', object.boundingBox.merge({
        left  : objectX.value * 0.75,
        top   : objectY.value * 0.75,
        width : objectWidth.value * 0.75,
        height: objectHeight.value * 0.75,
      })),
    )
  }
}

async function removeAnnotation () {
  if (objectId.value) {
    await instance.value.delete(objectId.value)

    contents.delete(objectId.value)

    objectId.value = undefined
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

  const pageInfo = instance.value.pageInfoForIndex(objectPage.value - 1)
  const offside  = {
    width : pageInfo.width / 0.75,
    height: pageInfo.height / 0.75,
  }

  const center = getEmptyPosition({
    size   : size,
    offside: offside,
    objects: otherObjects as ObjectPosition[],
  })

  objectX.value = center.x
  objectY.value = center.y
}

function onAnnotationChange (annotations: List<AnnotationsUnion>) {
  const object = annotations.find((i) => i.id === objectId.value)

  if (object) {
    ignoreUpdates(() => {
      objectX.value      = object.boundingBox.left / 0.75
      objectY.value      = object.boundingBox.top / 0.75
      objectWidth.value  = object.boundingBox.width / 0.75
      objectHeight.value = object.boundingBox.height / 0.75
    })
  }
}

function onAnnotationMounted (annotations: List<AnnotationsUnion>) {
  if (props.autofocus && objectId.value) {
    const object = annotations.find((i) => i.id === objectId.value)

    if (object) {
      instance.value.setSelectedAnnotations(PSPDFKit.Immutable.List([objectId.value]))
      instance.value.jumpToRect(objectPage.value - 1, object.boundingBox)
    }
  }
}

async function onAnnotationSelected (annotation: AnnotationsUnion) {
  isSelected.value = annotation && annotation.id === objectId.value

  if (isSelected.value) {
    const root = instance.value.contentDocument.querySelector('.PSPDFKit-Root')

    if (root) {
      root.setAttribute('resizable', `${props.resizable}`)
      root.setAttribute('moveable', `${props.moveable}`)
    }
  }
}

onMounted(async () => {
  if (instance.value && content.value) {
    if (!Number.isFinite(objectX.value) || !Number.isFinite(objectY.value))
      autoPosition()

    instance.value.addEventListener('annotations.update', onAnnotationChange)
    instance.value.addEventListener('annotations.create', onAnnotationMounted)
    instance.value.addEventListener('annotationSelection.change', onAnnotationSelected)

    await createAnnotation()
  }
})

onBeforeUnmount(async () => {
  if (instance.value) {
    await removeAnnotation()

    instance.value.removeEventListener('annotations.update', onAnnotationChange)
    instance.value.removeEventListener('annotations.create', onAnnotationMounted)
    instance.value.removeEventListener('annotationSelection.change', onAnnotationSelected)
  }
})

syncRef(objectX, vX)
syncRef(objectY, vY)
syncRef(objectPage, vPage)
syncRef(objectWidth, vWidth)
syncRef(objectHeight, vHeight)

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
