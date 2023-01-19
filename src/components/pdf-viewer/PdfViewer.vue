<template>
  <div
    ref="root"
    v-p-aspect-ratio="layout === 'fixed' ? ratio : 16/9"
    data-testid="pdf-viewer"
    class="pdf"
    :class="classNames">
    <div
      class="pdf__header">
      <slot
        name="header"
        :page="page"
        :scale="scale"
        :total-page="totalPage"
        :doc="pdfDoc" />
    </div>

    <PdfObjects
      class="pdf__wrapper">
      <!-- Minimum PDFJS Viewer -->
      <div
        ref="container"
        class="pdf__container pdfContainer">
        <PdfLoading v-show="loading || !src" />
        <PdfError
          v-show="!loading && error"
          :url="src"
          :pdf-js="pdfJS"
          :error="error" />
        <div
          ref="viewer"
          class="pdf__viewer pdfViewer" />
        <slot
          :page="page"
          :scale="scale"
          :total-page="totalPage"
          :doc="pdfDoc" />
      </div>
      <!-- Minimum PDFJS Viewer end -->

      <slot
        name="container"
        :page="page"
        :scale="scale"
        :total-page="totalPage"
        :doc="pdfDoc" />

      <transition name="slide-up">
        <PdfNavigation
          v-show="!idle" />
      </transition>

      <slot
        name="body"
        :page="page"
        :scale="scale"
        :total-page="totalPage"
        :doc="pdfDoc" />
    </PdfObjects>
    <div class="pdf__footer">
      <slot
        name="footer"
        :page="page"
        :scale="scale"
        :total-page="totalPage"
        :doc="pdfDoc" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  provide,
  toRef,
  watch,
} from 'vue-demi'
import { pAspectRatio } from '../aspect-ratio'
import {
  templateRef,
  useToNumber,
  watchDebounced,
} from '@vueuse/core'
import { LayoutVariant, PDF_VIEWER_CONTEXT } from '.'
import { useSticky } from './utils/use-sticky'
import PdfNavigation from './PdfNavigation.vue'
import PdfLoading from './PdfLoading.vue'
import PdfError from './PdfError.vue'
import { useIdle } from './utils/use-idle'
import PdfObjects from '../pdf-object/PdfObjects.vue'
import { useViewer } from './utils/use-viewer'

export default defineComponent({
  directives: { pAspectRatio },
  components: {
    PdfObjects,
    PdfNavigation,
    PdfLoading,
    PdfError,
  },
  props: {
    src: {
      type   : String,
      default: '',
    },
    password: {
      type   : String,
      default: undefined,
    },
    layout: {
      type   : String as PropType<LayoutVariant>,
      default: 'fixed',
    },
    ratio: {
      type   : [Number, String],
      default: 210 / 297,
    },
    offsetTop: {
      type   : [Number, String],
      default: 0,
    },
  },
  emits: [
    'loaded',
    'error',
    'error-password',
  ],
  setup (props, { emit }) {
    const root      = templateRef<HTMLDivElement>('root')
    const container = templateRef<HTMLDivElement>('container')
    const viewer    = templateRef<HTMLDivElement>('viewer')
    const idle      = useIdle(container)

    const offsetTop    = useToNumber(toRef(props, 'offsetTop'), { nanToZero: true })
    const enableSticky = useSticky(root, { offsetTop: offsetTop })

    const classNames = computed(() => {
      const result: string[] = []

      if (props.layout)
        result.push(`pdf-viewer--layout-${props.layout}`)

      return result
    })

    const {
      page,
      scale,
      totalPage,
      openDoc,
      closeDoc,
      pdfDoc,
      pdfJS,
      loading,
      error,
      onLoaded,
      onError,
    } = useViewer(container, viewer)

    watchDebounced(() => [props.src, props.password], ([src, password]) => {
      openDoc(src, password)
    }, { debounce: 500 })

    watch(() => props.layout, (layout) => {
      enableSticky.value = layout === 'fit'
    }, { immediate: true })

    onMounted(async () => {
      if (props.src)
        openDoc(props.src, props.password)
    })

    onLoaded((doc) => {
      emit('loaded', doc)
    })

    onError((error_) => {
      if (error_.name === 'PasswordException')
        emit('error-password', error_)
      else
        emit('error', error_)
    })

    provide(PDF_VIEWER_CONTEXT, {
      page,
      scale,
      totalPage,
    })

    return {
      classNames,
      page,
      scale,
      totalPage,
      openDoc,
      closeDoc,
      pdfDoc,
      pdfJS,
      idle,
      loading,
      error,
    }
  },
})
</script>

<style lang="postcss">
.pdf {
  @apply relative overflow-hidden w-full flex flex-col bg-subtle z-1;

  &__wrapper {
    @apply relative h-full w-full flex-grow;
  }

  &__container {
    -webkit-overflow-scrolling: touch;

    @apply absolute inset-0 h-full w-full overflow-auto p-4 pb-16 shadow-inner;
  }

  &__viewer {
    .page {
      border-image: none;

      @apply shadow-lg mb-4 mt-0 border;

      &.hover {
        @apply ring-accent ring;
      }
    }
  }

  &__header {
    @apply z-1 bg-default shadow-lg;
  }

  &__footer {
    @apply z-1 bg-default shadow-lg-top;
  }
}
</style>
