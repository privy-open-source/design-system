---
title: PDF Viewer · Components
description: Open and View PDF Document
---
<script setup>
  import pPdfHelipad from '../pdf-helipad/PdfHelipad.vue'
  import pPdfViewer from './PspdfViewer.vue'
  import pPdfObject from './PspdfObject.vue'
  import { ref, reactive } from 'vue-demi'
  import { withBase } from 'vitepress'

  const FILE           = withBase('/assets/pdf/Calibrator-v3.pdf')
  const FILE_SIGN      = withBase('/assets/pdf/sample-with-sign.pdf')
  const FILE_PROTECT   = withBase('/assets/pdf/Calibrator-v3_protected.pdf')
  const IMG_FIXED_FIT  = withBase('/assets/images/fixed-vs-fit.svg')
  const IMG_HELICOPTER = withBase('/assets/images/img-helicopter.svg')
  const BASE_URL       = `${location.origin}${withBase('/js/')}`


  const password = ref('')
  const layout   = ref('fixed')
  const src      = ref(FILE)

  const object1 = reactive({
    page  : 8,
    x     : undefined,
    y     : undefined,
    width : undefined,
    height: undefined,
  })

  function changeLocation () {
    object1.x      = 400
    object1.y      = 300
    object1.width  = 198
    object1.height = 106
  }

  const objects = reactive([])
  const scale   = ref(1)

  function onLanded (item) {
    console.log('landed', item)
    // objects.push({
    //   _id   : Symbol('ObjectId'),
    //   page  : item?.page,
    //   x     : item?.x,
    //   y     : item?.y,
    //   width : item?.width,
    //   height: item?.height,
    // })
  }

  function remove (index) {
    objects.splice(index, 1)
  }
</script>

# PDF Viewer
> Open and View PDF Document

## Usage

### Simple Usage

<p-pdf-helipad :scale="scale" @landed="onLanded">
  <img class="w-full h-full bg-base-white" :src="IMG_HELICOPTER" />
</p-pdf-helipad>

<preview>
  <p-pdf-viewer
    v-model:scale="scale"
    layout="fixed"
    :src="src"
    :config="{ baseUrl: BASE_URL }">
    <p-pdf-object
      v-model:page="object1.page"
      v-model:x="object1.x"
      v-model:y="object1.y"
      v-model:width="object1.width"
      v-model:height="object1.height"
      :moveable="false"
      autofocus>
      <img class="w-full h-full rounded" :src="IMG_HELICOPTER" />
    </p-pdf-object>
  </p-pdf-viewer>
</preview>

<pre>{{ object1 }}</pre>
