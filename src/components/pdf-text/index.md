---
title: PDF Text · Components
description: Generate text for Pdf Object
---

<script setup>
  import pPdfText from './PdfText.vue'
  import pPdfViewer from '../pdf-viewer/PdfViewer.vue'
  import pPdfObject from '../pdf-object/PdfObject.vue'
  import { reactive } from 'vue-demi'
  import FILE from '../pdf-viewer/assets/Calibrator-v3.pdf?url'

  const object1 = reactive({
    src   : undefined,
    page  : undefined,
    x     : undefined,
    y     : undefined,
    width : undefined,
    height: undefined,
  })
</script>

# PDF Text

> Generate text for Pdf Object

## Usage

### Simple Usage

<preview>
  <p-pdf-text
    text="Lorem ipsum dolor sit amet consectetur adipisicing" />
</preview>

```vue
<template>
  <p-pdf-text
    text="Lorem ipsum dolor sit amet consectetur adipisicing" />
</template>
```

### Using with PDF Object

<preview>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      v-model:page="object1.page"
      v-model:x="object1.x"
      v-model:y="object1.y"
      v-model:width="object1.width"
      v-model:height="object1.height">
      <p-pdf-text
        v-model.base64="object1.src"
        :width="430"
        :height="230"
        text="Lorem ipsum dolor sit amet consectetur adipisicing" />
    </p-pdf-object>
  </p-pdf-viewer>
</preview>

```vue
<template>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      v-model:page="object.page"
      v-model:x="object.x"
      v-model:y="object.y"
      v-model:width="object.width"
      v-model:height="object.height">
      <p-pdf-text
        v-model="object.src"
        :width="430"
        :height="230"
        text="Lorem ipsum dolor sit amet consectetur adipisicing" />
    </p-pdf-object>
  </p-pdf-viewer>
</template>

<script lang="ts" setup>
  import FILE from '~/assets/Calibrator-v3.pdf?url'

  interface PdfObject {
    src?: File,
    page?: number,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
  }

  const object = reactive<PdfObject>({
    src   : undefined,
    page  : undefined,
    x     : undefined,
    y     : undefined,
    width : undefined,
    height: undefined,
  })
</script>
```
