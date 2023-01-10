import {
  MaybeRef,
  syncRef,
  until,
} from '@vueuse/shared'
import {
  computed,
  inject,
  InjectionKey,
  onBeforeUnmount,
  reactive,
  Ref,
  unref,
  ref,
  watch,
  onBeforeMount,
} from 'vue-demi'
import { PdfViewerContext } from '../pdf-viewer'
import { useSelector } from './utils/use-selector'
import { focus as focus_ } from '../tour/utils/focus'
import { useVModel } from '@vueuse/core'
import { useClamp } from '@vueuse/math'
import { debounce } from 'lodash'

export interface PdfObject {
  id: symbol,
  x?: number,
  y?: number,
  page?: number,
  width: number,
  height: number,
}

export interface PdfObjects extends PdfViewerContext {
  root: Ref<HTMLDivElement>,
  objects: Map<symbol, PdfObject>,
}

export interface PdfObjectSize {
  width: number,
  height: number,
  minWidth?: number,
  minHeight?: number,
  maxWidth?: number,
  maxHeight?: number,
}

export type PdfObjectProp = PdfObjectSize & Omit<PdfObject, 'id'>

export const PDF_OBJECTS_CONTEXT: InjectionKey<PdfObjects> = Symbol('PDFObjects')

export const PDF_OBJECT_CONTEXT: InjectionKey<ReturnType<typeof useObjectModel>> = Symbol('PDFObjects')

export function useSizeModel (props: PdfObjectSize) {
  const vWidth  = useVModel(props, 'width')
  const vHeight = useVModel(props, 'height')

  const ratio     = computed(() => props.width / props.height)
  const minWidth  = ref(props.minWidth ?? props.width * 0.5)
  const maxWidth  = ref(props.maxWidth ?? props.width * 2)
  const minHeight = ref(props.minHeight ?? props.height * 0.5)
  const maxHeight = ref(props.maxHeight ?? props.height * 2)

  const width  = useClamp(props.width, minWidth, maxWidth)
  const height = useClamp(props.height, minHeight, maxHeight)

  watch(() => props.minWidth, (value) => {
    if (Number.isFinite(value))
      minWidth.value = value
  })

  watch(() => props.minHeight, (value) => {
    if (Number.isFinite(value))
      minHeight.value = value
  })

  watch(() => props.maxWidth, (value) => {
    if (Number.isFinite(value))
      maxWidth.value = value
  })

  watch(() => props.maxHeight, (value) => {
    if (Number.isFinite(value))
      maxHeight.value = value
  })

  syncRef(width, vWidth)
  syncRef(height, vHeight)

  return {
    ratio,
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
  }
}

/**
 * V-model for PDF Object
 * @param props PDF Object props
 */
export function useObjectModel (props: PdfObjectProp) {
  const {
    objects,
    page: currentPage,
  } = inject(PDF_OBJECTS_CONTEXT)

  const vX    = useVModel(props, 'x')
  const vY    = useVModel(props, 'y')
  const vPage = useVModel(props, 'page')

  const page = ref(props.page ?? currentPage.value)
  const x    = ref(props.x)
  const y    = ref(props.y)
  const id   = Symbol('PDFObject')

  const {
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    ratio,
  } = useSizeModel(props)

  objects.set(id, reactive({
    id,
    page,
    x,
    y,
    width,
    height,
  }))

  onBeforeMount(async () => {
    if (!Number.isFinite(page.value)) {
      await until(currentPage).toBeTruthy()

      page.value = currentPage.value
    }
  })

  onBeforeUnmount(() => {
    objects.delete(id)
  })

  syncRef(x, vX)
  syncRef(y, vY)
  syncRef(page, vPage)

  return {
    id,
    x,
    y,
    page,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    ratio,
  }
}

export function usePage (page: MaybeRef<number>) {
  const { root }     = inject(PDF_OBJECTS_CONTEXT)
  const pageSelector = computed(() => `.page[data-page-number="${unref(page)}"]`)
  const pageEl       = useSelector(pageSelector, root)

  return pageEl
}

export const focus = debounce(focus_, 100)

export type AddonPositionVariant = 'top' | 'left' | 'right' | 'bottpm'
