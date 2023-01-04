<template>
  <div
    ref="root"
    data-testid="pdf-objects">
    <slot />
  </div>
</template>

<script lang="ts">
import { templateRef } from '@vueuse/core'
import {
  defineComponent,
  inject,
  provide,
  toRef,
} from 'vue-demi'
import { PDF_OBJECTS_CONTEXT } from '.'
import { PDF_VIEWER_CONTEXT } from '../pdf-viewer'
import useDrop from './utils/use-drop'

export default defineComponent({
  props: {
    dropTarget: {
      type   : String,
      default: '.pdfViewer > .page',
    },
  },
  setup (props) {
    const objects    = new Map()
    const root       = templateRef<HTMLDivElement>('root')
    const pdfContext = inject(PDF_VIEWER_CONTEXT)
    const dropTarget = toRef(props, 'dropTarget')

    provide(PDF_OBJECTS_CONTEXT, {
      objects,
      root,
      ...pdfContext,
    })

    useDrop(root, dropTarget)

    return {}
  },
})
</script>
