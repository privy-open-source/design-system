<template>
  <div
    ref="root"
    class="pdf-objects"
    data-testid="pdf-objects">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  provide,
  toRef,
} from 'vue-demi'
import { PDF_OBJECTS_CONTEXT } from '.'
import { usePdfContext } from '../pdf-viewer'
import useDrop from './utils/use-drop'

const props = defineProps({
  dropTarget: {
    type   : String,
    default: '.pdfViewer > .page',
  },
})

const objects    = new Map()
const root       = ref<HTMLDivElement>()
const pdfContext = usePdfContext()
const dropTarget = toRef(props, 'dropTarget')

useDrop(root, dropTarget)

provide(PDF_OBJECTS_CONTEXT, {
  ...pdfContext,
  objects,
  root,
})
</script>
