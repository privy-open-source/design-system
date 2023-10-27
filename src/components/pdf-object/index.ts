import type { MaybeRef } from '@vueuse/core'
import {
  tryOnBeforeMount,
  tryOnBeforeUnmount,
  until,
} from '@vueuse/core'
import type {
  InjectionKey,
  Ref,
} from 'vue-demi'
import {
  computed,
  inject,
  reactive,
  unref,
  ref,
  watch,
} from 'vue-demi'
import type { PdfViewerContext } from '../pdf-viewer'
import { useSelector } from './utils/use-selector'
import { focus as focus_ } from '../tour/utils/focus'
import { useClamp } from '@vueuse/math'
import { debounce, round } from 'lodash-es'

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
  const ratio     = computed(() => round(props.width / props.height, 2))
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

  tryOnBeforeMount(() => {
    if (!Number.isFinite(page.value)) {
      until(currentPage).toBeTruthy()
        .then(() => {
          page.value = currentPage.value
        })
    }
  })

  tryOnBeforeUnmount(() => {
    objects.delete(id)
  })

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

/**
 * Reactive page element
 * @param page page number
 */
export function usePage (page: MaybeRef<number>) {
  const { root }     = inject(PDF_OBJECTS_CONTEXT)
  const pageSelector = computed(() => `.page[data-page-number="${unref(page)}"]`)
  const pageEl       = useSelector(pageSelector, root)

  return pageEl
}

/**
 * focus with debounce
 */
export const focus = debounce(focus_, 100)

export type AddonPositionVariant = 'top' | 'left' | 'right' | 'bottom'
