---
title: PDF Viewer · Components
description: Open and View PDF Document
---
<script setup>
  import pButton from '../button/Button.vue'
  import pPdfHelipad from './PspdfHelipad.vue'
  import pPdfViewer from './PspdfViewer.vue'
  import pPdfObject from './PspdfObject.vue'
  import pPdfObjectAddon from '../pdf-object/PdfObjectAddon.vue'
  import { withBase } from 'vitepress'
  import { joinURL } from 'ufo'
  import IconClose from '@privyid/persona-icon/vue/close/16.vue'
  import {
    ref,
    reactive,
  } from 'vue-demi'

  const FILE           = withBase('/assets/pdf/Calibrator-v3.pdf')
  const FILE_SIGN      = withBase('/assets/pdf/sample-with-sign.pdf')
  const FILE_PROTECT   = withBase('/assets/pdf/Calibrator-v3_protected.pdf')
  const IMG_FIXED_FIT  = withBase('/assets/images/fixed-vs-fit.svg')
  const IMG_HELICOPTER = withBase('/assets/images/img-helicopter.svg')

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
    objects.push({
      _id   : Symbol('ObjectId'),
      page  : item?.page,
      x     : item?.x,
      y     : item?.y,
      width : item?.width,
      height: item?.height,
    })
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
    :src="src">
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
    <p-pdf-object
      v-for="(object, i) in objects"
      :key="object._id"
      v-model:page="object.page"
      v-model:x="object.x"
      v-model:y="object.y"
      v-model:width="object.width"
      v-model:height="object.height">
      <img class="w-full h-full rounded" :src="IMG_HELICOPTER" />
      <p-pdf-object-addon>
        <p-button size="sm" icon color="danger" @click="remove(i)">
          <IconClose />
        </p-button>
      </p-pdf-object-addon>
    </p-pdf-object>
  </p-pdf-viewer>
</preview>

<pre>{{ object1 }}</pre>
