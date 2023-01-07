---
title: Components > PDF Objects
description: Add object to PDF Viewer
---

<script setup>
  import pPdfViewer from '../pdf-viewer/PdfViewer.vue'
  import pPdfObject from './PdfObject.vue'
  import FILE from '../pdf-viewer/assets/Calibrator-v3.pdf?url'
  import { reactive } from 'vue-demi'

  const object1 = reactive({
    page  : 8,
    x     : 200,
    y     : 600,
    width : undefined,
    height: undefined,
  })
</script>
# PDF Object

> Add object to PDF Viewer

## Usage

### Simple Usage

<preview>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      v-model:page="object1.page"
      v-model:x="object1.x"
      v-model:y="object1.y"
      v-model:width="object1.width"
      v-model:height="object1.height">
      <img class="w-full h-full" src="https://via.placeholder.com/430x230/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</preview>
