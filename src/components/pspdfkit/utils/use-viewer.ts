import {
  type Ref,
  shallowRef,
  watch,
  provide,
  onBeforeUnmount,
} from 'vue-demi'
import type {
  Configuration,
  Instance,
} from 'pspdfkit'
import { useClamp, useMax } from '@vueuse/math'
import useLoading from '../../overlay/utils/use-loading'
import { createEventHook } from '@vueuse/core'
import { useLang, getCDN } from '../../../core'
import { defuFn } from 'defu'
import { PSPDF_INSTANCE } from '..'
import {
  withBase,
  joinURL,
  hasProtocol,
} from 'ufo'
import Style from '../css/custom.css?url'
import {
  createViewState,
  createViewer,
  destroyViewer,
  getVersion,
  importList,
  importRectangleAnnotation,
} from './pspdfkit'

export type OpenDocConfig = Omit<Configuration, 'document' | 'password' | 'container'>

export function useViewer (container: Ref<HTMLDivElement>) {
  const lang     = useLang()
  const instance = shallowRef<Instance>()
  const contents = new Map<string, HTMLElement>()

  const totalPage = shallowRef(0)
  const scale     = useClamp(1, 0.5, 2)
  const page      = useClamp(1, 1, useMax(totalPage, 1))
  const loading   = useLoading()
  const ready     = shallowRef(false)
  const error     = shallowRef<Error>()

  const loadEvent  = createEventHook<Instance>()
  const errorEvent = createEventHook<Error>()
  const readyEvent = createEventHook<Instance>()

  async function openDoc (url: string, password?: string, config: OpenDocConfig = {}) {
    loading.value = true

    if (instance.value)
      await closeDoc()

    try {
      const RectangleAnnotation = await importRectangleAnnotation()
      const baseUrl             = joinURL(getCDN(), `pspdfkit@${await getVersion()}/dist/`)
      const instance_           = await createViewer(defuFn<OpenDocConfig, [Configuration]>(config, {
        container         : container.value,
        document          : url,
        password          : password,
        styleSheets       : [Style],
        maxPasswordRetries: 0,
        locale            : lang.value,
        baseUrl           : hasProtocol(baseUrl) ? baseUrl : withBase(baseUrl, location.origin),
        initialViewState  : await createViewState({
          showToolbar            : false,
          allowExport            : false,
          allowPrinting          : false,
          enableAnnotationToolbar: false,
        }),
        customRenderers: {
          Annotation ({ annotation }) {
            if (annotation instanceof RectangleAnnotation && contents.has(annotation.id)) {
              const node = contents.get(annotation.id) as HTMLElement

              node.dataset.annotationId = annotation.id
              node.style.width          = `${annotation.boundingBox.width}px`
              node.style.height         = `${annotation.boundingBox.height}px`

              return {
                node  : node,
                append: false,
              }
            }
          },
        },
        onAnnotationResizeStart: (event) => {
          if (event.annotation instanceof RectangleAnnotation && contents.has(event.annotation.id)) {
            return {
              maintainAspectRatio: true,
              minHeight          : event.annotation.customData?.minHeight as number,
              minWidth           : event.annotation.customData?.minWidth as number,
              maxHeight          : event.annotation.customData?.maxHeight as number,
              maxWidth           : event.annotation.customData?.maxWidth as number,
            }
          }
        },
        inlineTextSelectionToolbarItems: () => ([]),
        isEditableAnnotation           : (annotation) => {
          return contents.has(annotation.id)
        },
      }))

      instance_.addEventListener('viewState.zoom.change', (zoom) => {
        scale.value = zoom * 0.75
      })

      instance_.addEventListener('viewState.currentPageIndex.change', (pageIndex) => {
        page.value = pageIndex + 1
      })

      instance_.contentDocument.addEventListener('pointerdown', (event) => {
        const target = event.target as HTMLElement

        if (target?.matches('.pdf-object') && target.dataset.annotationId) {
          void importList().then((List) => {
            event.stopImmediatePropagation()
            instance_.setSelectedAnnotations(List([target.dataset.annotationId]))
          })
        }
      }, { capture: true })

      instance.value  = instance_
      totalPage.value = instance_.totalPageCount
      page.value      = instance_.viewState.currentPageIndex + 1
      scale.value     = instance_.currentZoomLevel * 0.75

      void loadEvent.trigger(instance.value)
      void readyEvent.trigger(instance.value)
    } catch (error_) {
      if (error_ instanceof Error) {
        error.value = error_

        void errorEvent.trigger(error_)
      }
    } finally {
      loading.value = false
    }
  }

  watch(page, (value) => {
    const pageIndex = value - 1

    if (instance.value.viewState.currentPageIndex !== pageIndex)
      instance.value.setViewState((viewState) => viewState.set('currentPageIndex', pageIndex))
  })

  watch(scale, (value) => {
    const zoom = value / 0.75

    if (instance.value.currentZoomLevel !== zoom)
      instance.value.setViewState((viewState) => viewState.set('zoom', zoom))
  })

  watch(lang, async (value) => {
    await instance.value.setLocale(value)
  })

  async function closeDoc () {
    if (container.value) {
      await destroyViewer(container.value)

      instance.value = undefined
    }
  }

  onBeforeUnmount(async () => {
    await closeDoc()
  })

  provide(PSPDF_INSTANCE, {
    instance: instance,
    contents: contents,
  })

  return {
    instance,
    page,
    totalPage,
    scale,
    loading,
    ready,
    error,
    openDoc,
    closeDoc,
    onLoaded: loadEvent.on,
    onError : errorEvent.on,
    onReady : readyEvent.on,
  }
}
