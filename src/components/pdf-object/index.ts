import { MaybeRef } from '@vueuse/shared'
import {
  computed,
  inject,
  InjectionKey,
  onBeforeUnmount,
  reactive,
  Ref,
  toRefs,
  unref,
  ref,
  watch,
  onBeforeMount,
} from 'vue-demi'
import { PdfViewerContext } from '../pdf-viewer'
import { useSelector } from './utils/use-selector'
import { debounce } from 'lodash-es'
import { focus as focus_ } from '../tour/utils/focus'

export const focus = debounce(focus_, 100)

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

export const PDF_OBJECTS_CONTEXT: InjectionKey<PdfObjects> = Symbol('PDFObjects')

export interface PdfObjectProp extends Omit<PdfObject, 'id'> {
  minWidth?: number,
  minHeight?: number,
  maxWidth?: number,
  maxHeight?: number,
}

export function useObjectModel (props: PdfObjectProp) {
  const {
    objects,
    page,
  } = inject(PDF_OBJECTS_CONTEXT)

  const object = reactive<PdfObject>({
    id    : Symbol('PDFObject'),
    page  : props.page,
    x     : props.x,
    y     : props.y,
    width : props.width,
    height: props.height,
  })

  objects.set(object.id, object)

  const ratio     = computed(() => props.width / props.height)
  const minWidth  = ref(props.minWidth ?? props.width * 0.5)
  const minHeight = ref(props.minHeight ?? props.height * 0.5)
  const maxWidth  = ref(props.maxWidth ?? props.width * 2)
  const maxHeight = ref(props.maxHeight ?? props.height * 2)

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

  onBeforeMount(async () => {
    if (!Number.isFinite(object.page))
      object.page = page.value
  })

  onBeforeUnmount(() => {
    objects.delete(object.id)
  })

  return {
    ...toRefs(object),
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
