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
} from 'vue-demi'
import { PDF_OBJECTS_CONTEXT } from '../pdf-object/'
import { usePdfContext } from '../pdf-viewer'

const objects    = new Map()
const root       = ref<HTMLDivElement>()
const pdfContext = usePdfContext()

provide(PDF_OBJECTS_CONTEXT, {
  ...pdfContext,
  objects,
  root,
})
</script>
