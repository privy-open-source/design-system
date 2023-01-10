---
title: Components > PDF Objects
description: Add object to PDF Viewer
---

<script setup>
  import pPdfViewer from '../pdf-viewer/PdfViewer.vue'
  import pPdfObject from './PdfObject.vue'
  import pPdfObjectAddon from './PdfObjectAddon.vue'
  import pButton from '../button/Button.vue'
  import FILE from '../pdf-viewer/assets/Calibrator-v3.pdf?url'
  import IconClose from '@carbon/icons-vue/lib/close/16'
  import { reactive } from 'vue-demi'

  const object1 = reactive({
    page  : undefined,
    x     : undefined,
    y     : undefined,
    width : undefined,
    height: undefined,
  })

  const object2 = reactive({
    page  : undefined,
    x     : undefined,
    y     : undefined,
    width : undefined,
    height: undefined,
  })

  const objects = reactive([])

  function add () {
    objects.push({
      _id   : Symbol('ObjectId'),
      page  : undefined,
      x     : undefined,
      y     : undefined,
      width : undefined,
      height: undefined,
    })
  }

  function remove (index) {
    objects.splice(index, 1)
  }
</script>

<style lang="postcss">
  .preview > .pdf {
    @apply z-[2];
  }
</style>

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
      <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
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
      <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</template>

<script setup>
  import FILE from '~/assets/Calibrator-v3.pdf?url'

  const object = reactive({
    page  : undefined,
    x     : undefined,
    y     : undefined,
    width : undefined,
    height: undefined,
  })
</script>
```

### Objects CRUD

<preview>
  <p-pdf-viewer :src="FILE">
    <template #header>
      <p-button color="primary" class="float-right my-4" @click="add">
        Add Object
      </p-button>
    </template>
    <p-pdf-object
      v-for="(object, i) in objects"
      :key="object._id"
      v-model:page="object.page"
      v-model:x="object.x"
      v-model:y="object.y"
      v-model:width="object.width"
      v-model:height="object.height"
      autofocus>
      <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
      <p-pdf-object-addon>
        <p-button size="sm" icon color="danger" @click="remove(i)">
          <IconClose />
        </p-button>
      </p-pdf-object-addon>
    </p-pdf-object>
  </p-pdf-viewer>
</preview>

```vue
<template>
  <p-pdf-viewer :src="FILE">
    <template #header>
      <p-button color="primary" class="float-right my-4" @click="add">
        Add Object
      </p-button>
    </template>
    <p-pdf-object
      v-for="(object, i) in objects"
      :key="object._id"
      v-model:page="object.page"
      v-model:x="object.x"
      v-model:y="object.y"
      v-model:width="object.width"
      v-model:height="object.height">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
      <p-pdf-object-addon>
        <p-button size="sm" icon color="danger" @click="remove(i)">
          <IconClose />
        </p-button>
      </p-pdf-object-addon>
    </p-pdf-object>
  </p-pdf-viewer>
</template>

<script setup>
  import FILE from '~/assets/Calibrator-v3.pdf?url'

  const objects = reactive([])

  function add () {
    objects.push({
      _id   : Symbol('ObjectId'),
      page  : undefined,
      x     : undefined,
      y     : undefined,
      width : undefined,
      height: undefined,
    })
  }

  function remove (index) {
    objects.splice(index, 1)
  }
</script>
```

## Disabled Move

To disable object move, set prop `moveable` to `false`.

<preview>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      :page="1"
      :x="400"
      :y="300"
      :width="198"
      :height="106"
      :moveable="false">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</preview>

```vue{9}
<template>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      :page="1"
      :x="400"
      :y="300"
      :width="198"
      :height="106"
      :moveable="false">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</template>
```

## Disabled Resize

To disable object resize, set prop `resizable` to `false`.

<preview>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      :page="1"
      :x="400"
      :y="300"
      :width="198"
      :height="106"
      :resizable="false">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</preview>

```vue{9}
<template>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      v-model:page="object2.page"
      v-model:x="object2.x"
      v-model:y="object2.y"
      v-model:width="object2.width"
      v-model:height="object2.height"
      :resizable="false">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</template>
```

## Disabled Autofocus

By default, object will force viewer to scroll and focus into object when the object mounted. To disabled this, set prop `autofocus` to `false`.

<preview>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      :page="11"
      :x="645"
      :y="974"
      :width="100"
      :height="100"
      :autofocus="false">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/100x100/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</preview>

```vue{9}
<template>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      :page="11"
      :x="645"
      :y="974"
      :width="100"
      :height="100"
      :autofocus="false">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/100x100/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</template>
```
